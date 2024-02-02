import {
	Slot,
	Stack,
	router,
	useGlobalSearchParams,
	useNavigation,
} from "expo-router"
import { useEffect, useState } from "react"
import { Text, TextInput, TextInputProps, View } from "react-native"
import workSearchURL from "../../../services/ao3/tools/workSearchUrl"
import worksQuery from "../../../services/ao3/api/worksQuery"
import workSearchResultsScraper from "../../../services/ao3/scraper/workSearchResults"
import useAsyncMemo from "../../../hooks/useAsyncMemo"
import SearchBar from "../../../components/search/SearchBar"
import { useSettings } from "../../../services/appSettings/components/settingsProvider"

export default function SearchLayout() {
	// const results = useAsyncMemo(() => workSearchResultsScraper(), () => {}, [])

	// useEffect(() => {
	// 	console.log("layoutResults", results)
	// }, [ results ])
	const { settings } = useSettings()

	return (
		<>
			<SearchBar />
			<Stack
				screenOptions={{
					animation: "none",
				}}
				// initialRouteName={
				// 	// settings.savedSearchesAsDefault ? "savedSearches" : "index"
				// 	// "savedSearches"
				// }
			>
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="savedSearches"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
			{/* <Slot /> */}
		</>
	)
}
