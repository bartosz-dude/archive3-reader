import * as SQLite from "expo-sqlite"

export default async function deleteWork(workId: number) {
	const db = SQLite.openDatabase('archive3storage.db')

	await db.transactionAsync(async tx => {
		await tx.executeSqlAsync(`DELETE FROM 'works' WHERE work_id = ?`, [ workId ])
	})
}