import getDB from "../../database/getDB"

export default async function getSavedQueries() {
	const db = getDB()

	let queries

	await db.transactionAsync(async tx => {
		// const a = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table'")

		// console.log("tables ", a.rows)
		const checkResult = await tx.executeSqlAsync("SELECT query_json FROM 'query_storage'")
		console.log("transaction saved queries ", checkResult)
		queries = checkResult.rows
		// console.log("search ", checkResult.rowsAffected)
	})

	return queries
}