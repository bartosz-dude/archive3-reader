import AsyncStorage from "@react-native-async-storage/async-storage"
import setupSettings from "./setupSettings"
import * as Updates from "expo-updates"

export default async function resetSettings() {
	await AsyncStorage.setItem("settings", JSON.stringify({}))
	await setupSettings()
	await Updates.reloadAsync()
}
