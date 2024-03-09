import fastHashCode from "fast-hash-code"
import worksQuery from "../../ao3/api/worksQuery"
import dbOperationAsync from "./dbOperationAsync"
import dbTransactionAsync from "./dbTrasactionAsync"

export default async function deleteQuery(
	query: ReturnType<typeof worksQuery>
) {
	const queryHash = fastHashCode(query.paramsAsJSON())

	await dbTransactionAsync(async (db) => {
		await db.runAsync("DELETE FROM 'query_storage' WHERE hash = ?", [
			queryHash,
		])
		return
	})
}
