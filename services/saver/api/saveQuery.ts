import fastHashCode from "fast-hash-code"
import worksQuery from "../../ao3/api/worksQuery"
import dbOperationAsync from "./dbOperationAsync"
import dbTransactionAsync from "./dbTrasactionAsync"
// import getDB from "../../database/getDB";

export enum SaveQueryErrors {
	alreadyExists = "entry already exists",
	// tableNotFound = "table not found"
}

export default async function saveQuery(query: ReturnType<typeof worksQuery>) {
	const queryHash = fastHashCode(query.paramsAsJSON())

	await dbTransactionAsync(async (db) => {
		try {
			await db.runAsync("INSERT INTO 'query_storage' VALUES (?, ?)", [
				queryHash,
				query.paramsAsJSON(),
			])
		} catch (err) {
			if (
				(err as { message: string }).message.startsWith(
					"UNIQUE constraint failed"
				)
			)
				throw Error(SaveQueryErrors.alreadyExists)

			throw err
		}
		return
	})
}
