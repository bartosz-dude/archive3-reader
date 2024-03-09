import * as SQLite from "expo-sqlite/next"
import { LOCAL_DATABASE_NAME } from "../../../constants/database"

type Transaction = Parameters<
	Parameters<SQLite.SQLiteDatabase["withExclusiveTransactionAsync"]>[0]
>[0]
export default async function dbTransactionAsync<R extends unknown>(
	operation: (txn: Transaction) => Promise<R>
): Promise<R>
export default async function dbTransactionAsync(
	operation: (txn: Transaction) => Promise<void>
): Promise<void>
export default async function dbTransactionAsync<R extends unknown>(
	operation: (txn: Transaction) => Promise<R>
): Promise<R> {
	let result
	try {
		const db = await SQLite.openDatabaseAsync(LOCAL_DATABASE_NAME, {
			useNewConnection: true,
		})

		// db.isInTransactionAsync()
		await db.withExclusiveTransactionAsync(async (txn) => {
			result = await operation(txn)
		})

		await db.closeAsync()
	} catch (error) {
		console.error("dbTransaction error", error)
	}

	return result as Awaited<R>
}
