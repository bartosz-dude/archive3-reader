import { AO3Work } from "../services/ao3/types/work"
import { AO3WorkSearchQuery } from "../services/ao3/types/workSearch"

export type SQLValue = string | number | boolean | null
export interface SQLReadthrough {
	id: number
	work_id: number
	readthrough: number
	current_chapter: number
	current_chapter_position: number
	latest_update_date: string
	dated_progress: string
	read_chapters: string
}

export interface DBReadthrough {
	workId: number
	readthrough: number
	currentChapter: number
	currentChapterPosition: number
	latestUpdateDate: Date
	datedProgress: {
		chapter: number
		startProgress: number
		startDate: Date
		endProgress: number
		endDate: Date
	}[]
	readChapters: number[]
}

export interface SQLSavedWork {
	work_id: number
	title: string
	summary: string
	language: string
	authors: string
	tags: string
	stats: string
	chapters_list: string
}

export interface DBSavedWork {
	workId: number
	title: string
	summary: string
	language: string
	authors: string[]
	tags: AO3Work["meta"]["tags"]
	stats: AO3Work["meta"]["stats"]
	chaptersList: AO3Work["chapterslist"]
}

export interface SQLWork {
	work_id: number
	total_chapters: number | null
	available_chapters: number
	last_update: string
	is_saved: 0 | 1
	is_offline: 0 | 1
	has_new_chapters: 0 | 1 | null
	new_chapters: string | null
}

export interface DBWork {
	workId: number
	totalChapters: number | null
	availableChapters: number
	lastUpdate: Date
	isSaved: boolean
	isOffline: boolean
	hasNewChapters: boolean | null
	newChapters: number[] | null
}

export interface SQLSearchQuery {
	hash: string
	query_json: string
}

export interface DBSearchQuery {
	hash: string
	queryJson: AO3WorkSearchQuery
}
