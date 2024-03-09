import * as SQLite from "expo-sqlite"
import { DBSavedWork } from "../../../types/database"
import updateSQLQuery from "./updateSQLQuery"
import dbOperationAsync from "../api/dbOperationAsync"
import dbTransactionAsync from "../api/dbTrasactionAsync"

export default async function updateSavedWork(data: DBSavedWork) {
	console.log("updateSavedWork")
	return await dbTransactionAsync(async (db) => {
		const work = await db.getAllAsync(
			`SELECT work_id from 'saved_works' WHERE work_id = ?`,
			[data.workId]
		)
		if (work.length > 0) {
			await db.runAsync(
				updateSQLQuery(
					"saved_works",
					[
						["title", data.title],
						["summary", data.summary],
						["language", data.language],
						["authors", JSON.stringify(data.authors)],
						["tags", JSON.stringify(data.tags)],
						["stats", JSON.stringify(data.stats)],
						["chapters_list", JSON.stringify(data.chaptersList)],
					],
					[["work_id", data.workId]]
				)
			)
			return
		}

		await db.runAsync(
			`INSERT INTO 'saved_works' VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				data.workId,
				data.title,
				data.summary,
				data.language,
				JSON.stringify(data.authors),
				JSON.stringify(data.tags),
				JSON.stringify(data.stats),
				JSON.stringify(data.chaptersList),
			]
		)
	})
}
