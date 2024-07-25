import type {
	CategoryAO3,
	CompletionStatusAO3,
	LanguagesAO3,
	RatingAO3,
	WarningAO3,
} from "./generic"

export interface WorksSearchResultsAO3 {
	results: {
		id: number
		title: string
		author: {
			user: string
			pseudo: string
		}[]
		// TODO add "for", example https://archiveofourown.org/works/50433769/chapters/127429228
		// in search results it shows as "for <person>"
		date: Date
		fandoms: string[]
		rating: RatingAO3
		warning: WarningAO3[]
		category: CategoryAO3[]
		completionStatus: CompletionStatusAO3
		tags: {
			warnings?: string[]
			characters?: string[]
			relationships?: string[]
			freeforms?: string[]
		}
		summary: string // html string
		series: {
			part: number
			title: string
			id: number
		}[]
		stats: {
			language: LanguagesAO3
			words: number
			chapters: {
				current: number
				total?: number
			}
			comments?: number
			kudos?: number
			bookmarks?: number
			hits?: number
		}
	}[]
	page: number
	totalPages: number
}
