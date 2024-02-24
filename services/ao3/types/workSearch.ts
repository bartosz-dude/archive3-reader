export type Lang = "en" | ""
export type Rating =
	| "notRated"
	| "generalAudiences"
	| "teensAndUpAudiences"
	| "mature"
	| "explicit"
export type NumberSearch =
	| `${number}`
	| `<${number}`
	| `>${number}`
	| `${number}-${number}`

export enum RatingIds {
	notRated = 9,
	generalAudiences = 10,
	teensAndUpAudiences = 11,
	mature = 12,
	explicit = 13,
}

export const RatingIdsReversed = {
	"9": "notRated",
	"10": "generalAudiences",
	"11": "teensAndUpAudiences",
	"12": "mature",
	"13": "explicit",
}

export enum SortByValues {
	bestMatch = "_score",
	authors = "authors_to_sort_on",
	title = "title_to_sort_on",
	createdAt = "created_at",
	revisedAt = "revised_at",
	wordCount = "word_count",
	hits = "hits",
	kudosCount = "kudos_count",
	commentsCount = "comments_count",
	bookmarksCount = "bookmarks_count",
}

export const SortByValuesReversed = {
	_score: "bestMatch",
	authors_to_sort_on: "authors",
	title_to_sort_on: "title",
	created_at: "createdAt",
	revised_at: "revisedAt",
	word_count: "wordCount",
	hits: "hits",
	kudos_count: "kudosCount",
	comments_count: "commentsCount",
	bookmarks_count: "bookmarksCount",
}

export enum WarningsIds {
	creatorChoseNotToUseArchiveWarnings = 14,
	gaphicDepictionsOfViolence = 17,
	majorCharacterDeath = 18,
	noArchiveWarningsApply = 16,
	rapeNonCon = 19,
	underage = 20,
}

export const WarningsIdsReversed = {
	"14": "creatorChoseNotToUseArchiveWarnings",
	"17": "gaphicDepictionsOfViolence",
	"18": "majorCharacterDeath",
	"16": "noArchiveWarningsApply",
	"19": "rapeNonCon",
	"20": "underage",
}

export enum CategoriesIds {
	fF = 116,
	fM = 22,
	gen = 21,
	mM = 23,
	multi = 2246,
	other = 24,
}

export const CategoriesIdsReversed = {
	"116": "fF",
	"22": "fM",
	"21": "gen",
	"23": "mM",
	"2246": "multi",
	"24": "other",
}

type requiredAO3WorkSearchFields =
	| "sortBy"
	| "sortDirection"
	| "completionStatus"
	| "crossovers"

export type AO3WorkSearchQuery = Partial<AO3WorkSearch>
export type AO3WorkSearchFetch = Omit<
	AO3WorkSearchQuery,
	requiredAO3WorkSearchFields
> &
	Pick<AO3WorkSearch, requiredAO3WorkSearchFields>

export type AO3WorkSearchNumberSearchFields =
	| "wordCount"
	| "hits"
	| "kudos"
	| "comments"
	| "bookmarks"

export interface AO3WorkSearch {
	anyField: string
	title: string
	authorArtist: string
	date: string
	completionStatus: "allWorks" | "completeWorksOnly" | "worksInProgressOnly"
	crossovers: "includeCrossovers" | "excludeCrossovers" | "onlyCrossovers"
	singleChapter: boolean
	wordCount: NumberSearch
	language: Lang
	fandoms: string[]
	rating: Rating
	warnings: {
		creatorChoseNotToUseArchiveWarnings?: boolean
		gaphicDepictionsOfViolence?: boolean
		majorCharacterDeath?: boolean
		noArchiveWarningsApply?: boolean
		rapeNonCon?: boolean
		underage?: boolean
	}
	categories: {
		fF?: boolean
		fM?: boolean
		gen?: boolean
		mM?: boolean
		multi?: boolean
		other?: boolean
	}
	characters: string[]
	relationships: string[]
	additionalTags: string[]
	hits: NumberSearch
	kudos: NumberSearch
	comments: NumberSearch
	bookmarks: NumberSearch
	sortBy:
		| "bestMatch"
		| "authors"
		| "title"
		| "createdAt"
		| "revisedAt"
		| "wordCount"
		| "hits"
		| "kudosCount"
		| "commentsCount"
		| "bookmarksCount"
	sortDirection: "asc" | "desc"
}

export interface AO3Query {
	commit: "Search"
	"work_search[bookmarks_count]": NumberSearch
	"work_search[character_names]": string
	"work_search[comments_count]": NumberSearch
	"work_search[complete]": string
	"work_search[creators]": string
	"work_search[crossover]": string
	"work_search[fandom_names]": string
	"work_search[freeform_names]": string
	"work_search[hits]": NumberSearch
	"work_search[kudos_count]": NumberSearch
	"work_search[language_id]": Lang
	"work_search[query]": string
	"work_search[relationship_names]": string
	"work_search[revised_at]": string
	"work_search[sort_column]": string
	"work_search[sort_direction]": string
	"work_search[title]": string
	"work_search[word_count]": NumberSearch
}
