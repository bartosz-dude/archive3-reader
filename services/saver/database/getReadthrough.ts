import * as SQLite from "expo-sqlite"
import { DBReadthrough, SQLReadthrough } from "../../../types/database"

export default async function getReadthrough(workId: number, readthrough: number) {
	const db = SQLite.openDatabase('archive3storage.db')

	let readthroughContent

	await db.transactionAsync(async tx => {
		try {
			const entry = await tx.executeSqlAsync(`SELECT * FROM 'readthroughs' WHERE work_id = ? AND readthrough = ?`, [ workId, readthrough ])
			readthroughContent = entry.rows[ 0 ] as SQLReadthrough ?? null

			if (readthroughContent)
				readthroughContent = {
					currentChapter: readthroughContent.current_chapter,
					currentChapterPosition: readthroughContent.current_chapter_position,
					datedProgress: JSON.parse(readthroughContent.dated_progress),
					readChapters: JSON.parse(readthroughContent.read_chapters),
					readthrough: readthroughContent.readthrough,
					workId: readthroughContent.work_id
				} as DBReadthrough
		} catch (error) {
			console.error(error)
			readthroughContent = null
		}
	})

	return readthroughContent as unknown as (DBReadthrough | null)
}