// import * as SQLite from "expo-sqlite"
import dbOperationAsync from "./dbOperationAsync"
import dbTransactionAsync from "./dbTrasactionAsync"

export default async function setupDB() {
	console.log("setting up db")
	await dbTransactionAsync(async (db) => {
		// on app setup there should be no app tables, so the user_version is set to newest as the tables will be created with newest schema
		await db.withExclusiveTransactionAsync(async () => {
			const tables = await db.getAllAsync<{ name: string }>(
				`SELECT name FROM sqlite_master WHERE type='table'`
			)

			console.log("tables", tables)

			const appTables = tables.filter((v) =>
				[
					"query_storage",
					"works",
					"saved_works",
					"readthroughs",
				].includes(v.name)
			)

			if (appTables.length < 4)
				// When adding version in updater that's lower here, update the value here too
				await db.runAsync(`PRAGMA user_version = 1`)
		})

		await db.withExclusiveTransactionAsync(async () => {
			await db.runAsync(`CREATE TABLE IF NOT EXISTS 'query_storage' (
			hash INTEGER PRIMARY KEY NOT NULL,
			query_json TEXT NOT NULL
			)`)

			await db.runAsync(`CREATE TABLE IF NOT EXISTS 'works' (
			work_id INTEGER PRIMARY KEY NOT NULL,
			total_chapters INTEGER,
			available_chapters INTEGER NOT NULL,
			last_update TEXT NOT NULL,
			is_saved BOOLEAN NOT NULL,
			is_offline BOOLEAN NOT NULL,
			has_new_chapters BOOLEAN NOT NULL,
			new_chapters TEXT
			)`)

			await db.runAsync(`CREATE TABLE IF NOT EXISTS 'saved_works' (
			work_id INTEGER PRIMARY KEY NOT NULL,
			title TEXT NOT NULL,
			summary TEXT NOT NULL,
			language TEXT NOT NULL,
			authors TEXT NOT NULL,
			tags TEXT NOT NULL,
			stats TEXT NOT NULL,
			chapters_list TEXT NOT NULL
			)`)

			await db.runAsync(`CREATE TABLE IF NOT EXISTS 'readthroughs' (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			work_id INTEGER NOT NULL,
			readthrough INTEGER NOT NULL,
			current_chapter INTEGER NOT NULL,
			current_chapter_position FLOAT NOT NULL,
			read_chapters TEXT NOT NULL,
			dated_progress TEXT NOT NULL,
			latest_update_date TEXT NOT NULL,
			FOREIGN KEY (work_id) REFERENCES 'works'(work_id)
			)`)
		})

		// tables updater
		// rember to update user_version higher in the file to the newest here
		await db.withExclusiveTransactionAsync(async () => {
			async function getVersion() {
				const dbVersion =
					(
						await db.getFirstAsync<{ user_version: number }>(
							`PRAGMA user_version`
						)
					)?.user_version ?? 0

				return dbVersion
			}

			// 0.3.4
			if ((await getVersion()) <= 0) {
				await db.runAsync(
					`ALTER TABLE 'readthroughs' ADD COLUMN latest_update_date TEXT NOT NULL DEFAULT ${JSON.stringify(
						new Date()
					)}`
				)
				await db.runAsync(
					`ALTER TABLE 'works' ADD COLUMN has_new_chapters BOOLEAN NOT NULL DEFAULT 0`
				)
				await db.runAsync(
					`ALTER TABLE 'works' ADD COLUMN new_chapters TEXT DEFAULT NULL`
				)

				await db.runAsync(`PRAGMA user_version = 1`)
			}
		})
		console.log("setting up db completed")
	})
}
