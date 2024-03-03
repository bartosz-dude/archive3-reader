import * as SQLite from "expo-sqlite"
import { DBSavedWork, SQLSavedWork } from "../../../types/database"

export default async function getSavedWork(workId: number) {
	const db = SQLite.openDatabase("archive3storage.db")

	let savedWorkContent

	await db.transactionAsync(async (tx) => {
		try {
			const entry = await tx.executeSqlAsync(
				`SELECT * FROM 'saved_works' WHERE work_id = ?`,
				[workId]
			)
			savedWorkContent = (entry.rows[0] as SQLSavedWork) ?? null

			if (savedWorkContent) {
				savedWorkContent = {
					workId: savedWorkContent.work_id,
					title: savedWorkContent.title,
					summary: savedWorkContent.summary,
					language: savedWorkContent.language,
					authors: JSON.parse(savedWorkContent.authors),
					tags: JSON.parse(savedWorkContent.tags),
					stats: JSON.parse(savedWorkContent.stats),
					chaptersList: JSON.parse(savedWorkContent.chapters_list),
				} as DBSavedWork
			}
		} catch (error) {
			savedWorkContent = null
		}
	})

	return savedWorkContent as unknown as DBSavedWork | null
}
