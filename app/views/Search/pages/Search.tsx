import {
	ActivityIndicator,
	Button,
	FlatList,
	ScrollView,
	Text,
	View,
} from "react-native"
import { useResults } from "../../../services/search/SearchService"
import type { WorksSearchResultsAO3 } from "../../../api/ao3Wrapper/types/worksSearchResults"
import CompactResult from "../components/CompactResult/CompactResult"
import { useSearch } from "../../../services/search/SearchProvider"
import { useEffect, useMemo, useRef, useState } from "react"
import { useResultsPagination } from "../../../services/search/ResultsPaginationProvider"
import Show from "../../../components/utils/Show"

export default function Search() {
	const results = useResults()
	const resultsPagination = useResultsPagination()
	const search = useSearch()

	const [refreshing, setRefreshing] = useState(results.status == "fetching")

	const [loadingNext, setLoadingNext] = useState(false)
	const [loadingPrevious, setLoadingPrevious] = useState(false)

	// useEffect(() => {
	// 	if (!refreshing) {
	// 		setLoadingNext(false)
	// 		setLoadingPrevious(false)
	// 	}
	// }, [refreshing])

	const resultsArr = useMemo(() => {
		if (search.status == "fetchingNewQuery") return []

		setRefreshing(true)
		const resultsUpdate = [
			...(results.results.previous?.results ?? []),
			...(results.results.current?.results ?? []),
			...(results.results.next?.results ?? []),
		]

		const uniqueKeys = new Set<string>()
		// for some reason works with the same id may appear on multiple pages
		// this filters out works with same id on the same page just in case
		// keying the results with time of fetch prevents them from interfiring with each other when the same id appears on multiple pages
		const filteredResults = resultsUpdate.filter((v) => {
			if (uniqueKeys.has(v.key)) {
				return false
			}

			uniqueKeys.add(v.key)
			return true
		})

		setLoadingNext(false)
		setLoadingPrevious(false)
		setRefreshing(false)
		return filteredResults
	}, [
		results.results.previous,
		results.results.current,
		results.results.next,
		refreshing,
		search.status,
	])

	useEffect(() => {
		console.log("results.results", results.results)
	}, [results.results])

	useEffect(() => {
		console.log("search.status", search.status)
	}, [search.status])

	useEffect(() => {
		console.log("results.status", results.status)
	}, [results.status])

	return (
		<>
			<View
				style={{
					height: "auto",
					display: "flex",
				}}
			>
				<Show
					when={
						search.status == "fetchingNewQuery" ||
						search.status == "fetchingCurrentQuery"
					}
				>
					<ActivityIndicator size={"large"} />
				</Show>
				<FlatList
					refreshing={refreshing}
					data={resultsArr}
					extraData={refreshing}
					maxToRenderPerBatch={10}
					renderItem={({ item, index }) => {
						return (
							<CompactResult
								result={item}
								key={item.key}
								author={item.author}
								chapters={item.stats.chapters}
								date={item.date}
								hits={item.stats.hits ?? 0}
								kudos={item.stats.kudos ?? 0}
								rating={item.rating}
								summary={item.summary}
								title={item.title}
								words={item.stats.words}
							/>
						)
					}}
					ListEmptyComponent={
						<>
							<Show when={search.status == "empty"}>
								<Text>Let's search for something</Text>
							</Show>
							<Show when={search.status == "complete"}>
								<Text>Sadly we found nothing :(</Text>
							</Show>
						</>
					}
					centerContent
					onMomentumScrollBegin={(e) => {
						if (results.status == "fetching") {
							return
						}

						const heightPercentile =
							e.nativeEvent.contentOffset.y /
							e.nativeEvent.contentSize.height

						const requiredVelocity =
							100 * parseFloat(heightPercentile.toFixed(2))

						if (
							heightPercentile > 0.5 &&
							(e.nativeEvent.velocity?.y ?? 0) <=
								requiredVelocity - 70 &&
							!refreshing &&
							resultsPagination.hasNextPage()
						) {
							setLoadingNext(true)
							resultsPagination.fetchNextPage()
						}

						if (
							heightPercentile > 0.5 &&
							(e.nativeEvent.velocity?.y ?? 0) >=
								requiredVelocity &&
							!refreshing &&
							resultsPagination.hasPreviousPage()
						) {
							setLoadingPrevious(true)
							resultsPagination.fetchPreviousPage()
						}
					}}
					// loading next
					onEndReachedThreshold={0.3}
					onEndReached={(info) => {
						if (results.status == "fetching") {
							return
						}
						console.log(
							"next",
							refreshing,
							resultsPagination.hasNextPage()
						)
						if (!refreshing && resultsPagination.hasNextPage()) {
							setLoadingNext(true)
							resultsPagination.fetchNextPage()
						}
					}}
					ListFooterComponent={
						<>
							<Show when={loadingNext}>
								<View style={{ paddingVertical: 8 }}>
									<ActivityIndicator size="large" />
								</View>
							</Show>
						</>
					}
					// loading previous
					onStartReachedThreshold={0.4}
					onStartReached={(info) => {
						if (results.status == "fetching") {
							return
						}
						// console.log("prev", resultsPagination.hasPreviousPage())
						if (
							!refreshing &&
							resultsPagination.hasPreviousPage()
						) {
							setLoadingPrevious(true)
							resultsPagination.fetchPreviousPage()
						}
					}}
					ListHeaderComponent={
						<>
							<Show when={loadingPrevious}>
								<View style={{ paddingVertical: 8 }}>
									<ActivityIndicator size="large" />
								</View>
							</Show>
						</>
					}
					maintainVisibleContentPosition={{
						minIndexForVisible: 0,
					}}
					ItemSeparatorComponent={() => (
						<View
							style={{
								borderColor: "#000",
								borderBottomWidth: 1,
							}}
						/>
					)}
				/>
			</View>
		</>
	)
}
