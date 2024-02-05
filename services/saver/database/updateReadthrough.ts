import * as SQLite from "expo-sqlite"
import { DBReadthrough } from "../../../types/database"
import updateSQLQuery from "./updateSQLQuery"
interface DBReadthroughA {
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

export default async function updateReadthrough(data: DBReadthrough) {
	const db = SQLite.openDatabase('archive3storage.db')

	await db.transactionAsync(async tx => {
		const work = await tx.executeSqlAsync(`SELECT work_id, readthrough from 'readthroughs' WHERE work_id = ? AND readthrough = ?`, [ data.workId, data.readthrough ])
		console.log("found entries", work)
		if (work.rows.length > 0) {
			// @ts-ignore
			await tx.executeSqlAsync(updateSQLQuery("readthroughs", [
				[ "current_chapter", data.currentChapter ],
				[ "current_chapter_position", data.currentChapterPosition ],
				[ "read_chapters", JSON.stringify(data.readChapters) ],
				[ "dated_progress", JSON.stringify(data.datedProgress) ]
			], [
				[ "work_id", data.workId ],
				[ "readthrough", data.readthrough ]
			]))
			return
		}


		// @ts-ignore
		await tx.executeSqlAsync(`INSERT INTO 'readthroughs' VALUES (?, ?, ?, ?, ?, ?, ?)`, [ null, data.workId, data.readthrough, data.currentChapter, data.currentChapterPosition, JSON.stringify(data.datedProgress), JSON.stringify(data.readChapters) ])

		return
	})
}