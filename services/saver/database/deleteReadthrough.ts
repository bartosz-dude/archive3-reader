import dbOperationAsync from "../api/dbOperationAsync"
import dbTransactionAsync from "../api/dbTrasactionAsync"

export default async function deleteReadthrough(
	workId: number,
	readthrough: number
) {
	await dbTransactionAsync(async (db) => {
		await db.runAsync(
			`DELETE FROM 'readthroughs' WHERE work_id = ? AND readthrough = ?`,
			[workId, readthrough]
		)
	})
}
