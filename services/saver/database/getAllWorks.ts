import * as SQLite from "expo-sqlite"
import { DBReadthrough, DBWork, SQLWork } from "../../../types/database"

export default async function getAllWorks(saved = true) {
	const db = SQLite.openDatabase('archive3storage.db')

	let worksContent

	await db.transactionAsync(async tx => {
		try {
			const entries = await tx.executeSqlAsync(`SELECT * FROM 'works' WHERE is_saved = ?`, [ saved ? 1 : 0 ])
			worksContent = entries.rows as SQLWork[] ?? null
			if (worksContent) {
				// console.log("workContent", worksContent)
				worksContent = worksContent.map((v) => ({
					availableChapters: v.available_chapters,
					isOffline: v.is_offline == 1,
					isSaved: v.is_saved == 1,
					lastUpdate: new Date(v.last_update),
					totalChapters: v.total_chapters,
					workId: v.work_id
				})) as DBWork[]
			}
		} catch (error) {
			console.error(error)
			worksContent = null
		}
	})

	return worksContent as unknown as (DBWork[] | null)
}