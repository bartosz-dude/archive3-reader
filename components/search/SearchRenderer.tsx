import { useGlobalSearchParams } from "expo-router"
import { useState, useEffect } from "react"
import useLoading from "../../hooks/useLoading"
import useStatus from "../../hooks/useStatus"
import useStyle from "../../hooks/useStyle"
import worksQuery from "../../services/ao3/api/worksQuery"
import worksSearch from "../../services/ao3/api/worksSearch"
import {
	AO3WorkResult,
	AO3WorkSearchResults,
} from "../../services/ao3/types/workSearchResults"
import Loaded from "../common/Loaded"
import LoadingIndicator from "../common/LoadingIndicator"
import ResultList from "./ResultList"
import { Text, View } from "react-native"
import useUpdater from "../../hooks/useUpdater"

export default function SearchRenderer() {
	const { ao3Query } = useGlobalSearchParams() as { ao3Query: string }

	const [cachedQuery, setCachedQuery] = useState<string>()
	const [page, setPage] = useState(1)
	const [fetchedPages, setFetchedPages] = useState<AO3WorkResult[]>([])
	const [currentPage, setCurrentPage] = useState<AO3WorkSearchResults>()
	const [refreshing, setRefreshing] = useState(false)
	const [status, setStatus] = useStatus()

	const [fetchUpdater, fetchUpdate] = useUpdater()

	const dataFetcher = useLoading(() => {
		if (ao3Query !== cachedQuery) {
			setCachedQuery(ao3Query)
			setPage(1)
			setFetchedPages([])
			return worksSearch(worksQuery(ao3Query), 1)
		}

		console.log("fetching")
		// if (!fetchedPages[ page ])
		return worksSearch(worksQuery(ao3Query), page)
	}, [ao3Query, page, fetchUpdater])

	useEffect(() => {
		if (dataFetcher.status == "success") {
			setStatus("success")
			setRefreshing(false)
			setFetchedPages((prev) => [...prev, ...dataFetcher.data.results])
			setCurrentPage(dataFetcher.data)
		}
	}, [dataFetcher.status])

	function refresh() {
		setRefreshing(true)
		// setStatus("loading")
		setFetchedPages([])
		setPage(1)
		fetchUpdate()
	}

	// function fetchedResults() {
	// 	return fetchedPages.flatMap((v) => v.results)
	// }

	function isFetchedPagesEnd() {
		return currentPage?.currentPage == currentPage?.totalPages
	}

	const style = useStyle({
		listFooterLoading: {
			paddingTop: 20,
			paddingBottom: 50,
		},
	})

	return (
		<>
			<Loaded
				isLoading={status}
				loading={<LoadingIndicator />}
				// options={{ immediatelyShowLoading: true }}
				fallback={
					<>
						<Text>No works found</Text>
					</>
				}
			>
				<ResultList
					data={fetchedPages}
					refreshing={refreshing}
					refresh={refresh}
					onEndReached={(e) => {
						if (!isFetchedPagesEnd()) setPage((prev) => prev + 1)
					}}
					onEndReachedThreshold={0.7}
					ListFooterComponent={
						<Loaded
							isLoading={isFetchedPagesEnd()}
							loading={
								<View style={style.listFooterLoading}>
									<LoadingIndicator />
								</View>
							}
						>
							<Text>You reached the end</Text>
						</Loaded>
					}
				/>
				{/* <FlatList
					data={fetchedResults()}
					renderItem={(item) => {
						return (
							<>
								<SearchResultItem
									item={item}
									key={item.item.meta.id}
								/>
							</>
						)
					}}
					onEndReached={(e) => {
						if (!isFetchedPagesEnd()) setPage((prev) => prev + 1)
					}}
					onEndReachedThreshold={0.4}
					ItemSeparatorComponent={() => (
						<View
							style={{
								height: 1,
								backgroundColor: "lightgrey",
								marginHorizontal: 10,
							}}
						/>
					)}
					ListFooterComponent={
						<Loaded
							isLoading={isFetchedPagesEnd()}
							loading={
								<View style={style.listFooterLoading}>
									<LoadingIndicator />
								</View>
							}
						>
							{/* <Text>You reached the end</Text> 					*/}
			</Loaded>
		</>
	)
}
