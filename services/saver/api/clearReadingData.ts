import * as SQLite from "expo-sqlite"
import { ToastAndroid } from "react-native"
import setupDB from "./setupDB"
export default async function clearReadingData() {
	const db = SQLite.openDatabase("archive3storage.db")

	await db.transactionAsync(async (tx) => {
		await tx.executeSqlAsync(`DROP TABLE IF EXISTS 'works'`)
		await tx.executeSqlAsync(`DROP TABLE IF EXISTS 'saved_works'`)
		await tx.executeSqlAsync(`DROP TABLE IF EXISTS 'readthroughs'`)
	})

	await setupDB()

	ToastAndroid.show("Data cleared", ToastAndroid.LONG)
}
