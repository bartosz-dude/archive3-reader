import fastHashCode from "fast-hash-code"
import worksQuery from "../../ao3/api/worksQuery"
import getDB from "../../database/getDB"

export default async function deleteQuery(query: ReturnType<typeof worksQuery>) {
	const queryHash = fastHashCode(query.paramsAsJSON())

	const db = getDB()

	await db.transactionAsync(async tx => {
		await tx.executeSqlAsync("DELETE FROM 'query_storage' WHERE hash = ?", [ queryHash ])
		return
	})
}