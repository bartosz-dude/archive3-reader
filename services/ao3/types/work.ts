export type MetaTag = "rating" | "warning" | "category" | "fandom" | "relationship" | "character" | "freeform"

export type MetaNumberStat = "words" | "chapters" | "maxChapters" | "comments" | "kudos" | "bookmarks" | "hits"
export type MetaTextStat = "published" | "status"

export interface AO3Work {
	meta: {
		id: number,
		tags: {
			rating: string,
			archiveWarnings: string[],
			categories: string[],
			fandoms: string[],
			relationships: string[],
			characters: string[],
			additionalTags: string[],
		}
		stats: {
			published: string,
			updated: string,
			words: number,
			chapters: number,
			maxChapters: number | null,
			comments: number,
			kudos: number,
			bookmarks: number,
			hits: number
		}
		language: string,
		authors: string[],
		title: string,
		summary: string
	},
	chapterslist: {
		id: number,
		title: string
	}[]
	chapters: {
		chapter: number,
		id: number,
		title: string,
		summary: string,
		startNotes: string,
		endNotes: string,
		content: string[]
	}[]
}