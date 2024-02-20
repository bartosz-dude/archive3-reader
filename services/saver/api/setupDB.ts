import * as SQLite from "expo-sqlite"
import { DevSettings } from "react-native"

export default async function setupDB() {
	const db = SQLite.openDatabase("archive3storage.db")

	await db.transactionAsync(async (tx) => {
		// await tx.executeSqlAsync(`DROP TABLE IF EXISTS 'works'`)
		// await tx.executeSqlAsync(`DROP TABLE IF EXISTS 'saved_works'`)
		// await tx.executeSqlAsync(`DROP TABLE IF EXISTS 'readthroughs'`)
	})

	await db.transactionAsync(async (tx) => {
		// const tables = await tx.executeSqlAsync(`SELECT * FROM 'works'`)
		// console.log(tables)

		await tx.executeSqlAsync(`CREATE TABLE IF NOT EXISTS 'query_storage' (
			hash INTEGER PRIMARY KEY NOT NULL,
			query_json TEXT NOT NULL
			)`)

		await tx.executeSqlAsync(`CREATE TABLE IF NOT EXISTS 'works' (
			work_id INTEGER PRIMARY KEY NOT NULL,
			total_chapters INTEGER,
			available_chapters INTEGER NOT NULL,
			last_update TEXT NOT NULL,
			is_saved BOOLEAN NOT NULL,
			is_offline BOOLEAN NOT NULL,
			has_new_chapters BOOLEAN,
			new_chapters TEXT
			)`)

		await tx.executeSqlAsync(`CREATE TABLE IF NOT EXISTS 'saved_works' (
			work_id INTEGER PRIMARY KEY NOT NULL,
			title TEXT NOT NULL,
			summary TEXT NOT NULL,
			language TEXT NOT NULL,
			authors TEXT NOT NULL,
			tags TEXT NOT NULL,
			stats TEXT NOT NULL,
			chapters_list TEXT NOT NULL
			)`)

		await tx.executeSqlAsync(`CREATE TABLE IF NOT EXISTS 'readthroughs' (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			work_id INTEGER NOT NULL,
			readthrough INTEGER NOT NULL,
			current_chapter INTEGER NOT NULL,
			current_chapter_position FLOAT NOT NULL,
			read_chapters TEXT NOT NULL,
			dated_progress TEXT NOT NULL,
			FOREIGN KEY (work_id) REFERENCES 'works'(work_id)
			)`)

		// const tables = await tx.executeSqlAsync(`SELECT name FROM sqlite_master WHERE type='table'`)
		const tables = await tx.executeSqlAsync(`SELECT * FROM 'works'`)
		// console.log(tables)
	})
}
