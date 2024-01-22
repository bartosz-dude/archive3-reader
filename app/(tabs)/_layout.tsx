import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function TabsLayout() {

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
						href: "/search",
						title: "Search",
						tabBarIcon(props) {
							return <MaterialCommunityIcons name="magnify" size={props.size} color={props.color} />
						},
					}}
				/>
			</Tabs>
		</>
	)
}