import * as SQLite from "expo-sqlite"
import { DBWork } from "../../../types/database"

export default async function updateWork(data: DBWork) {
	const db = SQLite.openDatabase('archive3storage.db')

	await db.transactionAsync(async tx => {
		// @ts-ignore
		const work = await tx.executeSqlAsync(`SELECT work_id from 'works' WHERE work_id = ?`, [ parseInt(data.workId) ])
		// console.log("work", work)
		if (work.rows.length > 0) {
			// @ts-ignore
			await tx.executeSqlAsync(`UPDATE 'works' SET total_chapters = ?, available_chapters = ?, last_update = ?, is_saved = ?, is_offline = ?`, [ data.totalChapters, data.availableChapters, data.lastUpdate.toUTCString(), data.isSaved, data.isOffline ])
			// const works = await tx.executeSqlAsync(`SELECT * FROM 'works'`)
			// console.log("updateWork existing", works.rows)
			return
		}

		try {

			// @ts-ignore
			await tx.executeSqlAsync(`INSERT INTO 'works' VALUES (?, ?, ?, ?, ?, ?)`, [ parseInt(data.workId), data.totalChapters, data.availableChapters, data.lastUpdate.toUTCString(), data.isSaved, data.isOffline ])
		} catch (error) {
			// @ts-ignore
			const work2 = await tx.executeSqlAsync(`SELECT work_id from 'works' WHERE work_id = ?`, [ parseInt(data.workId) ])
			console.error(error, work2)
		}

		// const works = await tx.executeSqlAsync(`SELECT * FROM 'works'`)
		// console.log("updateWork", works.rows)
		return
	})
}