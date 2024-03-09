import { Actions } from "../../../layouts/reader/actionSection/types"

type ReaderAction =
	| "previousChapter"
	| "nextChapter"
	| "about"
	| "chaptersList"
	| "formatMenu"
	| "original"
	| "notes"

export interface Settings {
	appVersion: string
	savedSearchesAsDefault: boolean
	showedDisclamer: boolean
	defaultTab: "search" | "saved"
	openLastWorkOnStart: boolean
	readerFormat: {
		fontFamily: string
		fontSize: number
		fontWeight: 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
		wordSpacing: number
		lineSpacing: number
		paragraphSpacing: number
		horizontalSpacing: number
		background: "white" | "warm"
		scrollDirection: "vertical" | "horizontal"
		scrollType: "smooth" | "paginated"
		actionBarLayout: {
			singleChapter: {
				actions: Actions[]
			}
			multiChapter: {
				actions: Actions[]
			}
			actionsDrawer: Actions[]
			alwaysHideTitles: boolean
		}
	}
	search: {}
	saved: {
		filters: {
			order: "latestAdded" | "oldestAdded" | "latestRead"
		}
	}
}
