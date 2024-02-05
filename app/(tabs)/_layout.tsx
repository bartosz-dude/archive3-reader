import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Tabs, router, useNavigation } from "expo-router"
import { Text, View } from "react-native"
import { useSettings } from "../../services/appSettings/components/settingsProvider"

export default function TabsLayout() {
	const { settings } = useSettings()
	const nav = useNavigation()

	// console.log("layout", settings.savedSearchesAsDefault)

	return (
		<>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: "red",
				}}
				// tabBar={TabBar}
			>
				{/* <Tabs.Screen
					name="index"
					options={{
						href: "/",
						title: "home"
					}}
				/> */}
				<Tabs.Screen
					name="search"
					options={{
						// href: settings.savedSearchesAsDefault
						// 	? "/search/savedSearches"
						// 	: "/search",
						href: "/search",
						title: "search",
						tabBarIcon(props) {
							return (
								<MaterialCommunityIcons
									name="magnify"
									size={props.size}
									color={props.color}
								/>
							)
						},
					}}
					listeners={{
						tabPress: (e) => {
							// console.log(settings.savedSearchesAsDefault)
							// if (settings.savedSearchesAsDefault)
							// 	router.replace("/search/savedSearches")
						},
					}}
				/>
				<Tabs.Screen
					name="saved/index"
					options={{
						href: "/saved",
						title: "Saved",
						tabBarIcon(props) {
							return (
								<MaterialCommunityIcons
									name="book-outline"
									size={props.size}
									color={props.color}
								/>
							)
						},
					}}
				/>
			</Tabs>
		</>
	)
}
