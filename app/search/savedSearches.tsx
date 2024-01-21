import { FlatList, Text, View } from "react-native";
import useLoading from "../../hooks/useLoading";
import getSavedQueries from "../../services/saver/api/getSavedQueries";
import Loaded from "../../components/Loaded";
import Foreach from "../../components/Foreach";
import { useEffect } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import worksQuery from "../../services/ao3/api/worksQuery";
import workSearchObj from "../../services/ao3/scraper/workSearchObj";
import SaveSearchItem from "../../components/search/savedSearchItem";
import SearchBarTitle from "../../components/search/searchBarTitle";
import useStyle from "../../hooks/useStyle";

export default function SaveSearches() {

	const savedQueries = useLoading(getSavedQueries, [])

	useEffect(() => {
		console.log("queries", savedQueries)
	}, [ savedQueries.data ])

	const style = useStyle({
		// noSavedContainer: {

		// },
		noSavedText: {
			textAlign: "center",
			marginTop: 40
		}
	})

	return (
		<>
			{/* <Text>Saved Searches</Text> */}
			{/* <View style={{ backgroundColor: "red" }}><Text>Saved Searches</Text></View> */}
			<SearchBarTitle title="Saved Searches" />
			<Loaded
				isLoading={savedQueries.status}
				loading={<LoadingIndicator />}
			>
				<>
					<Loaded
						isLoading={(savedQueries.data === null || savedQueries.data.length == 0) ? "failed" : "loaded"}
						fallback={<Text style={style.noSavedText}>No saved searches</Text>}
					>
						{/* <Foreach
							list={savedQueries.data as string[]}
							each={(item, i) => {
								// const query = worksQuery(item).paramsAsObj()
								// console.log(query)
								// const a = workSearchObj(worksQuery(item).url)
								// console.log("obj", a)
								const query = worksQuery(item).paramsAsQuery()

								return (
									<Text key={i}>{query.anyField}</Text>
								)
							}}
						/> */}
						<FlatList
							data={savedQueries.data as string[]}
							renderItem={(item) => {
								// const query = worksQuery(item.item).paramsAsQuery()
								return <SaveSearchItem key={item.index} query={item.item} />
							}}
							ItemSeparatorComponent={() =>
								<View style={{ height: 1, backgroundColor: "lightgrey", marginHorizontal: 10 }} />
							}
						/>
					</Loaded>
				</>
			</Loaded>
		</>
	)
}