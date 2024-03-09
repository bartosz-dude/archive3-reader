import { DBSavedWork, SQLSavedWork } from "../../../types/database"
import dbOperationAsync from "../api/dbOperationAsync"
import dbTransactionAsync from "../api/dbTrasactionAsync"

export default async function getAllSavedWork() {
	console.log("getAllSaved")
	return await dbTransactionAsync(async (db) => {
		let savedWorkContent: DBSavedWork[] = []

		console.log("a")
		try {
			const entries = await db.getAllAsync<SQLSavedWork>(
				`SELECT * FROM 'saved_works'`
			)
			const savedWorkContentFetched = entries ?? null

			if (savedWorkContentFetched) {
				savedWorkContent = savedWorkContentFetched.map((v) => ({
					workId: v.work_id,
					title: v.title,
					summary: v.summary,
					language: v.language,
					authors: JSON.parse(v.authors),
					tags: JSON.parse(v.tags),
					stats: JSON.parse(v.stats),
					chaptersList: JSON.parse(v.chapters_list),
				})) as DBSavedWork[]
			}
		} catch (error) {
			console.error(error)
			// savedWorkContent = []
		}
		// } catch (error) {
		// 	console.error(error)
		// }

		console.log("getAllSaved complete", savedWorkContent)

		return savedWorkContent
	})
}
