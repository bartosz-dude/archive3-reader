import { DBWork, SQLWork } from "../../../types/database"
import dbOperationAsync from "../api/dbOperationAsync"
import dbTransactionAsync from "../api/dbTrasactionAsync"

export default async function getWork(workId: number) {
	console.log("getWork")
	let workContent: DBWork | null = null
	const entry = await dbTransactionAsync(async (db) => {
		// try {
		return await db.getFirstAsync<SQLWork>(
			`SELECT * FROM 'works' WHERE work_id = ?`,
			[workId]
		)
	})

	if (entry) {
		workContent = {
			availableChapters: entry.available_chapters,
			isOffline: entry.is_offline == 1,
			isSaved: entry.is_saved == 1,
			lastUpdate: new Date(entry.last_update),
			totalChapters: entry.total_chapters,
			workId: entry.work_id,
			hasNewChapters: entry.has_new_chapters,
			newChapters: entry.new_chapters,
		} as DBWork
	}

	return workContent as unknown as DBWork | null
}
