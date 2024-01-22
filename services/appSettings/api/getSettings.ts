import AsyncStorage from "@react-native-async-storage/async-storage";
import { Settings } from "../types/settings";
import saveSettings from "./saveSettings";

export default async function getSettings() {
	let data = await AsyncStorage.getItem("settings")
	if (!data)
		await saveSettings()

	data = await AsyncStorage.getItem("settings") as string
	const settings = JSON.parse(data) as Settings

	return settings
}