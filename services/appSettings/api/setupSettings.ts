import * as app from "../../../app.json"
import { Settings } from "../types/settings"
import getSettings from "./getSettings"
import saveSettings from "./saveSettings"
export default async function setupSettings() {
	console.log("setting up settings db")
	try {
		const currentSettings = (await getSettings()) as Partial<Settings>

		const settings: Settings = {
			appVersion: app.expo.version,
			savedSearchesAsDefault:
				currentSettings?.savedSearchesAsDefault ?? false,
			showedDisclamer: currentSettings?.showedDisclamer ?? false,
			defaultTab: currentSettings?.defaultTab ?? "search",
			openLastWorkOnStart: currentSettings?.openLastWorkOnStart ?? false,
			readerFormat: {
				fontFamily:
					currentSettings?.readerFormat?.fontFamily ?? "serif",
				fontSize: currentSettings?.readerFormat?.fontSize ?? 14,
				fontWeight: currentSettings?.readerFormat?.fontWeight ?? 0,
				wordSpacing: currentSettings?.readerFormat?.wordSpacing ?? 1,
				lineSpacing: currentSettings?.readerFormat?.lineSpacing ?? 8,
				paragraphSpacing:
					currentSettings?.readerFormat?.paragraphSpacing ?? 5,
				horizontalSpacing:
					currentSettings?.readerFormat?.horizontalSpacing ?? 10,
				background:
					currentSettings?.readerFormat?.background ?? "white",
				scrollDirection:
					currentSettings?.readerFormat?.scrollDirection ??
					"vertical",
				scrollType:
					currentSettings?.readerFormat?.scrollType ?? "smooth",
				actionBarLayout: {
					multiChapter: {
						actions: currentSettings?.readerFormat?.actionBarLayout
							?.multiChapter?.actions ?? [
							"previous",
							"about",
							"chapters",
							"format",
							"original",
							"next",
						],
					},
					singleChapter: {
						actions: currentSettings?.readerFormat?.actionBarLayout
							?.singleChapter?.actions ?? [
							"previous",
							"about",
							"chapters",
							"format",
							"original",
							"next",
						],
					},
					actionsDrawer: currentSettings?.readerFormat
						?.actionBarLayout?.actionsDrawer ?? [
						"previous",
						"next",
						"about",
						"chapters",
						"format",
						"original",
						"drawer",
						"tts",
						"notes",
					],
					alwaysHideTitles:
						currentSettings?.readerFormat?.actionBarLayout
							?.alwaysHideTitles ?? false,
				},
			},
			search: {},
			saved: {
				filters: {
					order:
						currentSettings?.saved?.filters?.order ?? "latestAdded",
				},
			},
		}

		await saveSettings(settings)
	} catch (err) {
		console.warn(err)
	}
	console.log("setting up settings db completed")
}
