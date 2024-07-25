import type { Defined } from "../../../utils/defined"
import { Constants } from "../constants"
import worksSearchResultsParser from "../parsers/worksSearchResults"
import type { RatingAO3 } from "../types/generic"
import type { WorkSearchQueryAO3 } from "../types/worksSearchQuery"
import type { WorksSearchResultsAO3 } from "../types/worksSearchResults"

const completionsIds: Record<
	Defined<WorkSearchQueryAO3["completionStatus"]>,
	string
> = {
	all: "",
	workInProgress: "F",
	complete: "T",
}

const crossoversIds: Record<
	Defined<WorkSearchQueryAO3["crossovers"]>,
	string
> = {
	include: "",
	exclude: "F",
	only: "T",
}

const ratingIds: Record<RatingAO3, number> = {
	notRated: 9,
	explicit: 13,
	generalAudiences: 10,
	mature: 12,
	teenAndUpAudiences: 11,
}

const sortIds: Record<Defined<WorkSearchQueryAO3["sortBy"]>, string> = {
	author: "authors_to_sort_on",
	bestMatch: "_score",
	comments: "comments_count",
	datePosted: "created_at",
	dateUpdated: "revised_at",
	hits: "hits",
	kudos: "kudos_count",
	title: "title_to_sort_on",
	wordCount: "word_count",
}

const directionsIds: Record<
	Defined<WorkSearchQueryAO3["sortDirection"]>,
	string
> = {
	ascending: "asc",
	descending: "desc",
}

export default async function queryWorks(
	query: WorkSearchQueryAO3
): Promise<WorksSearchResultsAO3> {
	const queryUrl = new URL("https://" + Constants.hostname + "/works/search")
	const queryUrlParams = queryUrl.searchParams

	query.anyField && queryUrlParams.set("work_search[query]", query.anyField)
	query.title && queryUrlParams.set("work_search[title]", query.title)
	query.author && queryUrlParams.set("work_search[creators]", query.author)

	if (query.date) {
		if (query.date instanceof Date) {
			// converts to ao3 date search format i.e.
			// given 'query.date == 1 Jan 2024' and 'Date.now == 1 Feb 2024'
			// this will make it into "31 days"
			const daysDifference = Math.floor(
				(Date.now() - query.date.getTime()) / 1000 / 60 / 60 / 24
			)
			queryUrlParams.set(
				"works_search[revised_at]",
				`${daysDifference} days`
			)
		} else {
			let daysDifferenceBefore: number | undefined
			let daysDifferenceAfter: number | undefined

			if (query.date.before instanceof Date) {
				const daysDifference = Math.floor(
					(Date.now() - query.date.before.getTime()) /
						1000 /
						60 /
						60 /
						24
				)
				daysDifferenceBefore = daysDifference
			}
			if (query.date.after instanceof Date) {
				const daysDifference = Math.floor(
					(Date.now() - query.date.after.getTime()) /
						1000 /
						60 /
						60 /
						24
				)
				daysDifferenceAfter = daysDifference
			}

			let dataQuery = ""
			// before
			if (
				daysDifferenceAfter !== undefined &&
				daysDifferenceBefore === undefined
			) {
				dataQuery = `> ${daysDifferenceBefore} days`
			}
			// after
			if (
				daysDifferenceAfter === undefined &&
				daysDifferenceBefore !== undefined
			) {
				dataQuery = `< ${daysDifferenceBefore} days`
			}
			// between
			if (
				daysDifferenceAfter === undefined &&
				daysDifferenceBefore === undefined
			) {
				dataQuery = `${daysDifferenceAfter}-${daysDifferenceBefore} days`
			}

			queryUrlParams.set("work_search[revised_at]", dataQuery)
		}
	}

	queryUrlParams.set(
		"work_search[complete]",
		completionsIds[query.completionStatus ?? "all"]
	)

	queryUrlParams.set(
		"work_search[crossover]",
		crossoversIds[query.crossovers ?? "include"]
	)

	query.singleChapter &&
		queryUrlParams.set(
			"work_search[single_chapter]",
			query.singleChapter ? "1" : "0"
		)

	if (query.wordCount) {
		if (typeof query.wordCount == "number") {
			query.wordCount &&
				queryUrlParams.set(
					"work_search[word_count]",
					query.wordCount.toString()
				)
		} else {
			// from
			if (
				typeof query.wordCount.from == "number" &&
				query.wordCount.to === undefined
			) {
				queryUrlParams.set(
					"work_search[word_count]",
					`>${query.wordCount.from}`
				)
			}
			// to
			else if (
				query.wordCount.from === undefined &&
				typeof query.wordCount.to == "number"
			) {
				queryUrlParams.set(
					"work_search[word_count]",
					`<${query.wordCount.to}`
				)
			}
			// between
			else {
				queryUrlParams.set(
					"work_search[word_count]",
					`${query.wordCount.from}-${query.wordCount.to}`
				)
			}
		}
	}

	query.language &&
		queryUrlParams.set("work_search[language_id]", query.language)
	query.fandoms &&
		queryUrlParams.set("work_search[fandom_names]", query.fandoms.join(","))
	query.rating &&
		queryUrlParams.set(
			"work_search[rating_ids]",
			ratingIds[query.rating].toString()
		)
	query.characters &&
		queryUrlParams.set(
			"work_search[character_names]",
			query.characters.toString()
		)
	query.relationships &&
		queryUrlParams.set(
			"work_search[character_names]",
			query.relationships.toString()
		)
	query.additionalTags &&
		queryUrlParams.set(
			"work_search[freeform_names]",
			query.additionalTags.toString()
		)

	if (query.hits) {
		if (typeof query.hits == "number") {
			query.hits &&
				queryUrlParams.set("work_search[hits]", query.hits.toString())
		} else {
			// from
			if (
				typeof query.hits.from == "number" &&
				query.hits.to === undefined
			) {
				queryUrlParams.set("work_search[hits]", `>${query.hits.from}`)
			}
			// to
			else if (
				query.hits.from === undefined &&
				typeof query.hits.to == "number"
			) {
				queryUrlParams.set("work_search[hits]", `<${query.hits.to}`)
			}
			// between
			else {
				queryUrlParams.set(
					"work_search[hits]",
					`${query.hits.from}-${query.hits.to}`
				)
			}
		}
	}

	if (query.kudos) {
		if (typeof query.kudos == "number") {
			query.kudos &&
				queryUrlParams.set(
					"work_search[kudos_count]",
					query.kudos.toString()
				)
		} else {
			// from
			if (
				typeof query.kudos.from == "number" &&
				query.kudos.to === undefined
			) {
				queryUrlParams.set(
					"work_search[kudos_count]",
					`>${query.kudos.from}`
				)
			}
			// to
			else if (
				query.kudos.from === undefined &&
				typeof query.kudos.to == "number"
			) {
				queryUrlParams.set(
					"work_search[kudos_count]",
					`<${query.kudos.to}`
				)
			}
			// between
			else {
				queryUrlParams.set(
					"work_search[kudos_count]",
					`${query.kudos.from}-${query.kudos.to}`
				)
			}
		}
	}

	if (query.comments) {
		if (typeof query.comments == "number") {
			query.comments &&
				queryUrlParams.set(
					"work_search[comments_count]",
					query.comments.toString()
				)
		} else {
			// from
			if (
				typeof query.comments.from == "number" &&
				query.comments.to === undefined
			) {
				queryUrlParams.set(
					"work_search[comments_count]",
					`>${query.comments.from}`
				)
			}
			// to
			else if (
				query.comments.from === undefined &&
				typeof query.comments.to == "number"
			) {
				queryUrlParams.set(
					"work_search[comments_count]",
					`<${query.comments.to}`
				)
			}
			// between
			else {
				queryUrlParams.set(
					"work_search[comments_count]",
					`${query.comments.from}-${query.comments.to}`
				)
			}
		}
	}

	if (query.bookmarks) {
		if (typeof query.bookmarks == "number") {
			query.bookmarks &&
				queryUrlParams.set(
					"work_search[bookmarks_count]",
					query.bookmarks.toString()
				)
		} else {
			// from
			if (
				typeof query.bookmarks.from == "number" &&
				query.bookmarks.to === undefined
			) {
				queryUrlParams.set(
					"work_search[bookmarks_count]",
					`>${query.bookmarks.from}`
				)
			}
			// to
			else if (
				query.bookmarks.from === undefined &&
				typeof query.bookmarks.to == "number"
			) {
				queryUrlParams.set(
					"work_search[bookmarks_count]",
					`<${query.bookmarks.to}`
				)
			}
			// between
			else {
				queryUrlParams.set(
					"work_search[bookmarks_count]",
					`${query.bookmarks.from}-${query.bookmarks.to}`
				)
			}
		}
	}

	queryUrlParams.set(
		"work_search[sort_column]",
		sortIds[query.sortBy ?? "bestMatch"]
	)

	queryUrlParams.set(
		"work_search[sort_direction]",
		directionsIds[query.sortDirection ?? "descending"]
	)

	query.page && queryUrlParams.set("page", query.page.toString())

	queryUrlParams.set("commit", "Search")

	console.log(queryUrl)

	const queryResponse = await fetch(queryUrl)
	const queryText = await queryResponse.text()

	const queryParsed = worksSearchResultsParser(queryText)

	return queryParsed
}
