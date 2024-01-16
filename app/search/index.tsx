import { Link, useGlobalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import workSearchURL from "../../services/ao3/scraper/workSearchUrl";
import worksQuery from "../../services/ao3/api/worksQuery";
import useAsyncMemo from "../../hooks/useAsyncMemo";
import workSearchResultsScraper from "../../services/ao3/scraper/workSearchResults";
import worksSearch from "../../services/ao3/api/worksSearch";
import { AO3WorkSearchResults } from "../../services/ao3/types/workSearchResults";

export default function Page() {

	const { ao3Query } = useGlobalSearchParams() as { ao3Query: string }

	const [ page, setPage ] = useState(1)
	const [ fetchedPages, setFetchedPages ] = useState<AO3WorkSearchResults[]>([])

	const results = useAsyncMemo(async () => {
		if (!fetchedPages[ page ])
			return worksSearch(worksQuery(ao3Query), page)
	}, () => {}, [ ao3Query, page ])

	useEffect(() => {
		// console.log("results", results)
		if (results) {
			setFetchedPages((prev) => {
				const newPages = [ ...prev ]
				newPages[ results?.currentPage - 1 ] = results

				return newPages
			})
		}
		console.log("fetchedPages", fetchedPages)
	}, [ results ])


	// useEffect(() => {
	// 	console.log("fetchedPages", fetchedPages)
	// })
	// function fetchPagesArr() {
	// 	return Array.from(Object.keys(fetchedPages)) as unknown as AO3WorkSearchResults[]
	// }

	function fetchedResults() {
		return fetchedPages.flatMap((v) => v.results)
	}

	function isFetchedPagesEnd() {
		return fetchedPages.at(-1)?.currentPage == fetchedPages.at(-1)?.totalPages
	}

	const nav = useNavigation()

	nav.addListener("state", (e) => {
		// console.log("state", e)
	})

	return (
		<>
			{/* <Text>{ao3Query}</Text> */}
			<>
				<Text>{fetchedPages.at(-1)?.currentPage} / {fetchedPages.at(-1)?.totalPages}</Text>
				<FlatList
					data={fetchedResults()}
					renderItem={(item) => {
						return (
							<>
								<Link href={`/work/${item.item?.meta.id}/chapter/first`} style={{ height: 100 }}>{item.item?.meta.title}</Link>
							</>
						)
					}}
					onEndReached={(e) => {
						console.log("end", isFetchedPagesEnd())
						if (!isFetchedPagesEnd())
							setPage((prev) => prev + 1)
					}}
					onEndReachedThreshold={1}
				/>
			</>
		</>
	)
}