import { Slot, router, useGlobalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import workSearchURL from "../../services/ao3/scraper/workSearchUrl";
import worksQuery from "../../services/ao3/api/worksQuery";
import workSearchResultsScraper from "../../services/ao3/scraper/workSearchResults";
import useAsyncMemo from "../../hooks/useAsyncMemo";

export default function Layout() {

	const [ searchAnyText, setSearchAnyText ] = useState("")

	const submitHander: TextInputProps[ "onSubmitEditing" ] = (e) => {
		const q = worksQuery({
			anyField: searchAnyText
		})

		router.setParams({
			ao3Query: q.paramsAsJSON()
		})
	}

	// const results = useAsyncMemo(() => workSearchResultsScraper(), () => {}, [])

	// useEffect(() => {
	// 	console.log("layoutResults", results)
	// }, [ results ])

	return (
		<>
			<View>
				<Text>Searchbar</Text>
				<TextInput
					onChangeText={setSearchAnyText}
					value={searchAnyText}
					onSubmitEditing={submitHander}
				/>
			</View>
			<Slot />
		</>
	)
}