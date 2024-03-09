import { DBWork, SQLWork } from "../../../types/database"
import dbOperationAsync from "../api/dbOperationAsync"
import dbTransactionAsync from "../api/dbTrasactionAsync"

export default async function getAllWorks(saved = true) {
	console.log("getAllWorks")
	return await dbTransactionAsync(async (db) => {
		let worksContent: DBWork[] = []

		try {
			const entries = await db.getAllAsync<SQLWork>(
				`SELECT * FROM 'works' WHERE is_saved = ?`,
				[saved ? 1 : 0]
			)
			const worksContentFetched = entries ?? null
			if (worksContentFetched) {
				// console.log("workContent", worksContent)
				worksContent = worksContentFetched.map((v) => ({
					availableChapters: v.available_chapters,
					isOffline: v.is_offline == 1,
					isSaved: v.is_saved == 1,
					lastUpdate: new Date(v.last_update),
					totalChapters: v.total_chapters,
					workId: v.work_id,
				})) as DBWork[]
			}
		} catch (error) {
			// console.error(error)
			// worksContent =[]
		}

		return worksContent
	})
}
