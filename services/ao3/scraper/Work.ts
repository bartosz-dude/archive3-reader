// import parse from "node-html-parser"
import * as htmlParser from "htmlparser2";
import { testHtml2 } from "../../../assets/testHtml2";
import { AO3Work, MetaNumberStat, MetaTag, MetaTextStat } from "../types/work";
import { testHtml3 } from "../../../assets/testHtml3";
import { textContent } from "domutils";
import nCleaner from "../tools/nCleaner";

export async function fetchWork(id: string, chapterId: string) {
	// const content = await fetch(`https://archiveofourown.org/works/${id}/chapters/${chapterId}`)
	// const content = await fetch("services/__tests__/test_work.html")
	// const content = testHtml
	// const htmlStr = (await content).split("</head>")[ 1 ].split("<script")[ 0 ]

	// const dom = htmlparser2.parseDocument(htmlStr)

	// htmlparser2.DomUtils.findAll((elem) => {
	// 	if (elem.name == "a" && elem.attribs[ "class" ] == "tag") {
	// 		// console.log(elem)
	// 		elem.children.forEach((v) => {
	// 			if (v.type == "text") {
	// 				console.log(v.data)
	// 			}
	// 		})
	// 		return true
	// 	}
	// 	return false
	// }, dom.children)

	// const a = workScrapper(123)

	// console.log(a.chapters)
	// console.log(a)
	// return a.chapters[ 56 ].content
	// return [ "a", "a" ]
}

// export function workScrapper(workId: number, chapter?: number): Promise<AO3Work>
// export function workScrapper(workId: number, chapterId?: string): Promise<AO3Work>
export function workScrapper(workId: number, chapterId: string): Promise<AO3Work> {
	const asyncParsing = new Promise<AO3Work>(async (resolve, reject) => {
		try {
			// console.log("link", `https://archiveofourown.org/works/${workId}/chapters/${chapterId}?view_adult=true`)

			const htmlStr = !(chapterId == "first") ?
				await fetch(`https://archiveofourown.org/works/${workId}/chapters/${chapterId}?view_adult=true`)
				:
				await fetch(`https://archiveofourown.org/works/${workId}?view_adult=true`)

			const htmlText = await htmlStr.text()
			// const htmlText = testHtml3
			// resolve(htmlText)
			// return

			// console.log("text", htmlText)
			// if (!htmlParser)
			// 	reject("")
			// const htmlStr = testHtml3
			const prunedHtmlStr = htmlText.split("</head>")[ 1 ].split("<script")[ 0 ]

			// console.log("prune", prunedHtmlStr)

			const dom = htmlParser.parseDocument(prunedHtmlStr)

			function metaTagParser(type: MetaTag): string[] {
				const tags: string[] = []

				htmlParser.DomUtils.findAll((elem) => {
					// gets the parent containing the tags then the tags, because you can't get attribs on a elem.parent
					if (elem.attribs[ "class" ] == `${type} tags` &&
						elem.name == "dd") {
						htmlParser.DomUtils.findAll((elem) => {

							if (elem.attribs[ "class" ] == "tag") {
								const tag = elem.children[ 0 ]

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
			function metaStatParser(type: MetaNumberStat | MetaTextStat): number | string | null {
				let stat: any

				htmlParser.DomUtils.findAll((elem) => {
					if (elem.attribs[ "class" ] == `${type == "maxChapters" ? "chapters" : type}` &&
						elem.name == "dd") {
						const text = elem.children[ 0 ]

						if (type == "bookmarks") {
							const bookmarkText = htmlParser.DomUtils.getChildren(text)[ 0 ]
							if (bookmarkText.type == "text") {
								stat = parseInt(bookmarkText.data.replace(",", ""))
							}
						}

						if (text.type == "text")
							switch (type) {
								case "maxChapters":
								case "chapters": {
									stat = text.data
										.split("/")
										.map((v) => parseInt(v.replace(",", "")))
									[ type == "chapters" ? 0 : 1 ]
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

				if (typeof stat != "string" && isNaN(stat))
					return null

				if (!stat) {
					return null
				}

				return stat
			}

			function otherParser(elemName: string, classStr: string) {
				return (htmlParser.DomUtils
					.findAll((elem) => elem.name == elemName && elem.attribs[ "class" ] == classStr, dom.children)
					.map((v) => v.children[ 0 ].type == "text" && v.children[ 0 ].data)
					.filter((v) => typeof v == "string") as string[])
					.map((v) => v.replace(/\r?\n|\r/g, ""))
			}

			const work: AO3Work = {
				meta: {
					id: workId,

					language: otherParser("dd", "language")[ 0 ],
					title: otherParser("h2", "title heading")[ 0 ],

					authors: htmlParser.DomUtils
						.findAll((elem) => elem.attribs[ "rel" ] == "author", dom.children)
						.map((v) => v.children[ 0 ].type == "text" && v.children[ 0 ].data)
						.filter((v) => typeof v == "string") as string[],

					summary: (() => {
						const blockquote = htmlParser.DomUtils
							.findOne((elem) => elem.name == "blockquote" && elem.attribs[ "class" ] == "userstuff", dom.children)

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
						rating: metaTagParser("rating")[ 0 ],
						relationships: metaTagParser("relationship")
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
						words: metaStatParser("words")
					}
				},
				chapterslist: (() => {
					// if (chapterId) {
					// for a single chapter view
					const chapters = htmlParser.DomUtils.findAll((elem) => elem.name == "option" && elem.attribs[ "value" ].length > 0, dom.children)
					return chapters.map((v) => {
						return {
							id: parseInt(v.attribs[ "value" ]),
							// @ts-expect-error
							title: (v.children[ 0 ].data as string).replace(/^\d*\. /, "")
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
					const chapter = htmlParser.DomUtils.findAll((elem) => elem.name == "div" && elem.attribs[ "class" ] == "chapter", dom.children)[ 0 ]
					const [ chapterTitleSection, chapterContent, chapaterEndSection ] = [ chapter.children[ 1 ], chapter.children[ 3 ], chapter.children[ 5 ] ]
					return [ {
						chapter: parseInt(htmlParser.DomUtils
							.findOne((elem) => elem.name == "div" && elem.attribs[ "class" ] == "chapter", dom.children)
							?.attribs[ "id" ]
							.replace(/chapter-/, "") ?? "-1"),
						id: workId,
						// @ts-expect-error
						title: htmlParser.DomUtils.textContent(chapterTitleSection.children[ 1 ])
							.replace(/\r?\n|\r/g, "")
							.replace(/^Chapter \d*: /, ""),
						// @ts-expect-error
						summary: chapterTitleSection.children[ 3 ]?.children[ 3 ]?.children[ 1 ]?.children[ 0 ].data ?? "",
						// @ts-expect-error
						startNotes: chapterTitleSection.children[ 5 ]?.children[ 3 ] ? htmlParser.DomUtils.textContent(chapterTitleSection.children[ 5 ]?.children[ 3 ]).replace(/\r?\n|\r/g, "") : "",
						// @ts-expect-error
						endNotes: chapaterEndSection?.children[ 1 ]?.children[ 3 ] ? htmlParser.DomUtils.textContent(chapaterEndSection?.children[ 1 ]?.children[ 3 ]).replace(/\r?\n|\r/g, "") : "",
						// @ts-expect-error
						content: chapterContent.children
							.slice(3, -1)
							// @ts-expect-error
							.map((v) => textContent(v.children).replace(/(\r\n|\n|\r)/gm, ""))
						// content: chapterContent.children
						// 	.slice(3, -1)
						// 	// @ts-expect-error
						// 	.map((v) => textContent(nCleaner(v.children)).replace(/^\d*\. /, ""))
					} ]
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
				})()
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