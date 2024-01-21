export interface AO3WorkResult {
	meta: {
		id: number,
		tags: {
			rating: string,
			archiveWarnings: string[],
			categories: string[],
			fandoms: string[],
			relationships: string[],
			characters: string[],
			additionalTags: string[],
		}
		stats: {
			updated: string,
			words: number,
			chapters: number,
			maxChapters: number | null,
			comments: number,
			kudos: number,
			bookmarks: number,
			hits: number
		}
		language: string,
		authors: string[],
		title: string,
		summary: string
	}
}

export interface AO3WorkSearchResults {
	results: AO3WorkResult[],
	currentPage: number,
	totalPages: number,
	totalWorks: number
}