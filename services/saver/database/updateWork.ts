import * as SQLite from "expo-sqlite"
import { DBWork, SQLValue } from "../../../types/database"
import updateSQLQuery from "./updateSQLQuery"

type DBWorkUpdate = Partial<DBWork> & Pick<DBWork, "workId">

export enum UpdateWorkErrors {
	alreadyExistsWhenCreating = "entry already exists when trying to insert it",
	missingDataWhenCreating = "missing data when creating entry, all fields must be satisfied",
}

export default async function updateWork(data: DBWorkUpdate) {
	const db = SQLite.openDatabase("archive3storage.db")

	await db.transactionAsync(async (tx) => {
		// @ts-ignore
		const work = await tx.executeSqlAsync(
			`SELECT work_id from 'works' WHERE work_id = ?`,
			[data.workId]
		)

		if (work.rows.length > 0) {
			// console.log("updateWork data update", data)
			await tx.executeSqlAsync(
				updateSQLQuery(
					"works",
					[
						["total_chapters", data.totalChapters],
						["available_chapters", data.availableChapters],
						["last_update", data.lastUpdate],
						["is_saved", data.isSaved],
						["is_offline", data.isOffline],
						["has_new_chapters", data.hasNewChapters],
						["new_chapters", data.newChapters],
					],
					[["work_id", data.workId]]
				)
			)
			return
		}

		try {
			// console.log("updateWork data insert", data)
			if (
				data.totalChapters === undefined ||
				data.availableChapters === undefined ||
				data.lastUpdate === undefined ||
				data.isSaved === undefined ||
				data.isOffline === undefined ||
				data.hasNewChapters === undefined ||
				data.newChapters === undefined
			)
				throw Error("missing data")

			const a = await tx.executeSqlAsync(
				`INSERT INTO 'works' VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					data.workId,
					// @ts-expect-error
					data.totalChapters,
					data.availableChapters,
					data.lastUpdate.toUTCString(),
					// @ts-expect-error
					data.isSaved,
					// @ts-expect-error
					data.isOffline,
					// @ts-expect-error
					data.hasNewChapters,
					JSON.stringify(data.newChapters),
				]
			)
		} catch (err) {
			const errMsg = (err as { message: string }).message

			// console.error("updateWork", err, data)

			if (errMsg.startsWith("UNIQUE constraint failed"))
				throw Error(UpdateWorkErrors.alreadyExistsWhenCreating)

			if (errMsg == "missing data")
				throw Error(UpdateWorkErrors.missingDataWhenCreating)

			throw err
			// @ts-ignore
			// const work2 = await tx.executeSqlAsync(`SELECT work_id from 'works' WHERE work_id = ?`, [ parseInt(data.workId) ])
			// console.error(error, work2)
		}

		return
	})
}
