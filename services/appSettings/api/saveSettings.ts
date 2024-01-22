import AsyncStorage from "@react-native-async-storage/async-storage";
import { Settings } from "../types/settings";

export default async function saveSettings(newSettings?: Partial<Settings>) {
	const settings: Settings = {
		savedSearchesAsDefault: false,
		...newSettings
	}

	await AsyncStorage.setItem("settings", JSON.stringify(settings))
}