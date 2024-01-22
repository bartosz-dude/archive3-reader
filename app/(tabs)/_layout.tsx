import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSettings } from "../../services/appSettings/components/settingsProvider";

export default function TabsLayout() {

	const { settings } = useSettings()

	return (
		<>
			<Tabs
				screenOptions={{
					headerShown: false
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
						href: settings.savedSearchesAsDefault ? "/search/savedSearches" : "/search",
						title: "Search",
						tabBarIcon(props) {
							return <MaterialCommunityIcons name="magnify" size={props.size} color={props.color} />
						},
					}}
				/>
				{/* <Tabs.Screen
					name="saved/index"
					options={{
						href: "/saved",
						title: "Saved"
					}}
				/> */}
			</Tabs>
		</>
	)
}