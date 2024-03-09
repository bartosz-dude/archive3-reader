import { useEffect } from "react"
import useLoading from "../../../libs/react-native-loaded/hooks/useLoading"
import { LoadingHandle } from "../../../libs/react-native-loaded/types/loadedTypes"
import { AO3Work } from "../../ao3/types/work"
import deleteSavedWork from "../database/deleteSavedWork"
import deleteWork from "../database/deleteWork"
import getSavedWork from "../database/getSavedWork"
import getWork from "../database/getWork"
import updateSavedWork from "../database/updateSavedWork"
import updateWork, { UpdateWorkErrors } from "../database/updateWork"

export default function useWork(work: LoadingHandle<AO3Work>) {
	const localWork = useLoading(async () => {
		if (work.status == "success" && work.data !== null)
			return getWork(work.data.meta.id)

		return Promise.reject("3")
	}, [work.status])

	const savedWork = useLoading(async () => {
		if (work.status == "success" && work.data !== null)
			return getSavedWork(work.data.meta.id)

		return Promise.reject("4")
	}, [work.status])

	useEffect(() => {
		if (work.data === null) return
		if (localWork.status != "success") return

		if (localWork.data === null) {
			// console.log("localWork insert")
			// inserts new entry
			updateWork({
				workId: work.data.meta.id,
				availableChapters: work.data.meta.stats.chapters,
				isOffline: false,
				isSaved: false,
				lastUpdate: new Date(work.data.meta.stats.updated),
				totalChapters: work.data.meta.stats.maxChapters,
			})
				.then(() => localWork.reload())
				.catch((r) => {
					// for some reason it tries to insert data twice generating this error, so I just ignore it
					if (r == UpdateWorkErrors.alreadyExistsWhenCreating) {
						console.warn("failed unique")
					}

					return r
				})
		} else if (
			localWork.data &&
			localWork.data.lastUpdate.getTime() !==
				new Date(work.data.meta.stats.updated).getTime()
		) {
			// console.log("localWork update")
			// updates existing entry
			updateWork({
				workId: work.data.meta.id,
				availableChapters: work.data.meta.stats.chapters,
				lastUpdate: new Date(work.data.meta.stats.updated),
				totalChapters: work.data.meta.stats.maxChapters,
			}).then(() => localWork.reload())
		}
	}, [work.status, localWork.status])

	useEffect(() => {
		// console.log("updateSavedWork", localWork.data?.isSaved, savedWork.data)
		if (!work.data) return
		if (savedWork.status != "success") return
		if (
			localWork.data?.isSaved === true &&
			savedWork.data === null
			// work.data
		) {
			// console.log("updateSavedWork insert")
			updateSavedWork({
				workId: work.data.meta.id,
				title: work.data.meta.title,
				summary: work.data.meta.summary,
				tags: work.data.meta.tags,
				stats: work.data.meta.stats,
				chaptersList: work.data.chapterslist,
				language: work.data.meta.language,
				authors: work.data.meta.authors,
			}).then(() => savedWork.reload())
		}

		if (localWork.data?.isSaved === false && savedWork.data !== null) {
			// console.log("updateSavedWork delete")
			deleteSavedWork(work.data.meta.id).then(() => savedWork.reload())
		}
	}, [localWork.data?.isSaved])

	type workUpdateData = Pick<
		Parameters<typeof updateWork>[0],
		"isSaved" | "isOffline"
	>
	function updateLocalWork(data: workUpdateData) {
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

	function deleteLocalWork() {
		if (work.data === null) return

		deleteSavedWork(work.data.meta.id)
		deleteWork(work.data.meta.id)
		// if I where to update loader, then it would save again and this would be pointless
	}

	return {
		handle: localWork,
		data: localWork.data,
		update: updateLocalWork,
		// delete: deleteLocalWork, // it's not really needed here
		savedWork: {
			handle: savedWork,
		},
	}
}
