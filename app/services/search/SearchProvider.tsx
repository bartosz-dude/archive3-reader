import { useSQLiteContext } from "expo-sqlite"
import type { WorkSearchQueryAO3 } from "../../api/ao3Wrapper/types/worksSearchQuery"
import type {
	resultsState,
	resultsAction,
	Status,
	RenderableResults,
} from "./SearchService"
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ReactNode,
} from "react"
import queryWorks from "../../api/ao3Wrapper/methods/queryWorks"
import arrayCompare from "../../utils/arrayCompare"
import type { SavedSearchesTable, SearchSessionsTable } from "../db/tableTypes"
import stringifyObject from "../../utils/stringifyObject"
import { SEARCH_CACHE_CREATE_QUERY } from "../db/dbMigrator"
import { merge } from "ts-deepmerge"
import type { State } from "../../types/utility"

interface SearchContext {
	query: WorkSearchQueryAO3 | null
	updateQuery: (query: WorkSearchQueryAO3) => void
	fetchQuery: (
		query?: WorkSearchQueryAO3,
		properties?: {
			ignoreSavedQueries?: boolean
		}
	) => Promise<void>
	status:
		| "complete"
		| "fetchingNewQuery"
		| "fetchingCurrentQuery"
		| "failedFetchingNew"
		| "failedFetchingCurrent"
		| "empty"
}

export const searchContext = createContext<SearchContext | undefined>(undefined)

interface SearchProviderProps {
	children: ReactNode
	searchSessionRef: React.MutableRefObject<{
		query: WorkSearchQueryAO3
		date: Date
		id: number | null
	} | null>
	currentQueryState: State<WorkSearchQueryAO3 | null>
	resultsState: [resultsState, React.Dispatch<resultsAction>]
	statusState: State<Status>
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
	// last fetched query
	const [currentQuery, setCurrentQuery] = currentQueryState
	const [results, dispatchResults] = resultsState
	const [status, setStatus] = statusState
	// current query to search, may not have been fetched yet
	const [searchQuery, setSearchQuery] = useState<WorkSearchQueryAO3 | null>(
		null
	)
	const [searchStatus, setSearchStatus] =
		useState<SearchContext["status"]>("empty")
	const fetching = useRef(false)

	useEffect(() => {
		console.log("cq", currentQuery)
	}, [currentQuery])

	const fetchQuery = useCallback(
		async (
			query?: WorkSearchQueryAO3,
			properties?: { ignoreSavedQueries?: boolean }
		) => {
			// prevents multiple fetches at the same time
			if (fetching.current) {
				return
			}
			fetching.current = true

			// current query to fetch
			const localQuery = query ?? searchQuery

			const sameQuery =
				JSON.stringify(currentQuery) === JSON.stringify(localQuery)

			if (!localQuery) {
				fetching.current = false
				throw new MissingQueryError()
			}

			console.log("queries", currentQuery, localQuery)
			setStatus("fetching")
			if (
				// starting first session
				currentQuery === null ||
				!searchSessionRef.current ||
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
				console.log("query new")
				setSearchStatus("fetchingNewQuery")
				// currentQuery = query
				searchSessionRef.current = {
					date: new Date(),
					query: localQuery,
					id: null,
				}
				setCurrentQuery((prev) => merge(prev ?? {}, localQuery ?? {}))
			} else {
				console.log("query current")
				setSearchStatus("fetchingCurrentQuery")
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
						fetching.current = false
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
						fetching.current = false
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
					await txn.execAsync(SEARCH_CACHE_CREATE_QUERY)
					await txn.execAsync(
						`INSERT INTO search_cache (session_id, page, results) VALUES (${
							searchSessionRef.current?.id
						}, ${results.page}, '${stringifyObject(results)}')`
					)
				})

				// creates a unique key for each item for displaying in lists
				// ao3 search results sometimes repeat across pages, that's why this is needed
				const keyBase = Date.now().toString()
				results.results = results.results.map((v) => {
					Object.defineProperty(v, "key", {
						value: v.id.toString() + "n" + keyBase,
					})
					return v
				})

				// if (sameQuery) {
				dispatchResults({
					type: "setCurrent",
					payload: results as RenderableResults,
				})
				// } else {
				// 	dispatchResults({
				// 		type: "setForward",
				// 		payload: results as RenderableResults,
				// 	})
				// }

				console.log("query complete")
				// setCurrentQuery((prev) => ({ ...(prev ?? {}), ...query }))
				setSearchStatus((prev) => "complete")
				setStatus("complete")
				fetching.current = false
			} catch (error) {
				console.error(error)

				setSearchStatus((prev) =>
					prev == "fetchingNewQuery"
						? "failedFetchingNew"
						: "failedFetchingCurrent"
				)
				setStatus("failed")
				fetching.current = false
			}
		},
		[currentQuery, searchQuery, db, searchStatus, status, dispatchResults]
	)

	const updateQuery = useCallback((query: WorkSearchQueryAO3) => {
		setSearchQuery((prev) => ({ ...(prev ?? {}), ...query }))
		// setCurrentQuery((prev) => ({ ...(prev ?? {}), ...query }))
	}, [])

	const value = useMemo<SearchContext>(
		() => ({
			fetchQuery,
			updateQuery,
			query: searchQuery,
			status: searchStatus,
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
		throw new Error(`Must be used inside search context`)
	}

	return context
}
