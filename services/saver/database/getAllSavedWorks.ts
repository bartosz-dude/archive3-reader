import * as SQLite from "expo-sqlite"
import { DBSavedWork, SQLSavedWork } from "../../../types/database"

export default async function getAllSavedWork() {
	const db = SQLite.openDatabase("archive3storage.db")

	let savedWorkContent: DBSavedWork[] = []

	await db.transactionAsync(async (tx) => {
		try {
			const entry = await tx.executeSqlAsync(
				`SELECT * FROM 'saved_works'`,
				[]
			)
			const savedWorkContentFetched =
				(entry.rows as SQLSavedWork[]) ?? null

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
			// savedWorkContent = []
		}
	})

	console.log("savedWorks", savedWorkContent)

	return savedWorkContent
}
