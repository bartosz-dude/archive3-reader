import {
	createContext,
	useContext,
	useMemo,
	useReducer,
	useRef,
	useState,
} from "react"
import type { WorkSearchQueryAO3 } from "../../api/ao3Wrapper/types/worksSearchQuery"
import type { WorksSearchResultsAO3 } from "../../api/ao3Wrapper/types/worksSearchResults"
import ResultsPaginationProvider from "./ResultsPaginationProvider"
import SearchProvider from "./SearchProvider"

export type Status = "fetching" | "complete" | "failed" | null

interface ResultsContext {
	results: resultsState
	status: Status
}

const resultsContext = createContext<ResultsContext | undefined>(undefined)

export function useResults() {
	const context = useContext(resultsContext)

	if (context === undefined) {
		throw new Error(`Must be used inside results pagination context`)
	}

	return context
}

export interface resultsState {
	previous: WorksSearchResultsAO3 | null
	current: WorksSearchResultsAO3 | null
	next: WorksSearchResultsAO3 | null
}

export interface resultsAction {
	type: "setForward" | "setBackward" | "setCurrent"
	payload: WorksSearchResultsAO3
}

function resultsReducer(
	state: resultsState,
	action: resultsAction
): resultsState {
	const { type, payload } = action
	switch (type) {
		case "setForward":
			return {
				previous: state.current,
				current: state.next,
				next: payload,
			}
		case "setBackward":
			return {
				previous: payload,
				current: state.previous,
				next: state.current,
			}
		case "setCurrent":
			return {
				previous: null,
				current: payload,
				next: null,
			}
	}
}

export default function SearchService({ children }: { children: JSX.Element }) {
	const searchSession = useRef<{
		query: WorkSearchQueryAO3
		date: Date
		id: number | null
	} | null>(null)

	const currentQuery = useState<WorkSearchQueryAO3 | null>(null)
	const status = useState<Status>(null)

	const results = useReducer(resultsReducer, {
		previous: null,
		current: null,
		next: null,
	})

	const resultsValue = useMemo<ResultsContext>(
		() => ({ results: results[0], status: status[0] }),
		[results[0], status[0]]
	)

	return (
		<>
			<SearchProvider
				currentQueryState={currentQuery}
				resultsState={results}
				searchSessionRef={searchSession}
				statusState={status}
			>
				<ResultsPaginationProvider
					currentQuery={currentQuery[0]}
					resultsState={results}
					searchSessionRef={searchSession}
					statusState={status}
				>
					<resultsContext.Provider value={resultsValue}>
						{children}
					</resultsContext.Provider>
				</ResultsPaginationProvider>
			</SearchProvider>
		</>
	)
}
