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
import { useEffect, useMemo, useState } from "react"
import { useResultsPagination } from "../../../services/search/ResultsPaginationProvider"
import Show from "../../../components/utils/Show"

export default function Search() {
	const results = useResults()
	const resultsPagination = useResultsPagination()
	const search = useSearch()

	const [refreshing, setRefreshing] = useState(results.status == "fetching")
	const [loadingNext, setLoadingNext] = useState(false)

	useEffect(() => {
		console.log("loading next", loadingNext)
	}, [loadingNext])

	// useEffect(() => {
	// 	console.log("results results", results.results)
	// 	// setRefreshing(results.status == "fetching")
	// }, [results.results])

	const resultsArr = useMemo(() => {
		setRefreshing(true)
		const resultsUpdate = [
			...(results.results.previous?.results ?? []),
			...(results.results.current?.results ?? []),
			...(results.results.next?.results ?? []),
		]

		const uniqueIds = new Set<number>()
		// for some reason works with the same id may appear on multiple pages, so this filters them out
		const filteredResults = resultsUpdate.filter((v) => {
			if (uniqueIds.has(v.id)) {
				return false
			}

			uniqueIds.add(v.id)
			return true
		})

		setRefreshing(false)
		return filteredResults
	}, [
		results.results.previous,
		results.results.current,
		results.results.next,
	])

	useEffect(() => {
		console.log("resluts arr update")
	}, [resultsArr])

	return (
		<>
			<Text>Search Page</Text>
			<Button
				title="Search"
				onPress={() => {
					// search.updateQuery({
					// 	anyField: "ladybug",
					// })
					search.fetchQuery({
						anyField: "ladybug",
					})
				}}
			/>
			<FlatList
				refreshing={refreshing}
				data={resultsArr}
				extraData={refreshing}
				maxToRenderPerBatch={10}
				renderItem={({ item }) => {
					return (
						<CompactResult
							key={item.id}
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
				ListEmptyComponent={<Text>Empty list</Text>}
				initialNumToRender={10}
				centerContent
				onEndReachedThreshold={0.3}
				onEndReached={(info) => {
					console.log("end", info.distanceFromEnd)
					if (!refreshing && resultsPagination.hasNextPage()) {
						setLoadingNext(true)
						resultsPagination.fetchNextPage()
					}
				}}
				onStartReachedThreshold={0.4}
				onStartReached={(info) => {
					console.log("beginning", info.distanceFromStart)
					if (!refreshing && resultsPagination.hasPreviousPage()) {
						resultsPagination.fetchPreviousPage()
					}
				}}
				ListFooterComponent={
					<>
						<Show when={loadingNext}>
							<View style={{ paddingVertical: 8 }}>
								<ActivityIndicator size="large" />
								{/* <Text>Loading...</Text> */}
							</View>
						</Show>
					</>
				}
				maintainVisibleContentPosition={{
					minIndexForVisible: 0,
					// autoscrollToTopThreshold: 1,
				}}
			/>
		</>
	)
}
