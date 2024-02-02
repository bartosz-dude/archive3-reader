import * as SQLite from "expo-sqlite"
import { DBReadthrough } from "../../../types/database"
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
		if (work.rows.length > 0) {
			// @ts-ignore
			await tx.executeSqlAsync(`UPDATE 'readthroughs' SET current_chapter = ?, current_chapter_position = ?, dated_progress = ?, read_chapters = ?`, [ data.currentChapter, data.currentChapterPosition, JSON.stringify(data.datedProgress), JSON.stringify(data.readChapters) ])
			// const works = await tx.executeSqlAsync(`SELECT * FROM 'works'`)
			// console.log("updateWork existing", works.rows)
			return
		}

		// console.log("json", JSON.stringify(data.datedProgress), JSON.stringify(data.readChapters))

		// @ts-ignore
		await tx.executeSqlAsync(`INSERT INTO 'readthroughs' VALUES (?, ?, ?, ?, ?, ?, ?)`, [ null, data.workId, data.readthrough, data.currentChapter, data.currentChapterPosition, JSON.stringify(data.datedProgress), JSON.stringify(data.readChapters) ])

		// const works = await tx.executeSqlAsync(`SELECT * FROM 'works'`)
		// console.log("updateWork", works.rows)
		return
	})
}