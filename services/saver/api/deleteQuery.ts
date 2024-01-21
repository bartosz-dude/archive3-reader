import fastHashCode from "fast-hash-code"
import worksQuery from "../../ao3/api/worksQuery"
import getDB from "../../database/getDB"

export default async function deleteQuery(query: ReturnType<typeof worksQuery>) {
	const queryHash = fastHashCode(query.paramsAsJSON())

	const db = getDB()

	await db.transactionAsync(async tx => {
		await tx.executeSqlAsync("DELETE FROM 'query_storage' WHERE hash = ?", [ queryHash ])
		return
		// const a = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table'")
		// console.log("tables ", a.rows)
		// const checkResult = await tx.executeSqlAsync("SELECT hash FROM 'query_storage' WHERE hash = ?", [ queryHash ])
		// console.log("search ", checkResult)
		// await tx.executeSqlAsync("INSERT INTO 'query_storage' VALUES (?, ?)", [ queryHash, query.paramsAsJSON() ])
	})
}