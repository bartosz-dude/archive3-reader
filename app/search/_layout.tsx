import { Slot, Stack, router, useGlobalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import workSearchURL from "../../services/ao3/scraper/workSearchUrl";
import worksQuery from "../../services/ao3/api/worksQuery";
import workSearchResultsScraper from "../../services/ao3/scraper/workSearchResults";
import useAsyncMemo from "../../hooks/useAsyncMemo";

export default function Layout() {



	// const results = useAsyncMemo(() => workSearchResultsScraper(), () => {}, [])

	// useEffect(() => {
	// 	console.log("layoutResults", results)
	// }, [ results ])

	return (
		<>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,

					}}
				/>
				<Stack.Screen
					name="detailsModal"
					options={{
						presentation: "fullScreenModal"
					}}
				/>


				{/* <Slot /> */}
			</Stack>
		</>
	)
}