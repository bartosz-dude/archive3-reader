import { useDrizzleStudio } from "expo-drizzle-studio-plugin"
import type { SQLiteDatabase } from "expo-sqlite"

export default async function dbMigrator(db: SQLiteDatabase) {
	const DATABASE_VERSION = 1
	let { user_version: currentDbVersion } = (await db.getFirstAsync<{
		user_version: number
	}>("PRAGMA user_version")) as {
		user_version: number
	}

	console.log("starting db version", currentDbVersion)

	if (currentDbVersion >= DATABASE_VERSION) {
		return
	}

	if (currentDbVersion === 0) {
		await db.withExclusiveTransactionAsync(async (txn) => {
			await txn.execAsync(`PRAGMA journal_mode = 'wal'`)
			await txn.execAsync(
				`CREATE TABLE saved_searches (id INTEGER PRIMARY KEY NOT NULL, query TEXT NOT NULL);`
			)
			await txn.execAsync(
				`CREATE TABLE search_sessions (id INTEGER PRIMARY KEY NOT NULL, date TEXT NOT NULL, saved_search_id INTEGER, query TEXT, FOREIGN KEY(saved_search_id) REFERENCES saved_searches(id));`
			)
			await txn.execAsync(
				`CREATE TABLE search_cache (id INTEGER PRIMARY KEY NOT NULL, session_id INTEGER NOT NULL, page INTEGER NOT NULL, results TEXT NOT NULL, FOREIGN KEY(session_id) REFERENCES search_sessions(id));`
			)
		})
		console.log("db update to version 1 complete")
		currentDbVersion = 1
	}

	await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`)
}
