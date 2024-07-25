import type {
	CategoryAO3,
	CompletionStatusAO3,
	LanguagesAO3,
	RatingAO3,
	WarningAO3,
} from "./generic"

export interface WorkSearchQueryAO3 {
	page?: number
	// work info
	anyField?: string
	title?: string
	author?: string
	date?:
		| Date
		| {
				before?: Date
				after?: Date
		  }
	completionStatus?: CompletionStatusAO3 | "all"
	crossovers?: "include" | "exclude" | "only"
	singleChapter?: boolean
	wordCount?:
		| number
		| {
				from?: number
				to?: number
		  }
	language?: LanguagesAO3
	fandoms?: string[]
	// work tags
	rating?: RatingAO3
	warnings?: WarningAO3[]
	categories?: CategoryAO3[]
	characters?: string[]
	relationships?: string[]
	additionalTags?: string[]
	// work stats
	hits?:
		| number
		| {
				from?: number
				to?: number
		  }
	kudos?:
		| number
		| {
				from?: number
				to?: number
		  }
	comments?:
		| number
		| {
				from?: number
				to?: number
		  }
	bookmarks?:
		| number
		| {
				from?: number
				to?: number
		  }
	// search
	sortBy?:
		| "bestMatch"
		| "author"
		| "title"
		| "datePosted"
		| "dateUpdated"
		| "wordCount"
		| "hits"
		| "kudos"
		| "comments"
	sortDirection?: "ascending" | "descending"
}
