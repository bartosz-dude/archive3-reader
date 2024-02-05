import * as SQLite from "expo-sqlite"

export default async function deleteSavedWork(workId: number) {
	const db = SQLite.openDatabase('archive3storage.db')

	await db.transactionAsync(async tx => {
		await tx.executeSqlAsync(`DELETE FROM 'saved_works' WHERE work_id = ?`, [ workId ])
	})
}