import type {
	CategoryAO3,
	CompletionStatusAO3,
	LanguagesAO3,
	RatingAO3,
	WarningAO3,
} from "./generic"

export interface WorkAO3 {
	workId: number
	chapterId?: number
	chapters?: {
		id: number
		title?: string
	}[]
	meta: {
		fandoms?: string[]
		rating?: RatingAO3
		warning?: WarningAO3[]
		category?: CategoryAO3[]
		tags: {
			warnings?: string[]
			characters?: string[]
			relationships?: string[]
			freeforms?: string[]
		}
		series?: {
			part: number
			title: string
			id: number
			previousWorkId?: number
			nextWorkId?: number
		}[]
		completionStatus: CompletionStatusAO3
		language: LanguagesAO3
		stats: {
			datePublished: Date
			dateUpdated?: Date
			words: number
			chapters: {
				current: number
				total?: number
			}
			comments?: number
			kudos?: number
			bookmarks?: number
			hits?: number
		}
	}
	author: {
		user: string
		pseudo: string
	}[]
	summary?: string // html string
	title: string
	// TODO add associations, example https://archiveofourown.org/works/50433769/chapters/127429228
	topNotes?: string // html string
	bottomNotes?: string // html string
	content: string // html string
}
