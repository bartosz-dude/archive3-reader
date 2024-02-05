import * as SQLite from "expo-sqlite"
import { DBSavedWork } from "../../../types/database"
import updateSQLQuery from "./updateSQLQuery"

export default async function updateSavedWork(data: DBSavedWork) {
	const db = SQLite.openDatabase('archive3storage.db')

	await db.transactionAsync(async tx => {
		const work = await tx.executeSqlAsync(`SELECT work_id from 'saved_works' WHERE work_id = ?`, [ data.workId ])
		if (work.rows.length > 0) {
			await tx.executeSqlAsync(updateSQLQuery("saved_works", [
				[ "title", data.title ],
				[ "summary", data.summary ],
				[ "language", data.language ],
				[ "authors", JSON.stringify(data.authors) ],
				[ "tags", JSON.stringify(data.tags) ],
				[ "stats", JSON.stringify(data.stats) ],
				[ "chapters_list", JSON.stringify(data.chaptersList) ]
			], [ [ "work_id", data.workId ] ]))
			return
		}

		await tx.executeSqlAsync(`INSERT INTO 'saved_works' VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			// @ts-ignore
			[ data.workId, data.title, data.summary, data.language, JSON.stringify(data.authors), JSON.stringify(data.tags), JSON.stringify(data.stats), JSON.stringify(data.chaptersList) ])
		return
	})
}