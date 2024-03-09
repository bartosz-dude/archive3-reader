import * as SQLite from "expo-sqlite"
import { DBReadthrough, SQLReadthrough } from "../../../types/database"
import updateSQLQuery from "./updateSQLQuery"
import dbOperationAsync from "../api/dbOperationAsync"
import dbTransactionAsync from "../api/dbTrasactionAsync"

type DBReadthroughUpdate = Omit<
	Partial<DBReadthrough> & Pick<DBReadthrough, "workId" | "readthrough">,
	"latestUpdateDate"
>

export default async function updateReadthrough(data: DBReadthroughUpdate) {
	console.log("updateReadthrough")
	return await dbTransactionAsync(async (db) => {
		const work = await db.getAllAsync<SQLReadthrough>(
			`SELECT work_id, readthrough from 'readthroughs' WHERE work_id = ? AND readthrough = ?`,
			[data.workId, data.readthrough]
		)
		if (work.length > 0) {
			await db.runAsync(
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
						["latest_update_date", JSON.stringify(new Date())],
					],
					[
						["work_id", data.workId],
						["readthrough", data.readthrough],
					]
				)
			)
			return
		}

		await db.runAsync(
			`INSERT INTO 'readthroughs' VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				null,
				data.workId,
				data.readthrough,
				data.currentChapter ?? null,
				data.currentChapterPosition ?? null,
				JSON.stringify(data.readChapters),
				JSON.stringify(data.datedProgress),
				JSON.stringify(new Date()),
			]
		)
	})
}
