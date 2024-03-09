import dbOperationAsync from "../api/dbOperationAsync"
import dbTransactionAsync from "../api/dbTrasactionAsync"

export default async function deleteSavedWork(workId: number) {
	await dbTransactionAsync(async (db) => {
		await db.runAsync(`DELETE FROM 'saved_works' WHERE work_id = ?`, [
			workId,
		])
	})
}
