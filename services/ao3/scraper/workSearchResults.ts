import { searchTestHtml } from "../../../assets/searchTest";
import htmlPruner from "../tools/htmlPruner";
import { parseDocument, DomUtils } from "htmlparser2";
import nCleaner from "../tools/nCleaner";
import { AO3WorkResult, AO3WorkSearchResults } from "../types/workSearchResults";
import { Element } from "domhandler"
import { findAll, findOne, textContent } from "domutils";
import { MetaTag } from "../types/work";

export default function workSearchResultsScraper(queryUrl: URL) {
	return new Promise<AO3WorkSearchResults>(async (resolve, reject) => {
		const fetchedHtml = await (await fetch(queryUrl)).text()
		const prunedHtmlStr = htmlPruner(fetchedHtml)

		const dom = parseDocument(prunedHtmlStr)

		const resultsContainer = DomUtils.findOne((elem) => elem.attribs[ "class" ] == "work index group", dom.children)

		if (resultsContainer) {
			const resultsElem = DomUtils.findAll((elem) => elem.attribs[ "role" ] == "article", resultsContainer?.children)

			const results = resultsElem.map((v, i) => {
				const content = nCleaner(v.children) as Element[]

				const headerElem = content[ 0 ]
				const summaryElem = findOne((elem) => elem.attribs[ "class" ] == "userstuff summary", content)
				const statsElem = findOne((elem) => elem.attribs[ "class" ] == "stats", content)
				const tagsElem = content[ 2 ]

				if (!statsElem) {
					return null
				}

				const headingChildren = nCleaner((nCleaner(headerElem.children)[ 0 ] as Element).children) as Element[]
				const statsChildren = nCleaner(statsElem.children) as Element[]
				const requiredTagsChildren = nCleaner((nCleaner(headerElem.children)[ 2 ] as Element).children) as Element[]
				const tagsChildren = nCleaner(tagsElem.children) as Element[]
				const fandomsChildren = nCleaner((nCleaner(headerElem.children)[ 1 ] as Element).children)


				type StatsClassNames = "language" | "words" | "chapters" | "collections" | "comments" | "kudos" | "bookmarks" | "hits"

				function findStatData(className: StatsClassNames) {
					const statElem = findOne((elem) => elem.attribs[ "class" ] == className && elem.name == "dd", statsChildren)
					if (!statElem)
						return "0"
					return textContent(statElem)
				}

				function getTags(className: "warnings" | "relationships" | "characters" | "freeforms") {
					const tags = findAll((elem) => elem.attribs[ "class" ] == className, tagsChildren)
					return tags.map((v) => textContent(nCleaner(v.children)))
				}

				try {
					const result: AO3WorkResult = {
						meta: {
							id: parseInt(headingChildren[ 0 ].attribs[ "href" ].replace("/works/", "")),
							title: textContent(headingChildren[ 0 ]),
							authors: headingChildren.filter((v) => v.attribs[ "rel" ] == "author").map((v) => DomUtils.textContent(v)),
							language: textContent(statsChildren[ 1 ]),
							stats: {
								words: parseInt(findStatData("words").replace(",", "")),
								bookmarks: parseInt(findStatData("bookmarks").replace(",", "")),
								comments: parseInt(findStatData("comments").replace(",", "")),
								hits: parseInt(findStatData("hits")),
								kudos: parseInt(findStatData("kudos").replace(",", "")),
								chapters: parseInt(findStatData("chapters").split("/")[ 0 ]),
								maxChapters: findStatData("chapters").split("/")[ 1 ] == "?" ? null : parseInt(findStatData("chapters").split("/")[ 1 ]),
								updated: textContent(nCleaner(headerElem.children)[ 3 ])
							},
							summary: summaryElem ? textContent(nCleaner(summaryElem.children)) : "",
							tags: {
								additionalTags: getTags("freeforms"),
								archiveWarnings: requiredTagsChildren.slice(1, -1).map((v) => textContent(v)),
								categories: [], // TODO need to fill in
								characters: getTags("characters"),
								fandoms: fandomsChildren.slice(1).map((v) => textContent(v)),
								rating: textContent(requiredTagsChildren[ 0 ]),
								relationships: getTags("relationships")
							}
						}
					}
					return result
				} catch {
					return null
				}
			})

			const paginationChildren = findOne((elem) => elem.attribs[ "class" ] == "pagination actions", dom.children)?.children

			// if (!(paginationChildren.length > 0)) {
			// 	reject()
			// 	return
			// }

			// if (!paginationChildren) {
			// 	return
			// }
			// console.log(paginationChildren.at(-3))

			const fundCountElem = findOne((elem) => elem.attribs[ "class" ] == "heading" && elem.name == "h3", dom.children)

			const searchResults: AO3WorkSearchResults = {
				results: results.filter((v) => v ?? false) as AO3WorkResult[],
				currentPage: paginationChildren ? parseInt(textContent(findOne((elem) => elem.attribs[ "class" ] == "current", paginationChildren) as Element)) : 1,
				totalPages: paginationChildren ? parseInt(textContent(paginationChildren.at(-3) as Element)) : 1,
				totalWorks: fundCountElem ? parseInt(textContent(fundCountElem?.children).replace(",", "").replace(" Found ?", "")) : -1
			}
			resolve(searchResults)
		}
		reject("no results list")
	})
}