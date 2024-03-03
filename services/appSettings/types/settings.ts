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
			actions: ReaderAction[]
		}
	}
	search: {}
	saved: {
		filters: {
			order: "latestAdded" | "oldestAdded" | "latestRead"
		}
	}
}
