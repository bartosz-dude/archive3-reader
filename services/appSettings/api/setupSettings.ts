import { Settings } from "../types/settings"
import getSettings from "./getSettings"
import saveSettings from "./saveSettings"

export default async function setupSettings() {
	const currentSettings = await getSettings()

	const settings: Settings = {
		savedSearchesAsDefault: currentSettings.savedSearchesAsDefault ?? false,
		showedDisclamer: currentSettings.showedDisclamer ?? false,
		readerFormat: {
			fontFamily: currentSettings.readerFormat.fontFamily ?? "serif",
			fontSize: currentSettings.readerFormat.fontSize ?? 14,
			fontWeight: currentSettings.readerFormat.fontWeight ?? 0,
			wordSpacing: currentSettings.readerFormat.wordSpacing ?? 1,
			lineSpacing: currentSettings.readerFormat.lineSpacing ?? 8,
			paragraphSpacing:
				currentSettings.readerFormat.paragraphSpacing ?? 10,
			horizontalSpacing:
				currentSettings.readerFormat.horizontalSpacing ?? 20,
			background: currentSettings.readerFormat.background ?? "white",
		},
	}

	await saveSettings(settings)
}
