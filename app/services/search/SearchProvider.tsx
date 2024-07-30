import { useSQLiteContext } from "expo-sqlite"
import type { WorkSearchQueryAO3 } from "../../api/ao3Wrapper/types/worksSearchQuery"
import type { resultsState, resultsAction, Status } from "./SearchService"
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react"
import queryWorks from "../../api/ao3Wrapper/methods/queryWorks"
import arrayCompare from "../../utils/arrayCompare"
import type { SavedSearchesTable, SearchSessionsTable } from "../db/tableTypes"
import stringifyObject from "../../utils/stringifyObject"

interface SearchContext {
	query: WorkSearchQueryAO3 | null
	updateQuery: (query: WorkSearchQueryAO3) => void
	fetchQuery: (
		query?: WorkSearchQueryAO3,
		properties?: {
			ignoreSavedQueries?: boolean
		}
	) => Promise<void>
}

const searchContext = createContext<SearchContext | undefined>(undefined)

interface SearchProviderProps {
	children: JSX.Element
	searchSessionRef: React.MutableRefObject<{
		query: WorkSearchQueryAO3
		date: Date
		id: number | null
	} | null>
	currentQueryState: [
		WorkSearchQueryAO3 | null,
		React.Dispatch<React.SetStateAction<WorkSearchQueryAO3 | null>>
	]
	resultsState: [resultsState, React.Dispatch<resultsAction>]
	statusState: [Status, React.Dispatch<React.SetStateAction<Status>>]
}

export class MissingQueryError extends Error {
	constructor() {
		super("Search query must be set first before fetching a query")
	}
}

export default function SearchProvider({
	statusState,
	resultsState,
	currentQueryState,
	searchSessionRef,
	children,
}: SearchProviderProps) {
	const db = useSQLiteContext()
	const [currentQuery, setCurrentQuery] = currentQueryState
	const [results, dispatchResults] = resultsState
	const [status, setStatus] = statusState
	const [searchQuery, setSearchQuery] = useState<WorkSearchQueryAO3 | null>(
		null
	)

	const fetchQuery = useCallback(
		async (
			query?: WorkSearchQueryAO3,
			properties?: { ignoreSavedQueries?: boolean }
		) => {
			const localQuery = query ?? searchQuery

			const sameQuery =
				JSON.stringify(currentQuery) === JSON.stringify(localQuery)

			if (query) {
				updateQuery(query)
			}

			if (!localQuery) {
				throw new MissingQueryError()
			}

			setStatus("fetching")
			if (
				// starting first session
				currentQuery === null ||
				// new session when search text is changed
				currentQuery.anyField !== localQuery.anyField ||
				// new session when there is no search text and the fandoms updated
				(currentQuery.anyField === undefined &&
					localQuery.anyField === undefined &&
					!arrayCompare(
						currentQuery.fandoms ?? [],
						localQuery.fandoms ?? []
					))
			) {
				// currentQuery = query
				searchSessionRef.current = {
					date: new Date(),
					query: localQuery,
					id: null,
				}
			}

			const savedQuery = await db.getFirstAsync<SavedSearchesTable>(
				`SELECT * FROM "saved_searches" WHERE query = $query`,
				{
					$query: stringifyObject(localQuery),
				}
			)

			// updates the search session and if the query is saved then uses that as the session
			if (
				searchSessionRef.current?.id === null &&
				savedQuery &&
				!properties?.ignoreSavedQueries
			) {
				await db.withExclusiveTransactionAsync(async (txn) => {
					try {
						await txn.execAsync(
							`UPDATE search_sessions SET date = "${searchSessionRef.current?.date.toISOString()}" WHERE saved_search_id = ${
								savedQuery.id
							}`
						)
					} catch (error) {
						// if a query is saved, but doesn't exist in search sessions
						await txn.execAsync(
							`INSERT INTO search_sessions (date, saved_search_id) VALUES ("${searchSessionRef.current?.date.toISOString()}", ${
								savedQuery.id
							})`
						)
					}

					const session =
						await txn.getFirstAsync<SearchSessionsTable>(
							`SELECT * FROM search_sessions WHERE saved_search_id = $id`,
							{ $id: savedQuery.id }
						)
					if (session !== null) {
						searchSessionRef.current!.id = session.id
					} else {
						throw new Error(
							`Search session not found after either updating or inserting one based on saved queries`
						)
					}
				})
			}
			// creates new search session entry
			else if (searchSessionRef.current?.id === null) {
				await db.withExclusiveTransactionAsync(async (txn) => {
					await txn.execAsync(
						`INSERT INTO search_sessions (date, query) VALUES ("${searchSessionRef.current?.date.toISOString()}", '${stringifyObject(
							localQuery
						)}')`
					)

					const session =
						await txn.getFirstAsync<SearchSessionsTable>(
							`SELECT * FROM search_sessions WHERE date = $date`,
							{
								$date:
									searchSessionRef.current?.date.toISOString() ??
									"",
							}
						)
					if (session !== null) {
						searchSessionRef.current!.id = session.id
					} else {
						throw new Error(
							`Search session not found inserting a search session`
						)
					}
				})
			}

			try {
				const results = await queryWorks(localQuery)
				// truncates the search_cache, sqlite doesn't support normal truncate
				await db.withExclusiveTransactionAsync(async (txn) => {
					await txn.execAsync(`DROP TABLE search_cache`)
					await txn.execAsync(
						`CREATE TABLE search_cache (id INTEGER PRIMARY KEY NOT NULL, session_id INTEGER NOT NULL, page INTEGER NOT NULL, results TEXT NOT NULL,  FOREIGN KEY(session_id) REFERENCES search_sessions(id));`
					)
					await txn.execAsync(
						`INSERT INTO search_cache (session_id, page, results) VALUES (${
							searchSessionRef.current?.id
						}, ${results.page}, '${stringifyObject(results)}')`
					)
				})

				if (sameQuery) {
					dispatchResults({ type: "setCurrent", payload: results })
				} else {
					dispatchResults({ type: "setForward", payload: results })
				}
				setStatus("complete")
			} catch (error) {
				console.error(error)
				setStatus("failed")
			}
		},
		[currentQuery, searchQuery, db]
	)

	const updateQuery = useCallback((query: WorkSearchQueryAO3) => {
		setSearchQuery((prev) => ({ ...(prev ?? {}), ...query }))
		setCurrentQuery((prev) => ({ ...(prev ?? {}), ...query }))
	}, [])

	const value = useMemo<SearchContext>(
		() => ({
			fetchQuery,
			updateQuery,
			query: searchQuery,
		}),
		[fetchQuery]
	)

	return (
		<>
			<searchContext.Provider value={value}>
				{children}
			</searchContext.Provider>
		</>
	)
}

export function useSearch() {
	const context = useContext(searchContext)

	if (context === undefined) {
		throw new Error(`Must be used inside results pagination context`)
	}

	return context
}
