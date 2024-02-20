import { FlatList, Text, View } from "react-native"
import useLoading from "../../../hooks/useLoading"
import getSavedQueries from "../../../services/saver/api/getSavedQueries"
import Loaded from "../../../components/common/Loaded"
import Foreach from "../../../components/common/Foreach"
import { useEffect } from "react"
import LoadingIndicator from "../../../components/common/LoadingIndicator"
import worksQuery from "../../../services/ao3/api/worksQuery"
import workSearchObj from "../../../services/ao3/tools/workSearchObj"
import SaveSearchItem from "../../../components/search/savedSearchItem"
import SearchBarTitle from "../../../components/search/searchBarTitle"
import useStyle from "../../../hooks/useStyle"
import { useNavigation } from "expo-router"

export default function SavedSearches() {
	const savedQueries = useLoading(getSavedQueries, [])

	const style = useStyle({
		// noSavedContainer: {

		// },
		noSavedText: {
			textAlign: "center",
			marginTop: 40,
		},
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
						isLoading={
							!(
								savedQueries.data === null ||
								savedQueries.data.length == 0
							)
						}
						fallback={
							<Text style={style.noSavedText}>
								No saved searches
							</Text>
						}
					>
						<FlatList
							data={savedQueries.data as string[]}
							renderItem={(item) => {
								return (
									<SaveSearchItem
										key={item.index}
										query={item.item}
									/>
								)
							}}
							ItemSeparatorComponent={() => (
								<View
									style={{
										height: 1,
										backgroundColor: "lightgrey",
										marginHorizontal: 10,
									}}
								/>
							)}
						/>
					</Loaded>
				</>
			</Loaded>
		</>
	)
}
