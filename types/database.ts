export interface SQLReadthrough {

}

export interface SQLWork {
	work_id: number,
	total_chapters: number | null,
	available_chapters: number,
	last_update: string,
	is_saved: 0 | 1,
	is_offline: 0 | 1
}

export interface DBReadthrough {
	workId: number,
	readthrough: number,
	currentChapter: number,
	currentChapterPosition: number,
	datedProgress: {
		chapter: number,
		startProgress: number,
		startDate: Date,
		endProgress: number,
		endDate: Date
	}[],
	readChapters: number[]
}

export interface DBWork {
	workId: number,
	totalChapters: number | null,
	availableChapters: number,
	lastUpdate: Date,
	isSaved: boolean,
	isOffline: boolean
}