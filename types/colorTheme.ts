export interface ColorTheme {
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
}
