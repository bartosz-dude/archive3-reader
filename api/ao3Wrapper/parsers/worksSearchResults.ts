import { parse, HTMLElement } from "node-html-better-parser"
import type { WorksSearchResultsAO3 } from "../types/worksSearchResults"
import ratingRawParser from "./ratingRaw"
import type {
	CategoryAO3,
	CategoryAO3Raw,
	CompletionStatusAO3,
	LanguagesAO3,
	MonthAO3,
	RatingAO3Raw,
	WarningAO3Raw,
} from "../types/generic"
import warningRawParser from "./warningRaw"
import categoryRawParser from "./categoryRaw"
import { MonthNumber } from "../constants"

export default function worksSearchResultsParser(
	html: string
): WorksSearchResultsAO3 {
	const aboutPage = {
		page: 0,
		totalPages: 0,
	}
	let results: WorksSearchResultsAO3["results"] = []

	const root = parse(html)

	const resultsDivs = root.querySelectorAll(".work.blurb")
	if (resultsDivs.length > 0) {
		aboutPage.page = 1
		aboutPage.totalPages = 1

		results = resultsDivs.map((result) => {
			// contains id, title and authors
			const heading = result.querySelector(".heading")

			let id = 0
			let title = ""
			const author: WorksSearchResultsAO3["results"][0]["author"] = []

			heading!.children.forEach((headingElem, index) => {
				if (index == 0) {
					title = headingElem.rawText

					const href = headingElem.attributes.href
					id = parseInt(href.replace("/works/", ""))
				}

				if (headingElem.attributes.rel == "author") {
					const href = headingElem.attributes.href
					const userPseudoCombo = href
						.replace("/users/", "")
						.replace("/pseuds", "")
					const userPseudo = userPseudoCombo.split("/") as [
						string,
						string
					]

					author.push({
						user: userPseudo[0],
						pseudo: userPseudo[1],
					})
				}
			})

			// fandoms
			const fandomsHeading = result.querySelector(".fandoms.heading")

			const fandoms = fandomsHeading?.querySelectorAll(".tag") ?? []
			const fandomsNames = fandoms.map((v) => {
				return v.rawText
			})

			// required tags
			const requiredTags = result.querySelector(".required-tags")

			const ratingTitle = requiredTags?.querySelector(".rating")
				?.attributes.title as RatingAO3Raw
			const rating = ratingRawParser(ratingTitle)

			const warningTitle = requiredTags
				?.querySelector(".warnings")
				?.attributes.title.split(", ") as WarningAO3Raw[]
			const warning = warningTitle.map((v) => warningRawParser(v))

			// const complete =
			// 	requiredTags?.querySelector(".complete-yes") ??
			// 	requiredTags?.querySelector(".complete-no") ??
			// 	null
			// console.log(complete)
			// this will make a work with unknown status a "work in progress", because I don't expect there to be any such work
			const completeStatus: CompletionStatusAO3 =
				requiredTags?.querySelector(".complete-yes")
					? "complete"
					: "workInProgress"

			const categoryTitle =
				requiredTags?.querySelector(".category")?.attributes.title
			const categoriesRaw = categoryTitle?.split(", ")
			const categories =
				categoriesRaw?.reduce((prev: CategoryAO3[], v, i, a) => {
					if (v == "No category") {
						return prev
					}

					prev.push(categoryRawParser(v as CategoryAO3Raw))
					return prev
				}, []) ?? []

			// date
			const dateElem = result.querySelector(".datetime")
			const splitDate = dateElem!.rawText.split(" ") as [
				string,
				MonthAO3,
				string
			]
			const date = new Date(
				`${splitDate[2]}-${MonthNumber[splitDate[1]]}-${splitDate[0]}`
			)

			// tags
			const tags = result.querySelector(".tags")

			const warningsTags = tags
				?.querySelectorAll(".warnings")
				.map((v) => v.rawText)
			const relationshipsTags = tags
				?.querySelectorAll(".relationships")
				.map((v) => v.rawText)
			const charactersTags = tags
				?.querySelectorAll(".characters")
				.map((v) => v.rawText)
			const freeformsTags = tags
				?.querySelectorAll(".freeforms")
				.map((v) => v.rawText)

			// summary
			const summary =
				result.querySelector(".userstuff.summary")?.innerHTML ?? ""

			// series
			const seriesDiv = result.querySelector(".series")
			const series: WorksSearchResultsAO3["results"][0]["series"] = []
			if (seriesDiv) {
				seriesDiv.children.forEach((v) => {
					// TODO check if this works, because supposedly text is ignored
					// structure has "text, elem (part number), text, elem (link to series)", so if it ignores it should be "elem, elem"

					const part = parseInt(v.children[0].rawText)

					const seriesId = parseInt(
						v.children[1].attributes.href.replace("/series/", "")
					)
					const title = v.children[1].rawText

					series.push({
						part: part,
						id: seriesId,
						title: title,
					})
				})
			}

			// stats
			const statsDiv = result.querySelector(".stats")

			// each stat class has two elements, the title and the value and this returns the value elem
			function statGetter(className: string) {
				return statsDiv?.querySelectorAll(`.${className}`)[1]
			}
			function intParser(raw: string | undefined) {
				if (raw) return parseInt(raw)
			}

			const language = statGetter("language")?.attributes
				.lang as LanguagesAO3
			const words = parseInt(
				statGetter("words")?.rawText.replace(",", "") ?? ""
			)

			const commentsRaw = statGetter("comments")?.rawText.replace(",", "")
			const comments = intParser(commentsRaw)

			const kudosRaw = statGetter("kudos")?.rawText.replace(",", "")
			const kudos = intParser(kudosRaw)

			const bookmarksRaw = statGetter("bookmarks")?.rawText.replace(
				",",
				""
			)
			const bookmarks = intParser(bookmarksRaw)

			const hitsRaw = statGetter("hits")?.rawText.replace(",", "")
			const hits = intParser(hitsRaw)

			const chaptersRaw = statGetter("chapters")?.rawText.split("/") as [
				string,
				string
			]
			const chapters = {
				current: parseInt(chaptersRaw[0]),
				total:
					chaptersRaw[1] == "?"
						? undefined
						: parseInt(chaptersRaw[1]),
			}

			return {
				id: id,
				title: title,
				author: author,
				date: date,
				fandoms: fandomsNames,
				rating: rating,
				warning: warning,
				completionStatus: completeStatus,
				category: categories,
				tags: {
					characters: charactersTags,
					freeforms: freeformsTags,
					relationships: relationshipsTags,
					warnings: warningsTags,
				},
				summary: summary,
				series: series,
				stats: {
					language: language,
					words: words,
					bookmarks: bookmarks,
					comments: comments,
					hits: hits,
					kudos: kudos,
					chapters: chapters,
				},
			}
		})
	}

	const paginationDiv = root.querySelector(".pagination.actions")
	if (paginationDiv) {
		const currentPageSpan = paginationDiv.querySelector(".current")
		const currentPage = parseInt(currentPageSpan!.rawText)

		// removes the "Next ->" text, so the lust child is the page button
		// console.log(paginationDiv.lastChild.rawText)
		paginationDiv.querySelector(".next")?.remove()

		const lastPageSpan = paginationDiv.children.at(-1)
		const totalPages = parseInt(lastPageSpan!.rawText)

		aboutPage.page = currentPage
		aboutPage.totalPages = totalPages
	}

	return {
		...aboutPage,
		results: results,
	}
}
