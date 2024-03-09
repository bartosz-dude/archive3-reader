import { DBSavedWork, SQLSavedWork } from "../../../types/database"
import dbOperationAsync from "../api/dbOperationAsync"
import dbTransactionAsync from "../api/dbTrasactionAsync"

export default async function getSavedWork(workId: number) {
	console.log("getSavedWork")
	let savedWorkContent: DBSavedWork | null = null

	const entry = await dbTransactionAsync(async (db) => {
		// try {
		return await db.getFirstAsync<SQLSavedWork>(
			`SELECT * FROM 'saved_works' WHERE work_id = ?`,
			[workId]
		)
		// savedWorkContent = entry ?? null

		// } catch (error) {
		// 	savedWorkContent = null
		// }
	})
	if (entry) {
		savedWorkContent = {
			workId: entry.work_id,
			title: entry.title,
			summary: entry.summary,
			language: entry.language,
			authors: JSON.parse(entry.authors),
			tags: JSON.parse(entry.tags),
			stats: JSON.parse(entry.stats),
			chaptersList: JSON.parse(entry.chapters_list),
		} as DBSavedWork
	}

	return savedWorkContent as unknown as DBSavedWork | null
}
