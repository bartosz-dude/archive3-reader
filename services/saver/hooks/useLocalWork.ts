import { useEffect, useMemo, useState } from "react"
import useLoading from "../../../hooks/useLoading"
import useUpdater from "../../../hooks/useUpdater"
import { LoadingHandle, DataHandle } from "../../../types/common"
import { DBSavedWork, DBWork } from "../../../types/database"
import { AO3Work } from "../../ao3/types/work"
import getSavedWork from "../database/getSavedWork"
import getWork from "../database/getWork"
import updateSavedWork from "../database/updateSavedWork"
import updateWork, { UpdateWorkErrors } from "../database/updateWork"
import loaded from "../../../tools/loaded"
import deleteSavedWork from "../database/deleteSavedWork"
import useWillUnmount from "../../../hooks/useWillUnmount"
import parseDataHandle from "../../../tools/parseDataHandle"
import useStatus from "../../../hooks/useStatus"
import noData from "../../../tools/noData"

export default function useLocalWork(workId: number) {
	const localWork = useLoading(async () => getWork(workId), [])
	const savedWork = useLoading(async () => getSavedWork(workId), [])

	const [status, setStatus] = useStatus()

	const willUnmount = useWillUnmount()

	useEffect(() => {
		// console.log("localWork", localWork)
		if (loaded(localWork) && loaded(savedWork)) setStatus("success")
	}, [localWork.status, savedWork.status])

	const [updated, setUpdated] = useState<{
		local: DBWork
		saved: DBSavedWork | null
	} | null>(null)

	function saveLocalWork(work: AO3Work) {
		// updates data if it changed since last download if not the returns, skipped when no data saved
		if (loaded(localWork) && localWork.data !== null) {
			if (
				localWork.data.lastUpdate.getTime() <
				Date.parse(work.meta.stats.updated)
			) {
				setUpdated({
					local: localWork.data,
					saved: savedWork.data,
				})

				updateWork({
					workId: work.meta.id,
					availableChapters: work.meta.stats.chapters,
					lastUpdate: new Date(work.meta.stats.updated),
					totalChapters: work.meta.stats.maxChapters,
				}).then(() => localWork.reload())

				updateSavedWork({
					workId: work.meta.id,
					title: work.meta.title,
					summary: work.meta.summary,
					tags: work.meta.tags,
					stats: work.meta.stats,
					chaptersList: work.chapterslist,
					language: work.meta.language,
					authors: work.meta.authors,
				}).then(() => savedWork.reload())

				return
			}

			if (noData(savedWork))
				// temp saved data when local data exists
				updateSavedWork({
					workId: work.meta.id,
					title: work.meta.title,
					summary: work.meta.summary,
					tags: work.meta.tags,
					stats: work.meta.stats,
					chaptersList: work.chapterslist,
					language: work.meta.language,
					authors: work.meta.authors,
				}).then(() => savedWork.reload())

			return
		}

		// saves data of new opened work
		updateWork({
			workId: work.meta.id,
			availableChapters: work.meta.stats.chapters,
			isOffline: false,
			isSaved: false,
			lastUpdate: new Date(work.meta.stats.updated),
			totalChapters: work.meta.stats.maxChapters,
			hasNewChapters: false,
			newChapters: [],
		})
			.then(() => localWork.reload())
			.catch((r) => {
				// for some reason it tries to insert data twice generating this error, so I just ignore it
				if (r == UpdateWorkErrors.alreadyExistsWhenCreating)
					console.warn("failed unique")

				return r
			})

		// temp saved data
		updateSavedWork({
			workId: work.meta.id,
			title: work.meta.title,
			summary: work.meta.summary,
			tags: work.meta.tags,
			stats: work.meta.stats,
			chaptersList: work.chapterslist,
			language: work.meta.language,
			authors: work.meta.authors,
		}).then(() => savedWork.reload())
	}

	// delete temp data, unless saved
	useEffect(() => {
		return () => {
			if (!willUnmount.current) return

			if (loaded(localWork) && localWork.data?.isSaved === false) {
				deleteSavedWork(localWork.data.workId)
			}
		}
	}, [localWork])

	type workUpdateData = Pick<
		Parameters<typeof updateWork>[0],
		"isSaved" | "isOffline"
	>

	function updateLocalWork(data: workUpdateData) {
		if (localWork.status === "success" && localWork.data === null)
			throw new Error(
				"useLocalWork: trying to update localWork when localWork is null (not saved)"
			)

		if (localWork.data !== null) {
			updateWork({
				workId: localWork.data.workId,
				isOffline: data.isOffline,
				isSaved: data.isSaved,
			}).then(() => {
				localWork.reload()
			})
		}
	}

	return {
		status: status,
		dataHandle: parseDataHandle(localWork),
		savedWorkDataHandle: parseDataHandle(savedWork),
		updated: {
			isUpdated: updated ? true : false,
			prevData: updated,
		},
		saveLocalWork,
		updateLocalWork,
	}
}
