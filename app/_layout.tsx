import "react-native-url-polyfill/auto"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Link, Slot, SplashScreen, Stack, Tabs } from "expo-router"
import { useEffect, useMemo, useState } from "react"
import {
	DevSettings,
	ScrollView,
	Text,
	View,
	useColorScheme,
} from "react-native"
import { MenuProvider } from "react-native-popup-menu"
import setupDB from "../services/saver/api/setupDB"
import getDB from "../services/database/getDB"
import * as Dev from "expo-dev-client"
import { SettingsProvider } from "../services/appSettings/components/settingsProvider"
import TabBar from "../components/TabBar"
import ThemeManager from "../components/ThemeManager"
import setupSettings from "../services/appSettings/api/setupSettings"

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	useEffect(() => {
		setupSettings()
		setupDB()
	}, [])

	if (!loaded) {
		return null
	}

	return <RootLayoutNav />
}

function RootLayoutNav() {
	return (
		<SettingsProvider>
			<ThemeManager>
				<MenuProvider>
					<Stack
						screenOptions={{
							headerShown: false,
							animation: "none",
						}}
						initialRouteName="(tabs)"
					>
						<Stack.Screen
							name="index"
							// redirect
						/>
						<Stack.Screen
							name="(tabs)"
							// options={{}}
						/>
					</Stack>
				</MenuProvider>
			</ThemeManager>
		</SettingsProvider>
	)
}
