import AsyncStorage from "@react-native-async-storage/async-storage"
import { Settings } from "../types/settings"
import getSettings from "./getSettings"
import { DeepPartial } from "../../../libs/react-native-loaded/types/loadedTypes"
import { mergeDeep } from "../../../tools/deepMerge"

export default async function saveSettings(newSettings: DeepPartial<Settings>) {
	const prevSettings = await getSettings()
	const settings: Settings = mergeDeep(prevSettings, newSettings)

	await AsyncStorage.setItem("settings", JSON.stringify(settings))
}
