import AsyncStorage from "@react-native-async-storage/async-storage"
import { Settings } from "../types/settings"
import getSettings from "./getSettings"

export default async function saveSettings(newSettings?: Partial<Settings>) {
	const prevSettings = await getSettings()
	const settings: Settings = {
		...prevSettings,
		...newSettings,
	}

	await AsyncStorage.setItem("settings", JSON.stringify(settings))
}
