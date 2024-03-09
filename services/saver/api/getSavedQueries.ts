// import getDB from "../../database/getDB"
import { useSQLiteContext } from "expo-sqlite/next"
import { SQLSearchQuery } from "../../../types/database"
import dbOperationAsync from "./dbOperationAsync"
import dbTransactionAsync from "./dbTrasactionAsync"

export default async function getSavedQueries() {
	console.log("getSavedQueries")

	// const db = useSQLiteContext()
	return await dbTransactionAsync(async (db) => {
		let queries: string[] = []

		console.log("b")
		try {
			const checkResult = await db.getAllAsync<
				Pick<SQLSearchQuery, "query_json">
			>("SELECT query_json FROM 'query_storage'")
			queries = checkResult.map((v) => v["query_json"])
		} catch (error) {
			console.error(error)
		}

		console.log("queries", queries)

		return queries
	})
}
