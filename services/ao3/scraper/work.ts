// import parse from "node-html-parser"
import { Element } from "domhandler"
import { findAll, textContent } from "domutils"
import * as htmlParser from "htmlparser2"
import { parseDocument } from "htmlparser2"
import cleanTextContent from "../tools/cleanTextContent"
import findAllBy from "../tools/findAllBy"
import findOneBy from "../tools/findOneBy"
import htmlPruner from "../tools/htmlPruner"
import nCleaner from "../tools/nCleaner"
import parseComaDecToInt from "../tools/parseComaDecToInt"
import { AO3Work, MetaNumberStat, MetaTag, MetaTextStat } from "../types/work"
import workUrl from "../tools/workUrl"

export enum WorkScraperError {
	noChapter = "No chapter section found",
	noMeta = "No meta section found",
	noTitle = "No title section found",
	noArticle = "No article found",
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
// export function workScrapper(workId: number, chapter?: number): Promise<AO3Work>
// export function workScrapper(workId: number, chapterId?: string): Promise<AO3Work>
function workScraper(workId: number, chapterId: string): Promise<AO3Work> {
	const asyncParsing = new Promise<AO3Work>(async (resolve, reject) => {
		try {
			// console.log("link", `https://archiveofourown.org/works/${workId}/chapters/${chapterId}?view_adult=true`)

			const htmlStr = await (async () => {
				let tryCounter = 0
				let htmlData = null
				while (htmlData === null) {
					const data = await fetch(workUrl(workId, chapterId))
					// if (data.status === 429)
					if (data.ok) {
						return data
					}
					tryCounter++

					if (tryCounter >= 3)
						throw new Error(
							"Could not reach ao3; too many attempts"
						)

					await delay(5000)
				}

				return htmlData
			})()

			const htmlText = await htmlStr.text()
			// const htmlText = testHtml3
			// resolve(htmlText)
			// return

			// console.log("text", htmlText)
			// if (!htmlParser)
			// 	reject("")
			// const htmlStr = testHtml3
			const prunedHtmlStr = htmlText
				.split("</head>")[1]
				.split("<script")[0]

			// console.log("prune", prunedHtmlStr)

			const dom = htmlParser.parseDocument(prunedHtmlStr)

			function metaTagParser(type: MetaTag): string[] {
				const tags: string[] = []

				htmlParser.DomUtils.findAll((elem) => {
					// gets the parent containing the tags then the tags, because you can't get attribs on a elem.parent
					if (
						elem.attribs["class"] == `${type} tags` &&
						elem.name == "dd"
					) {
						htmlParser.DomUtils.findAll((elem) => {
							if (elem.attribs["class"] == "tag") {
								const tag = elem.children[0]

								if (tag.type == "text") {
									tags.push(tag.data)
								}
								return true
							}
							return false
						}, elem.children)
						return true
					}
					return false
				}, dom.children)

				return tags
			}

			function metaStatParser(type: "maxChapters"): number | null
			function metaStatParser(type: MetaNumberStat): number
			function metaStatParser(type: MetaTextStat): string
			function metaStatParser(
				type: MetaNumberStat | MetaTextStat
			): number | string | null {
				let stat: any

				htmlParser.DomUtils.findAll((elem) => {
					if (
						elem.attribs["class"] ==
							`${type == "maxChapters" ? "chapters" : type}` &&
						elem.name == "dd"
					) {
						const text = elem.children[0]

						if (type == "bookmarks") {
							const bookmarkText =
								htmlParser.DomUtils.getChildren(text)[0]
							if (bookmarkText.type == "text") {
								stat = parseInt(
									bookmarkText.data.replace(",", "")
								)
							}
						}

						if (text.type == "text")
							switch (type) {
								case "maxChapters":
								case "chapters": {
									stat = text.data
										.split("/")
										.map((v) =>
											parseInt(v.replace(",", ""))
										)[type == "chapters" ? 0 : 1]
									break
								}
								case "words":
								case "comments":
								case "kudos":
								case "hits": {
									stat = parseInt(text.data.replace(",", ""))
									break
								}
								case "published":
								case "status": {
									stat = text.data
									break
								}
							}
					}
					return false
				}, dom.children)

				if (typeof stat != "string" && isNaN(stat)) return null

				if (!stat) {
					return null
				}

				return stat
			}

			function otherParser(elemName: string, classStr: string) {
				return (
					htmlParser.DomUtils.findAll(
						(elem) =>
							elem.name == elemName &&
							elem.attribs["class"] == classStr,
						dom.children
					)
						.map(
							(v) =>
								v.children[0].type == "text" &&
								v.children[0].data
						)
						.filter((v) => typeof v == "string") as string[]
				).map((v) => v.replace(/\r?\n|\r/g, ""))
			}

			const work: AO3Work = {
				meta: {
					id: workId,

					language: otherParser("dd", "language")[0],
					title: otherParser("h2", "title heading")[0],

					authors: htmlParser.DomUtils.findAll(
						(elem) => elem.attribs["rel"] == "author",
						dom.children
					)
						.map(
							(v) =>
								v.children[0].type == "text" &&
								v.children[0].data
						)
						.filter((v) => typeof v == "string") as string[],

					summary: (() => {
						const blockquote = htmlParser.DomUtils.findOne(
							(elem) =>
								elem.name == "blockquote" &&
								elem.attribs["class"] == "userstuff",
							dom.children
						)

						if (blockquote) {
							return blockquote.children
								.map((v) => htmlParser.DomUtils.textContent(v))
								.slice(1, -1)
								.join("\n")
						}

						return ""
					})(),

					tags: {
						additionalTags: metaTagParser("freeform"),
						archiveWarnings: metaTagParser("warning"),
						categories: metaTagParser("category"),
						characters: metaTagParser("character"),
						fandoms: metaTagParser("fandom"),
						rating: metaTagParser("rating")[0],
						relationships: metaTagParser("relationship"),
					},

					stats: {
						bookmarks: metaStatParser("bookmarks"),
						chapters: metaStatParser("chapters"),
						comments: metaStatParser("comments"),
						hits: metaStatParser("hits"),
						kudos: metaStatParser("kudos"),
						maxChapters: metaStatParser("maxChapters"),
						published: metaStatParser("published"),
						updated: metaStatParser("status"),
						words: metaStatParser("words"),
					},
				},
				chapterslist: (() => {
					// if (chapterId) {
					// for a single chapter view
					const chapters = htmlParser.DomUtils.findAll(
						(elem) =>
							elem.name == "option" &&
							elem.attribs["value"].length > 0,
						dom.children
					)
					return chapters.map((v) => {
						return {
							id: parseInt(v.attribs["value"]),
							// @ts-expect-error
							title: (v.children[0].data as string).replace(
								/^\d*\. /,
								""
							),
						}
					})
					// } else {
					// 	// for a full work view
					// 	const chapters = htmlParser.DomUtils.findAll((elem) => elem.name == "div" && elem.attribs[ "class" ] == "chapter", dom.children)
					// 	const parsedChapters = chapters.map((v) => {
					// 		const chapterTitleSection = htmlParser.DomUtils.findAll((elem) => elem.attribs[ "class" ] == "chapter preface group", v.children)[ 0 ]
					// 		// htmlParser.DomUtils.findAll((elem) => elem.attribs[])
					// 		return {
					// 			title: htmlParser.DomUtils.textContent(chapterTitleSection.children[ 1 ])
					// 				.replace(/\r?\n|\r/g, "")
					// 				.replace(/^Chapter \d*: /, ""),
					// 			// @ts-expect-error
					// 			id: parseInt(chapterTitleSection.children[ 1 ].children[ 1 ].attribs[ "href" ].replace(/.*\//, ""))
					// 		}
					// 	})
					// 	return parsedChapters
					// }
				})(),
				chapters: (() => {
					// console.log("chapters")
					// if (chapterId) {
					const chapter = htmlParser.DomUtils.findAll(
						(elem) =>
							elem.name == "div" &&
							elem.attribs["class"] == "chapter",
						dom.children
					)[0]
					const [
						chapterTitleSection,
						chapterContent,
						chapaterEndSection,
					] = [
						chapter.children[1],
						chapter.children[3],
						chapter.children[5],
					]
					return [
						{
							chapter: parseInt(
								htmlParser.DomUtils.findOne(
									(elem) =>
										elem.name == "div" &&
										elem.attribs["class"] == "chapter",
									dom.children
								)?.attribs["id"].replace(/chapter-/, "") ?? "-1"
							),
							id: workId,
							title: htmlParser.DomUtils.textContent(
								// @ts-expect-error
								chapterTitleSection.children[1]
							)
								.replace(/\r?\n|\r/g, "")
								.replace(/^Chapter \d*: /, ""),
							summary:
								// @ts-expect-error
								chapterTitleSection.children[3]?.children[3]
									?.children[1]?.children[0].data ?? "",
							// @ts-expect-error
							startNotes: chapterTitleSection.children[5]
								?.children[3]
								? htmlParser.DomUtils.textContent(
										// @ts-expect-error
										chapterTitleSection.children[5]
											?.children[3]
								  ).replace(/\r?\n|\r/g, "")
								: "",
							// @ts-expect-error
							endNotes: chapaterEndSection?.children[1]
								?.children[3]
								? htmlParser.DomUtils.textContent(
										// @ts-expect-error
										chapaterEndSection?.children[1]
											?.children[3]
								  ).replace(/\r?\n|\r/g, "")
								: "",
							// @ts-expect-error
							content: chapterContent.children
								.slice(3, -1)
								// @ts-expect-error
								.map((v) =>
									textContent(v.children).replace(
										/(\r\n|\n|\r)/gm,
										""
									)
								),
							// content: chapterContent.children
							// 	.slice(3, -1)
							// 	// @ts-expect-error
							// 	.map((v) => textContent(nCleaner(v.children)).replace(/^\d*\. /, ""))
						},
					]
					// } else {
					// 	const chapters = htmlParser.DomUtils.findAll((elem) => elem.name == "div" && elem.attribs[ "class" ] == "chapter", dom.children)
					// 	return chapters.map((v) => {
					// 		const [ chapterTitleSection, chapterContent, chapaterEndSection ] = [ v.children[ 1 ], v.children[ 3 ], v.children[ 5 ] ]
					// 		return {
					// 			// @ts-expect-error
					// 			id: parseInt(chapterTitleSection.children[ 1 ].children[ 1 ].attribs[ "href" ].replace(/.*\//, "")),
					// 			chapter: parseInt(v.attribs[ "id" ].replace(/chapter-/, "")),
					// 			// @ts-expect-error
					// 			title: htmlParser.DomUtils.textContent(chapterTitleSection.children[ 1 ])
					// 				.replace(/\r?\n|\r/g, "")
					// 				.replace(/^Chapter \d*: /, ""),
					// 			// @ts-expect-error
					// 			summary: chapterTitleSection.children[ 3 ]?.children[ 3 ]?.children[ 1 ]?.children[ 0 ].data ?? "",
					// 			// @ts-expect-error
					// 			startNotes: chapterTitleSection.children[ 5 ]?.children[ 3 ] ? htmlParser.DomUtils.textContent(chapterTitleSection.children[ 5 ]?.children[ 3 ]).replace(/\r?\n|\r/g, "") : "",
					// 			// @ts-expect-error
					// 			endNotes: chapaterEndSection?.children[ 1 ]?.children[ 3 ] ? htmlParser.DomUtils.textContent(chapaterEndSection?.children[ 1 ]?.children[ 3 ]).replace(/\r?\n|\r/g, "") : "",
					// 			// @ts-expect-error
					// 			content: chapterContent.children
					// 				.slice(3, -1)
					// 				// @ts-expect-error
					// 				.map((v) => v.children[ 0 ].data)
					// 		}
					// 	})
					// }
				})(),
			}

			// console.log("parWork", work)
			resolve(work)
		} catch (r) {
			reject(r)
		}
	})

	// console.log(work)
	return asyncParsing
}

export async function workScraperNew(
	workId: number,
	chapterId: number | "first"
): Promise<AO3Work> {
	// return new Promise<AO3Work>(async (resolve, reject) => {
	const fetchedHtml = await (async () => {
		let tryCounter = 0
		let htmlData = null
		while (htmlData === null) {
			const data = await fetch(
				workUrl(
					workId,
					typeof chapterId == "number"
						? chapterId.toString()
						: chapterId
				)
			)
			// if (data.status === 429)
			if (data.ok) {
				return data
			}
			tryCounter++

			if (tryCounter >= 3)
				throw new Error("Could not reach ao3; too many attempts")

			await delay(5000)
		}

		return htmlData
	})()

	const htmlText = await fetchedHtml.text()
	const prunedHtmlStr = htmlPruner(htmlText)

	const dom = parseDocument(prunedHtmlStr)

	const metaContainer = findOneBy("class", "work meta group", dom.children)
	const chapterContainer =
		findOneBy(
			"id",
			"chapters",
			dom.children,
			(elem) => elem.attribs["role"] != "article"
		) ?? findOneBy("id", "workskin", dom.children)
	const titleContainer = findOneBy("class", "preface group", dom.children)

	// console.log("htmlText", htmlText)
	// console.log("htmlPruned", prunedHtmlStr)

	if (!chapterContainer) throw new Error(WorkScraperError.noChapter)

	if (!metaContainer) throw new Error(WorkScraperError.noMeta)

	if (!titleContainer) throw new Error(WorkScraperError.noTitle)
	// reject()
	// })

	// findOne((elem) => elem.attribs[])

	// console.log("chapterContainer", chapterContainer)
	// console.log("authors", chapterContainer.children)
	// throw new Error("still in development")

	const metaValueElemTest: Parameters<typeof findOneBy>[3] = (elem) =>
		elem.name == "dd"

	const work: AO3Work = {
		meta: {
			id: workId,
			authors: findAllBy("rel", "author", titleContainer.children).map(
				(v) => textContent(v)
			),
			language: cleanTextContent(
				findOneBy(
					"class",
					"language",
					metaContainer.children,
					metaValueElemTest
				)
			),
			title: cleanTextContent(
				findOneBy("class", "title heading", titleContainer.children)
			),
			summary: cleanTextContent(
				findOneBy("class", "userstuff", titleContainer.children)
			),
			stats: {
				bookmarks: parseComaDecToInt(
					cleanTextContent(
						findOneBy(
							"class",
							"bookmarks",
							metaContainer.children,
							metaValueElemTest
						) ?? "0"
					)
				),
				comments: parseComaDecToInt(
					cleanTextContent(
						findOneBy(
							"class",
							"comments",
							metaContainer.children,
							metaValueElemTest
						) ?? "0"
					)
				),
				hits: parseComaDecToInt(
					cleanTextContent(
						findOneBy(
							"class",
							"hits",
							metaContainer.children,
							metaValueElemTest
						) ?? "0"
					)
				),
				kudos: parseComaDecToInt(
					cleanTextContent(
						findOneBy(
							"class",
							"kudos",
							metaContainer.children,
							metaValueElemTest
						) ?? "0"
					)
				),
				words: parseComaDecToInt(
					cleanTextContent(
						findOneBy(
							"class",
							"words",
							metaContainer.children,
							metaValueElemTest
						) ?? "0"
					)
				),
				chapters: parseComaDecToInt(
					cleanTextContent(
						findOneBy(
							"class",
							"chapters",
							metaContainer.children,
							metaValueElemTest
						) ?? "0"
					).split("/")[0]
				),
				maxChapters: (() => {
					const value = cleanTextContent(
						findOneBy(
							"class",
							"chapters",
							metaContainer.children,
							metaValueElemTest
						) ?? "0/?"
					).split("/")[1]
					if (value == "?") return null

					return parseComaDecToInt(value)
				})(),
				published: cleanTextContent(
					findOneBy(
						"class",
						"published",
						metaContainer.children,
						metaValueElemTest
					) ?? ""
				),
				updated: cleanTextContent(
					findOneBy(
						"class",
						"status",
						metaContainer.children,
						metaValueElemTest
					) ?? ""
				),
			},
			tags: {
				//TODO fill in tags scraping
				additionalTags: [],
				archiveWarnings: [],
				categories: [],
				characters: [],
				fandoms: [],
				rating: "",
				relationships: [],
			},
		},
		chapterslist: (() => {
			const chapterSelectContainer = findOneBy(
				"name",
				"selected_id",
				dom.children
			)

			if (chapterSelectContainer) {
				return findAll(
					(elem) => elem.name == "option",
					chapterSelectContainer.children
				).map((v) => ({
					id: parseInt(v.attribs["value"]),
					title: cleanTextContent(v).replace(/^\d*\. /, ""),
				}))
			}

			return []
		})(),
		chapters: [
			{
				id: (() => {
					if (chapterId != "first") return chapterId

					const selectedChapterElem = findOneBy(
						"selected",
						"selected",
						dom.children
					)
					if (selectedChapterElem)
						return parseInt(selectedChapterElem.attribs["value"])

					return -1
				})(),
				chapter: (() => {
					const chapterElem = findOneBy(
						"class",
						"chapter",
						chapterContainer.children
					)

					if (chapterElem)
						return parseInt(
							chapterElem.attribs["id"].replace("chapter-", "")
						)

					return 0
				})(),
				summary: cleanTextContent(
					findOneBy("class", "userstuff", titleContainer.children)
				).replace(/^Summary:/, ""),
				title: cleanTextContent(
					findOneBy("class", "title", chapterContainer.children)
				).replace(/^Chapter \d*(: )?/, ""),
				startNotes: cleanTextContent(
					findOneBy(
						"class",
						"notes module",
						chapterContainer.children
					)
				).replace(/^Notes:/, ""),
				endNotes: cleanTextContent(
					findOneBy(
						"class",
						"end notes module",
						chapterContainer.children
					)
				).replace(/^Notes:/, ""),
				content: (() => {
					// TODO add support for <br>
					// TODO add support of italic and bold text
					const articleContainer = findOneBy(
						"role",
						"article",
						chapterContainer.children
					)

					if (!articleContainer)
						throw new Error(WorkScraperError.noArticle)

					// multi-chapter works have userstuff and article div the same
					if (
						(articleContainer?.attribs["class"] ?? "").includes(
							"userstuff"
						)
					) {
						const content = nCleaner(
							articleContainer.children
						) as Element[]
						if (content.length > 1) content.shift()

						return content.map((v) => cleanTextContent(v))
					}

					// single-chapter works for some reason have them separate
					const userStuffContainer = findOneBy(
						"class",
						"userstuff",
						articleContainer.children
					)

					if (!userStuffContainer)
						throw new Error(WorkScraperError.noArticle)

					const content = nCleaner(
						userStuffContainer.children
					) as Element[]

					return content.map((v) => cleanTextContent(v))
				})(),
			},
		],
	}

	return work

	// console.log("work", work)
	// })
}
