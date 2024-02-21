export interface Settings {
	savedSearchesAsDefault: boolean
	showedDisclamer: boolean
	readerFormat: {
		fontFamily: string
		fontSize: number
		fontWeight: 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
		wordSpacing: number
		lineSpacing: number
		paragraphSpacing: number
		horizontalSpacing: number
		background: "white" | "warm"
	}
}
