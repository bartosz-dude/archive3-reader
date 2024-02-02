import * as SQLite from "expo-sqlite"
import { DBReadthrough } from "../../../types/database"

export default async function getReadthrough(workId: number, readthrough: number) {
	const db = SQLite.openDatabase('archive3storage.db')

	let readthroughContent

	await db.transactionAsync(async tx => {
		try {
			const entry = await tx.executeSqlAsync(`SELECT * FROM 'readthroughs' WHERE work_id = ? AND readthrough = ?`, [ workId, readthrough ])
			// console.log("getRead", entry)
			readthroughContent = entry.rows[ 0 ] ?? null
		} catch (error) {
			console.error(error)
			readthroughContent = null
		}
	})

	return readthroughContent as unknown as (DBReadthrough | null)
}