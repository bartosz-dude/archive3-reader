import { DBReadthrough, SQLReadthrough } from "../../../types/database"
import dbOperationAsync from "../api/dbOperationAsync"
import dbTransactionAsync from "../api/dbTrasactionAsync"

export default async function getReadthrough(
	workId: number,
	readthrough: number
) {
	console.log("getReadthrough")
	let readthroughContent: DBReadthrough | null = null

	const entry = await dbTransactionAsync(async (db) => {
		// await db.withExclusiveTransactionAsync(async () => {
		console.log("1")
		return await db.getFirstAsync<SQLReadthrough>(
			`SELECT * FROM 'readthroughs' WHERE work_id = ? AND readthrough = ?`,
			[workId, readthrough]
		)
		console.log("2", entry)
		// readthroughContent = entry ?? null
	})

	if (entry) {
		readthroughContent = {
			currentChapter: entry.current_chapter,
			currentChapterPosition: entry.current_chapter_position,
			latestUpdateDate: new Date(entry.latest_update_date),
			datedProgress: (() => {
				const progress = JSON.parse(
					entry.dated_progress
				) as DBReadthrough["datedProgress"]
				return progress.map((v) => {
					const datesParser = v
					datesParser.startDate = new Date(v.startDate)
					datesParser.endDate = new Date(v.endDate)
					return datesParser
				})
			})(),
			readChapters: JSON.parse(entry.read_chapters),
			readthrough: entry.readthrough,
			workId: entry.work_id,
		}
	}
	// })

	return readthroughContent as unknown as DBReadthrough | null
}
