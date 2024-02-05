import getDB from "../../database/getDB"

export default async function getSavedQueries() {
	const db = getDB()

	let queries: string[] = []

	await db.transactionAsync(async tx => {
		const checkResult = await tx.executeSqlAsync("SELECT query_json FROM 'query_storage'")
		queries = checkResult.rows.map((v) => v[ "query_json" ])
	}, true)

	return queries
}