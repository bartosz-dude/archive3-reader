type Lang = "en"
type Rating = "notRated" | "generalAudiences" | "teensAndUpAudiences" | "mature" | "explicit"
type NumberSearch = `${number}` | `<${number}` | `>${number}` | `${number}-${number}`

export enum RatingIds {
	notRated = 9,
	generalAudiences = 10,
	teensAndUpAudiences = 11,
	mature = 12,
	explicit = 13
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

export enum WarningsIds {
	creatorChoseNotToUseArchiveWarnings = 14,
	gaphicDepictionsOfViolence = 17,
	majorCharacterDeath = 18,
	noArchiveWarningsApply = 16,
	rapeNonCon = 19,
	underage = 20
}

export enum CategoriesIds {
	fF = 116,
	fM = 22,
	gen = 21,
	mM = 23,
	multi = 2246,
	other = 24
}

type requiredAO3WorkSearchFields = "sortBy" | "sortDirection" | "completionStatus" | "crossovers"

export type AO3WorkSearchQuery = Partial<AO3WorkSearch>
export type AO3WorkSearchFetch = Omit<AO3WorkSearchQuery, requiredAO3WorkSearchFields> & Pick<AO3WorkSearch, requiredAO3WorkSearchFields>

export type AO3WorkSearchNumberSearchFields = "wordCount" | "hits" | "kudos" | "comments" | "bookmarks"

export interface AO3WorkSearch {
	anyField: string,
	title: string,
	authorArtist: string,
	date: string,
	completionStatus: "allWorks" | "completeWorksOnly" | "worksInProgressOnly",
	crossovers: "includeCrossovers" | "excludeCrossovers" | "onlyCrossovers",
	singleChapter: boolean,
	wordCount: NumberSearch,
	language: Lang,
	fandoms: string[],
	rating: Rating,
	warnings: {
		creatorChoseNotToUseArchiveWarnings?: boolean,
		gaphicDepictionsOfViolence?: boolean,
		majorCharacterDeath?: boolean,
		noArchiveWarningsApply?: boolean,
		rapeNonCon?: boolean,
		underage?: boolean
	},
	categories: {
		fF?: boolean,
		fM?: boolean,
		gen?: boolean,
		mM?: boolean,
		multi?: boolean,
		other?: boolean
	},
	characters: string[],
	relationships: string[],
	additionalTags: string[],
	hits: NumberSearch,
	kudos: NumberSearch,
	comments: NumberSearch,
	bookmarks: NumberSearch,
	sortBy: "bestMatch" | "authors" | "title" | "createdAt" | "revisedAt" | "wordCount" | "hits" | "kudosCount" | "commentsCount" | "bookmarksCount",
	sortDirection: "asc" | "desc"
}