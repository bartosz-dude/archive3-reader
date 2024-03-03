import { MaterialCommunityIcons } from "@expo/vector-icons"
import { SplashScreen, Tabs, router, useNavigation } from "expo-router"
import { Text, View } from "react-native"
import { useSettings } from "../../services/appSettings/components/settingsProvider"
import { useAppTheme } from "../../components/ThemeManager"
import { useEffect } from "react"

export default function TabsLayout() {
	const theme = useAppTheme()

	// useEffect(() => {
	// 	SplashScreen.hideAsync()
	// }, [])

	return (
		<>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor: theme.tabBar.selected,
					tabBarInactiveTintColor: theme.tabBar.unselected,
				}}
			>
				<Tabs.Screen
					name="search"
					options={{
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
