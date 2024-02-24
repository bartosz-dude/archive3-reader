import {
	AO3WorkSearch,
	AO3WorkSearchFetch,
	AO3WorkSearchNumberSearchFields,
	AO3WorkSearchQuery,
	CategoriesIds,
	SortByValues,
	WarningsIds,
} from "../types/workSearch"

export default function workSearchURL(query: AO3WorkSearchQuery) {
	const searchURL = new URL("https://archiveofourown.org/works/search")

	// return searchURL.toString()

	const workSearch: Omit<AO3WorkSearch, AO3WorkSearchNumberSearchFields> &
		Partial<Pick<AO3WorkSearch, AO3WorkSearchNumberSearchFields>> = {
		additionalTags: [],
		anyField: "",
		authorArtist: "",
		categories: {},
		characters: [],
		completionStatus: "allWorks",
		crossovers: "includeCrossovers",
		date: "",
		fandoms: [],
		language: "",
		rating: "notRated",
		relationships: [],
		singleChapter: false,
		sortBy: "revisedAt",
		sortDirection: "desc",
		title: "",
		warnings: {},
		...query,
	}

	// TODO rating not implemented somehow
	const params = new Map<string, string | string[]>([
		["query", workSearch.anyField],
		["title", workSearch.title],
		["creators", workSearch.authorArtist],
		["revised_at", workSearch.date],
		["complete", ""],
		["crossover", ""],
		["word_count", workSearch.wordCount ?? ""],
		["language_id", workSearch.language],
		["fandom_names", workSearch.fandoms.join(",")],
		[
			"archive_warning_ids",
			(
				Object.entries(workSearch.warnings) as [
					keyof typeof workSearch.warnings,
					boolean
				][]
			).reduce<string[]>((prev, [k, v]) => {
				if (v) prev.push(WarningsIds[k].toString())
				return prev
			}, []),
		],
		[
			"category_ids",
			(
				Object.entries(workSearch.categories) as [
					keyof typeof workSearch.categories,
					boolean
				][]
			).reduce<string[]>((prev, [k, v]) => {
				if (v) prev.push(CategoriesIds[k].toString())
				return prev
			}, []),
		],
		["character_names", workSearch.characters.join(",")],
		["relationship_names", workSearch.relationships.join(",")],
		["freeform_names", workSearch.additionalTags.join(",")],
		["hits", workSearch.hits ?? ""],
		["kudos_count", workSearch.kudos ?? ""],
		["comments_count", workSearch.comments ?? ""],
		["bookmarks_count", workSearch.bookmarks ?? ""],
		["sort_column", SortByValues[workSearch.sortBy]],
		["sort_direction", workSearch.sortDirection],
	])

	if (workSearch.singleChapter) {
		params.set("single_chapter", "1")
	}

	searchURL.searchParams.set("commit", "Search")

	params.forEach((v, k) => {
		if (!Array.isArray(v)) {
			searchURL.searchParams.set(`work_search[${k}]`, v)
			return
		}

		v.forEach((vi) => {
			searchURL.searchParams.append(`work_search[${k}][]`, vi)
		})
	})

	return searchURL
}
