import * as SQLite from "expo-sqlite"
import { DevSettings } from "react-native"

export default async function setupDB() {
	const db = SQLite.openDatabase('archive3storage.db')

	await db.transactionAsync(async tx => {
		await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS 'query_storage' (hash NUMBER PRIMARY KEY NOT NULL, query_json TEXT NOT NULL)")
	})

	
}