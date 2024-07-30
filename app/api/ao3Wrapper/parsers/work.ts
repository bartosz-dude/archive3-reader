import { parse } from "node-html-better-parser"
import type { WorkAO3 } from "../types/work"
import arrayToUndefined from "../../../utils/arrayToUndefined"
import ratingRawParser from "./ratingRaw"
import type {
	CategoryAO3Raw,
	CompletionStatusAO3,
	LanguagesAO3,
	RatingAO3Raw,
	WarningAO3Raw,
} from "../types/generic"
import warningRawParser from "./warningRaw"
import categoryRawParser from "./categoryRaw"

export default function workParser(html: string): WorkAO3 {
	const root = parse(html)

	const navActionsDiv = root.querySelector(".work.navigation.actions")!

	// workId
	const shareDiv = navActionsDiv.querySelector(".share")!
	// it has only one child, link elem to share the work
	const shareHrefRaw = shareDiv.children[0].attributes.href!
	const id = parseInt(
		shareHrefRaw.replace("/works/", "").replace("/share", "")
	)

	// chapterId and chapters
	let chapterId: number | undefined
	let chapters: WorkAO3["chapters"] = []
	const chaptersList = navActionsDiv.querySelector("#selected_id")
	if (chaptersList) {
		chaptersList.children.forEach((v) => {
			const id = parseInt(v.attributes.value)

			if (v.attributes.selected) {
				chapterId = id
			}

			let title: string | undefined
			const titleRaw = v.rawText.replace(/^\d*\. /, "")
			if (!titleRaw.match(/Chapter \d*$/)) {
				title = titleRaw
			}

			chapters!.push({
				id: id,
				title: title,
			})
		})
	}

	chapters = arrayToUndefined(chapters)

	// meta
	const workMetaDiv = root.querySelector(".work.meta.group")

	// each stat class has two elements, the title and the value and this returns the value elem
	function metaGetter(className: string) {
		return workMetaDiv?.querySelectorAll(`.${className}`)[1]
	}

	// every meta tag elem is a list of tags
	function metaTagsGetter(className: string) {
		const tagsListDiv = metaGetter(className)
		const tagsList = tagsListDiv?.querySelectorAll(".tag")
		return tagsList?.map((v) => v.rawText)
	}

	// tags
	const rating = metaTagsGetter("rating")?.map((v) =>
		ratingRawParser(v as RatingAO3Raw)
	)
	const warnings = metaTagsGetter("warning")?.map((v) =>
		warningRawParser(v as WarningAO3Raw)
	)
	const category = metaTagsGetter("category")?.map((v) =>
		categoryRawParser(v as CategoryAO3Raw)
	)
	const fandoms = metaTagsGetter("fandom")
	const relationships = metaTagsGetter("relationship")
	const characters = metaTagsGetter("character")
	const freeform = metaTagsGetter("freeform")

	// series
	// this contains spans with "series" class
	const seriesDiv = workMetaDiv?.querySelector(".series")

	const seriesRaw = seriesDiv?.children
	const series: WorkAO3["meta"]["series"] = seriesRaw?.map((serie) => {
		const previousId = serie
			.querySelector(".previous")
			?.attributes.href.replace("/works/", "")
		const nextId = serie
			.querySelector(".next")
			?.attributes.href.replace("/works/", "")

		const positionSpan = serie.querySelector(".position")

		const titleLink = positionSpan?.children.at(-1)
		const title = titleLink?.rawText!
		const id = parseInt(
			titleLink?.attributes.href.replace("/series/", "") ?? ""
		)

		titleLink?.remove()

		const part = parseInt(
			positionSpan?.rawText.replace(/^Part /, "").replace(/ of $/, "") ??
				""
		)

		return {
			id: id,
			part: part,
			title: title,
			nextWorkId: nextId !== undefined ? parseInt(nextId) : undefined,
			previousWorkId:
				previousId !== undefined ? parseInt(previousId) : undefined,
		}
	})

	// language
	const language = metaGetter("language")?.attributes.lang as LanguagesAO3

	// stats
	function statGetter(className: string) {
		return metaGetter("stats")
			?.querySelector(".stats")
			?.querySelectorAll(`.${className}`)[1]
	}

	function intParser(raw: string | undefined) {
		if (raw) return parseInt(raw)
	}

	const words = parseInt(statGetter("words")?.rawText.replace(",", "") ?? "")

	const commentsRaw = statGetter("comments")?.rawText.replace(",", "")
	const comments = intParser(commentsRaw)

	const kudosRaw = statGetter("kudos")?.rawText.replace(",", "")
	const kudos = intParser(kudosRaw)

	const bookmarksRaw = statGetter("bookmarks")?.rawText.replace(",", "")
	const bookmarks = intParser(bookmarksRaw)

	const hitsRaw = statGetter("hits")?.rawText.replace(",", "")
	const hits = intParser(hitsRaw)

	const chaptersRaw = statGetter("chapters")?.rawText.split("/") as [
		string,
		string
	]
	const chaptersStat = {
		current: parseInt(chaptersRaw[0]),
		total: chaptersRaw[1] == "?" ? undefined : parseInt(chaptersRaw[1]),
	}

	const publishedRaw = statGetter("published")
	const published = new Date(`${publishedRaw?.rawText}`)

	const completionStatusRaw = workMetaDiv?.querySelector(".status")?.rawText
	const completionStatus: CompletionStatusAO3 = completionStatusRaw?.match(
		/^Completed/
	)
		? "complete"
		: "workInProgress"

	const statusRaw = statGetter("status")
	const status = statusRaw ? new Date(`${statusRaw?.rawText}`) : undefined

	// work
	const workskinDiv = root.querySelector("#workskin")

	const prefaceDiv = workskinDiv?.querySelector(".preface.group")

	const titleRaw = prefaceDiv?.querySelector(".title")?.rawText
	const title = titleRaw?.trim()!

	const author: WorkAO3["author"] = prefaceDiv
		?.querySelector(".byline.heading")!
		?.children.reduce((prev: WorkAO3["author"], v) => {
			if (v.attributes.rel == "author") {
				const href = v.attributes.href
				const userPseudoCombo = href
					.replace("/users/", "")
					.replace("/pseuds", "")
				const userPseudo = userPseudoCombo.split("/") as [
					string,
					string
				]

				prev.push({
					user: userPseudo[0],
					pseudo: userPseudo[1],
				})
			}
			return prev
		}, [])

	const summary =
		prefaceDiv?.querySelector(".summary")?.querySelector(".userstuff")
			?.innerHTML ?? ""

	const topNotes =
		prefaceDiv?.querySelector(".notes")?.querySelector(".userstuff")
			?.innerHTML ?? ""

	const bottomNotes =
		workskinDiv
			?.querySelector(".end.notes.module")
			?.querySelector(".userstuff")?.innerHTML ?? ""

	const content =
		workskinDiv?.querySelector("#chapters")?.querySelector(".userstuff")
			?.innerHTML ?? ""

	return {
		workId: id,
		chapterId: chapterId,
		chapters: chapters,
		meta: {
			category: category,
			fandoms: fandoms,
			rating: rating?.[0],
			tags: {
				characters: characters,
				freeforms: freeform,
				relationships: relationships,
				warnings: warnings,
			},
			warning: warnings,
			series: series,
			language: language,
			completionStatus: completionStatus,
			stats: {
				chapters: chaptersStat,
				datePublished: published,
				words: words,
				bookmarks: bookmarks,
				comments: comments,
				dateUpdated: status,
				hits: hits,
				kudos: kudos,
			},
		},
		author: author,
		content: content,
		title: title,
		bottomNotes: bottomNotes,
		summary: summary,
		topNotes: topNotes,
	}
}
