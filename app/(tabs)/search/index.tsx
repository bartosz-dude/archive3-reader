import Constants from "expo-constants"
import { Link, router, useGlobalSearchParams } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { FlatList, Text, TextInput, TextInputProps, View } from "react-native"
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
} from "react-native-popup-menu"
import IconBtn from "../../../components/common/IconBtn"
import Loaded from "../../../components/common/Loaded"
import LoadingIndicator from "../../../components/common/LoadingIndicator"
import SearchResultItem from "../../../components/search/SearchResultItem"
import useAsyncMemo from "../../../hooks/useAsyncMemo"
import useStyle from "../../../hooks/useStyle"
import worksQuery from "../../../services/ao3/api/worksQuery"
import worksSearch from "../../../services/ao3/api/worksSearch"
import { AO3WorkSearchResults } from "../../../services/ao3/types/workSearchResults"
import SearchBar from "../../../components/search/SearchBar"
import fastHashCode from "fast-hash-code"
import useLoading from "../../../hooks/useLoading"
import Show from "../../../components/common/Show"
import { WorkSearchResultsScraperError } from "../../../services/ao3/scraper/workSearchResults"
import useStatus from "../../../hooks/useStatus"

export default function SearchPage() {
	const { ao3Query } = useGlobalSearchParams() as { ao3Query: string }

	const [cachedQuery, setCachedQuery] = useState<string>()
	const [page, setPage] = useState(1)
	const [fetchedPages, setFetchedPages] = useState<AO3WorkSearchResults[]>([])
	const [status, setStatus] = useStatus()

	const data = useLoading(() => {
		if (ao3Query !== cachedQuery) {
			setCachedQuery(ao3Query)
			setPage(1)
			setFetchedPages([])
			return worksSearch(worksQuery(ao3Query), 1)
		}

		// if (!fetchedPages[ page ])
		return worksSearch(worksQuery(ao3Query), page)
	}, [ao3Query, page])

	useEffect(() => {
		if (data.status == "success") {
			setStatus("success")
			setFetchedPages((prev) => {
				const newPages = [...prev]
				if (data.data) newPages[data.data.currentPage - 1] = data.data

				return newPages
			})
		}
	}, [data.status])

	function fetchedResults() {
		return fetchedPages.flatMap((v) => v.results)
	}

	function isFetchedPagesEnd() {
		return (
			fetchedPages.at(-1)?.currentPage == fetchedPages.at(-1)?.totalPages
		)
	}

	const style = useStyle({
		listFooterLoading: {
			paddingTop: 20,
			paddingBottom: 50,
		},
	})

	return (
		<>
			{/* <SearchBar /> */}
			{/* <Link href={"/search/savedSearches"}>Saved Searches</Link> */}
			<Loaded
				isLoading={status}
				loading={<LoadingIndicator />}
				// options={{ immediatelyShowLoading: true }}
				fallback={
					<>
						{/* <Show
							when={
								data.error.message ==
								WorkSearchResultsScraperError.noResultsFound
							}
						> */}
						<Text>No works found</Text>
						{/* </Show>
						<Show
							when={
								data.error.message !=
								WorkSearchResultsScraperError.noResultsFound
							}
						>
							<Text>
								Something went wrong when searching for this.
								Try Different query.
							</Text> */}
						{/* </Show> */}
					</>
				}
			>
				<FlatList
					data={fetchedResults()}
					renderItem={(item) => {
						return (
							<>
								{/* <Link href={`/work/${item.item?.meta.id}/chapter/first`} style={{ height: 100 }}>{item.item?.meta.title}</Link> */}
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
							{/* <Text>You reached the end</Text> */}
						</Loaded>
					}
				/>
			</Loaded>
		</>
	)
}
