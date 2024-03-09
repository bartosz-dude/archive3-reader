import { ToastAndroid } from "react-native"
import dbOperationAsync from "./dbOperationAsync"
import setupDB from "./setupDB"
import dbTransactionAsync from "./dbTrasactionAsync"

export default async function clearReadingData() {
	await dbTransactionAsync(async (db) => {
		await db.runAsync(`DROP TABLE IF EXISTS 'works'`)
		await db.runAsync(`DROP TABLE IF EXISTS 'saved_works'`)
		await db.runAsync(`DROP TABLE IF EXISTS 'readthroughs'`)
		await db.runAsync(`PRAGMA user_version = 0`)
	})

	await setupDB()

	ToastAndroid.show("Data cleared", ToastAndroid.LONG)
}
