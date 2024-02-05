import fastHashCode from "fast-hash-code";
import worksQuery from "../../ao3/api/worksQuery";
import getDB from "../../database/getDB";

export enum SaveQueryErrors {
	alreadyExists = "entry already exists",
	tableNotFound = "table not found"
}

export default async function saveQuery(query: ReturnType<typeof worksQuery>) {
	const queryHash = fastHashCode(query.paramsAsJSON())

	const db = getDB()

	await db.transactionAsync(async tx => {
		try {

			await tx.executeSqlAsync("INSERT INTO 'query_storage' VALUES (?, ?)", [ queryHash, query.paramsAsJSON() ])
		} catch (err) {
			if ((err as { message: string }).message.startsWith("UNIQUE constraint failed"))
				throw Error(SaveQueryErrors.alreadyExists)

			throw err
		}
		return
	})
}