import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	type useState,
} from "react"
import queryWorks from "../../api/ao3Wrapper/methods/queryWorks"
import type { WorkSearchQueryAO3 } from "../../api/ao3Wrapper/types/worksSearchQuery"
import type { WorksSearchResultsAO3 } from "../../api/ao3Wrapper/types/worksSearchResults"
import { useSQLiteContext } from "expo-sqlite"
import type { resultsAction, resultsState, Status } from "./SearchService"
import stringifyObject from "../../utils/stringifyObject"

interface ResultsPaginationContext {
	hasPreviousPage: () => boolean
	hasNextPage: () => boolean
	fetchPreviousPage: () => Promise<void>
	fetchNextPage: () => Promise<void>
}

const resultsPaginationContext = createContext<
	ResultsPaginationContext | undefined
>(undefined)

interface ResultsProviderProps {
	children: JSX.Element
	currentQuery: WorkSearchQueryAO3 | null
	searchSessionRef: React.MutableRefObject<{
		query: WorkSearchQueryAO3
		date: Date
		id: number | null
	} | null>
	resultsState: [resultsState, React.Dispatch<resultsAction>]
	statusState: [Status, React.Dispatch<React.SetStateAction<Status>>]
}

export default function ResultsPaginationProvider({
	statusState,
	resultsState,
	currentQuery,
	searchSessionRef,
	children,
}: ResultsProviderProps) {
	const db = useSQLiteContext()
	const [results, dispatchResults] = resultsState
	const [status, setStatus] = statusState

	const hasPreviousPage = useCallback(() => {
		if (results.previous) {
			return results.previous?.page > 1
		}

		return false
	}, [results])

	const hasNextPage = useCallback(() => {
		if (results.next) {
			return results.next.page < results.next.totalPages
		}

		return false
	}, [results])

	const fetchPreviousPage = useCallback(async () => {
		if (hasPreviousPage() && currentQuery) {
			setStatus("fetching")
			try {
				let finalResults: WorksSearchResultsAO3

				const localResults = await db.getFirstAsync<{
					results: string
				}>(`SELECT results FROM search_cache WHERE page = $page`, {
					$page: results.previous!.page - 1,
				})

				if (localResults?.results) {
					finalResults = JSON.parse(
						localResults.results
					) as WorksSearchResultsAO3

					// date is stored as a string, but is consumed everywhere as a Date object
					finalResults.results = finalResults.results.map((v) => ({
						...v,
						date: new Date(v.date),
					}))
				} else {
					const fetchedResults = await queryWorks({
						...currentQuery,
						page: results.previous!.page - 1,
					})
					finalResults = fetchedResults
				}

				await db.execAsync(
					`INSERT OR REPLACE INTO search_cache (session_id, page, results) VALUES (${
						searchSessionRef.current?.id
					}, ${finalResults.page}, '${stringifyObject(
						finalResults
					)}')`
				)

				console.log("previous")
				dispatchResults({ type: "setBackward", payload: finalResults })
				setStatus("complete")
			} catch (error) {
				console.error(error)
				setStatus("failed")
			}
		}
	}, [hasPreviousPage])

	const fetchNextPage = useCallback(async () => {
		console.log("fetchNext", hasNextPage(), currentQuery)
		if (hasNextPage() && currentQuery) {
			console.log("fetching next")
			setStatus("fetching")
			try {
				let finalResults: WorksSearchResultsAO3

				const localResults = await db.getFirstAsync<{
					results: string
				}>(`SELECT results FROM search_cache WHERE page = $page`, {
					$page: results.next!.page + 1,
				})

				if (localResults?.results) {
					finalResults = JSON.parse(
						localResults.results
					) as WorksSearchResultsAO3

					// date is stored as a string, but is consumed everywhere as a Date object
					finalResults.results = finalResults.results.map((v) => ({
						...v,
						date: new Date(v.date),
					}))
				} else {
					const fetchedResults = await queryWorks({
						...currentQuery,
						page: results.next!.page + 1,
					})
					finalResults = fetchedResults
				}

				await db.execAsync(
					`INSERT OR REPLACE INTO search_cache (session_id, page, results) VALUES (${
						searchSessionRef.current?.id
					}, ${finalResults.page}, '${stringifyObject(
						finalResults
					)}')`
				)

				dispatchResults({ type: "setForward", payload: finalResults })
				setStatus("complete")
			} catch (error) {
				console.error(error)
				setStatus("failed")
			}
		}
	}, [hasNextPage])

	const value = useMemo<ResultsPaginationContext>(
		() => ({
			fetchNextPage,
			fetchPreviousPage,
			hasNextPage,
			hasPreviousPage,
		}),
		[hasPreviousPage, hasNextPage, fetchNextPage, fetchPreviousPage]
	)

	return (
		<>
			<resultsPaginationContext.Provider value={value}>
				{children}
			</resultsPaginationContext.Provider>
		</>
	)
}

export function useResultsPagination() {
	const context = useContext(resultsPaginationContext)

	if (context === undefined) {
		throw new Error(`Must be used inside results pagination context`)
	}

	return context
}
