import * as SQLite from "expo-sqlite"
import { DBReadthrough, DBWork, SQLWork } from "../../../types/database"

export default async function getWork(workId: number) {
	const db = SQLite.openDatabase('archive3storage.db')

	let workContent

	await db.transactionAsync(async tx => {
		try {
			const entry = await tx.executeSqlAsync(`SELECT * FROM 'works' WHERE work_id = ?`, [ workId ])
			// console.log("entry", entry)
			workContent = entry.rows[ 0 ] as SQLWork ?? null
			if (workContent) {
				// console.log("workContent", workContent)
				workContent = {
					availableChapters: workContent.available_chapters,
					isOffline: workContent.is_offline == 1,
					isSaved: workContent.is_saved == 1,
					lastUpdate: new Date(workContent.last_update),
					totalChapters: workContent.total_chapters,
					workId: workContent.work_id
				} as DBWork
			}
		} catch (error) {
			console.error(error)
			workContent = null
		}
	})

	return workContent as unknown as (DBWork | null)
}