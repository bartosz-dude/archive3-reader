import * as SQLite from "expo-sqlite"
import { DBWork, SQLValue } from "../../../types/database"
import updateSQLQuery from "./updateSQLQuery"

type DBWorkUpdate = Partial<DBWork> & Pick<DBWork, "workId">

export default async function updateWork(data: DBWorkUpdate) {
	const db = SQLite.openDatabase('archive3storage.db')

	await db.transactionAsync(async tx => {
		// @ts-ignore
		const work = await tx.executeSqlAsync(`SELECT work_id from 'works' WHERE work_id = ?`, [ parseInt(data.workId) ])

		if (work.rows.length > 0) {
			await tx.executeSqlAsync(updateSQLQuery("works", [
				[ "total_chapters", data.totalChapters ],
				[ "data_available_chapters", data.availableChapters ],
				[ "last_update", data.lastUpdate ],
				[ "is_saved", data.isSaved ],
				[ "is_offline", data.isOffline ]
			], [ [ "work_id", data.workId ] ]))
			return
		}

		try {

			await tx.executeSqlAsync(`INSERT INTO 'works' VALUES (?, ?, ?, ?, ?, ?)`,
				// @ts-ignore
				[ parseInt(data.workId), data.totalChapters, data.availableChapters, data.lastUpdate.toUTCString(), data.isSaved, data.isOffline ])
		} catch (error) {
			// @ts-ignore
			const work2 = await tx.executeSqlAsync(`SELECT work_id from 'works' WHERE work_id = ?`, [ parseInt(data.workId) ])
			console.error(error, work2)
		}

		return
	})
}