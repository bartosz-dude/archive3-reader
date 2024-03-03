import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useFonts } from "expo-font"
import { Slot, SplashScreen, Stack } from "expo-router"
import { useEffect, useState } from "react"
import "react-native-url-polyfill/auto"
import useLoadingHandler from "../hooks/useLoadingHandler"
import { MenuProvider } from "react-native-popup-menu"
import ThemeManager from "../components/ThemeManager"
import { SettingsProvider } from "../services/appSettings/components/settingsProvider"
import setupSettings from "../services/appSettings/api/setupSettings"
import setupDB from "../services/saver/api/setupDB"

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
console.log("app prestart")
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [backendLoaded, setBackendLoaded] = useState(false)
	const [loadedFont, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	})

	const loaded = useLoadingHandler([backendLoaded, loadedFont])

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (backendLoaded) {
			SplashScreen.hideAsync()
		}
	}, [backendLoaded])

	useEffect(() => {
		const initSetup = async () => {
			console.log("app init")
			await setupSettings()
			await setupDB()
			setBackendLoaded(true)
			console.log("app init complete")
		}
		initSetup()
	}, [])

	if (!backendLoaded) {
		return null
	}

	return <RootLayoutNav />
}

function RootLayoutNav() {
	return (
		// <Slot />
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
