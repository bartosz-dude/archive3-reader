import dbOperationAsync from "../api/dbOperationAsync"
import dbTransactionAsync from "../api/dbTrasactionAsync"

export default async function deleteWork(workId: number) {
	await dbTransactionAsync(async (db) => {
		await db.runAsync(`DELETE FROM 'works' WHERE work_id = ?`, [workId])
	})
}
