import { Stack } from "expo-router"
import SearchBar from "../../../layouts/search/SearchBar"
import { useSettings } from "../../../services/appSettings/components/settingsProvider"

export default function SearchLayout() {
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
