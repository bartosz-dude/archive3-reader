import * as SQLite from "expo-sqlite/next"

export default async function dbOperationAsync<R extends unknown>(
	operation: (db: SQLite.SQLiteDatabase) => Promise<R>
): Promise<R>
export default async function dbOperationAsync(
	operation: (db: SQLite.SQLiteDatabase) => Promise<void>
): Promise<void>
export default async function dbOperationAsync<R extends unknown>(
	operation: (db: SQLite.SQLiteDatabase) => Promise<R>
): Promise<R> {
	let result
	try {
		const db = await SQLite.openDatabaseAsync("archive3storage.db")

		result = await operation(db)

		await db.closeAsync()
	} catch (error) {
		console.error("dbOperation error", error)
	}

	return result as Awaited<R>
}
