import * as SQLite from "expo-sqlite"
import { DBReadthrough } from "../../../types/database"
import updateSQLQuery from "./updateSQLQuery"
interface DBReadthroughA {
	workId: number
	readthrough: number
	currentChapter: number
	currentChapterPosition: number
	datedProgress: {
		chapter: number
		startProgress: number
		startDate: Date
		endProgress: number
		endDate: Date
	}[]
	readChapters: number[]
}

type DBReadthroughUpdate = Partial<DBReadthrough> &
	Pick<DBReadthrough, "workId" | "readthrough">

export default async function updateReadthrough(data: DBReadthroughUpdate) {
	const db = SQLite.openDatabase("archive3storage.db")
	console.log("updateRead", data)

	await db.transactionAsync(async (tx) => {
		const work = await tx.executeSqlAsync(
			`SELECT work_id, readthrough from 'readthroughs' WHERE work_id = ? AND readthrough = ?`,
			[data.workId, data.readthrough]
		)
		// console.log("found entries", work)
		if (work.rows.length > 0) {
			await tx.executeSqlAsync(
				updateSQLQuery(
					"readthroughs",
					[
						["current_chapter", data.currentChapter],
						[
							"current_chapter_position",
							data.currentChapterPosition,
						],
						["read_chapters", JSON.stringify(data.readChapters)],
						["dated_progress", JSON.stringify(data.datedProgress)],
					],
					[
						["work_id", data.workId],
						["readthrough", data.readthrough],
					]
				)
			)
			return
		}

		await tx.executeSqlAsync(
			`INSERT INTO 'readthroughs' VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				// @ts-ignore
				null,
				data.workId,
				data.readthrough,
				// @ts-ignore
				data.currentChapter,
				// @ts-ignore
				data.currentChapterPosition,
				JSON.stringify(data.datedProgress),
				JSON.stringify(data.readChapters),
			]
		)

		return
	})
}
