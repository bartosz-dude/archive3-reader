export interface ColorTheme {
	loadingIndicator: {
		background: string
		accent: string
	}
	header: {
		background: string
		accent: string
		font: string
		menuBackground: string
		menuFont: string
	}
	tabBar: {
		selected: string
		unselected: string
		background: string
		selectedFont: string
		unselectedFont: string
	}
	search: {
		titleFont: string
		authorFont: string
		summaryFont: string
		metaFont: string
		itemSeparator: string
		itemBackground: string
		background: string
	}
	saved: {
		titleFont: string
		authorFont: string
		summaryFont: string
		metaFont: string
		itemSeparator: string
		itemBackground: string
		background: string
	}
	savedSearches: {
		itemQueryFont: string
		itemOrderFont: string
		itemDelete: String
	}
	reader: {
		previousChapter: {
			is: string
			no: string
			font: string
		}
		nextChapter: {
			is: string
			no: string
			font: string
		}
	}
}
