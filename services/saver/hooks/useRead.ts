import { useEffect, useRef } from "react"
import useLoading from "../../../hooks/useLoading"
import parseDataHandle from "../../../tools/parseDataHandle"
import { DataHandle } from "../../../types/common"
import { DBReadthrough } from "../../../types/database"
import getReadthrough from "../database/getReadthrough"
import updateReadthrough from "../database/updateReadthrough"
import useLoadedRef from "../../../hooks/useLoadedRef"

type Tracker = {
	chapter: number
	startDate: Date
	startProgress: number
	endDate: Date | null
	endProgress: number | null
}

export default function useRead(workId: number, readthrough: number) {
	const savedRead = useLoading(() => getReadthrough(workId, readthrough), [])
	const savedReadRef = useLoadedRef(savedRead)
	const tracker = useRef<Tracker>({
		chapter: 0,
		endDate: null,
		endProgress: null,
		startDate: new Date(),
		startProgress: 0,
	})

	function startTracking(chapter: number, progress: number) {
		tracker.current = {
			chapter: chapter,
			startDate: new Date(),
			startProgress: progress,
			endDate: null,
			endProgress: null,
		}
	}

	function endTracking(progress: number) {
		tracker.current = {
			...tracker.current,
			endProgress: progress,
			endDate: new Date(),
		}

		// console.log(
		// 	"tracking",
		// 	tracker.current,
		// 	tracker.current.startDate.toISOString(),
		// 	tracker.current.endDate?.toISOString(),
		// 	savedReadRef.current
		// )
		if (tracker.current.chapter !== savedReadRef.current?.currentChapter) {
			// console.log("not same")
			updateDB()
			return
		}

		if (tracker.current.startProgress === tracker.current.endProgress)
			return

		updateDB()
	}

	function updateDB() {
		// console.log(
		// 	"beforeUpdate",
		// 	savedReadRef.current,
		// 	tracker.current,
		// 	savedRead,
		// 	savedRead.data?.datedProgress,
		// 	savedRead.data?.readChapters
		// )
		if (tracker.current.endProgress && tracker.current.endDate)
			updateReadthrough({
				readthrough: readthrough,
				workId: workId,
				currentChapter: tracker.current.chapter,
				currentChapterPosition: tracker.current.endProgress,
				datedProgress: (
					savedReadRef.current?.datedProgress ?? []
				).concat({
					chapter: tracker.current.chapter,
					endDate: tracker.current.endDate,
					endProgress: tracker.current.endProgress,
					startDate: tracker.current.startDate,
					startProgress: tracker.current.startProgress,
				}),
				readChapters: (() => {
					if (tracker.current.endProgress === 1)
						return (
							savedReadRef.current?.readChapters ?? []
						).concat(tracker.current.chapter)

					return savedReadRef.current?.readChapters ?? []
				})(),
			})
	}

	function getChapterProgress(chapter: number) {
		if (savedRead.data?.currentChapter == chapter)
			return savedRead.data.currentChapterPosition ?? 0

		const chapterProgress = savedRead.data?.datedProgress.filter(
			(v) => v.chapter == chapter
		)
		// console.log("gettingProgress", chapterProgress)

		if (chapterProgress === undefined) return 0

		const latestEntry = chapterProgress?.reduce(
			(prev, v) => {
				if (prev.endDate.getTime() < v.endDate.getTime()) return v
				return prev
			},
			{ endDate: new Date(0) } as DBReadthrough["datedProgress"][0]
		)
		return latestEntry.endProgress ?? 0
	}

	return {
		dataHandle: parseDataHandle(savedRead),
		startTracking,
		endTracking,
		getChapterProgress,
	}
}
