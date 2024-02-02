import * as SQLite from "expo-sqlite"

export default async function deleteReadthrough(workId: number, readthrough: number) {
	const db = SQLite.openDatabase('archive3storage.db')

	await db.transactionAsync(async tx => {
		await tx.executeSqlAsync(`DELETE FROM 'readthroughs' WHERE work_id = ? AND readthrough = ?`, [ workId, readthrough ])
	})
}