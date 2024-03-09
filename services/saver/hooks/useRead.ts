import { useEffect, useRef, useState } from "react"
import useLoading from "../../../libs/react-native-loaded/hooks/useLoading"
import useStatus from "../../../libs/react-native-loaded/hooks/useStatus"
import parseDataHandle from "../../../libs/react-native-loaded/tools/parseDataHandle"
import { DBReadthrough } from "../../../types/database"
import getReadthrough from "../database/getReadthrough"
import updateReadthrough from "../database/updateReadthrough"

type Tracker = {
	chapter: number
	startDate: Date
	startProgress: number
	endDate: Date | null
	endProgress: number | null
}

export default function useRead(workId: number, readthrough: number) {
	const savedRead = useLoading(() => getReadthrough(workId, readthrough), [])
	// const savedReadRef = useLoadedRef(savedRead)
	const [savedReadDataStatus, setSavedReadDataStatus] = useStatus()
	const [savedReadData, setSavedReadData] = useState<DBReadthrough | null>(
		null
	)
	const trackingStatusRef = useRef(false)

	const savedReadRef = useRef(savedRead.data)

	useEffect(() => {
		// if (savedRead.status === "failed") console.error(savedRead.error)
		console.log("read", savedRead)
	}, [savedRead.status])

	useEffect(() => {
		// console.log("ref refresh", savedRead.status)
		if (savedRead.status == "success") {
			savedReadRef.current = savedRead.data
			setSavedReadData(savedRead.data)
			setSavedReadDataStatus("success")
		}
	}, [savedRead.status])

	const tracker = useRef<Tracker>({
		chapter: 0,
		endDate: null,
		endProgress: null,
		startDate: new Date(),
		startProgress: 0,
	})

	function startTracking(chapter: number, progress: number) {
		trackingStatusRef.current = true
		tracker.current = {
			chapter: chapter,
			startDate: new Date(),
			startProgress: progress,
			endDate: null,
			endProgress: null,
		}
	}

	function endTracking(progress: number) {
		if (!trackingStatusRef.current) return
		trackingStatusRef.current = false
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
		if (
			(tracker.current.endProgress ?? -1) >= 0 &&
			(tracker.current.endProgress ?? -1) == tracker.current.startProgress
		) {
			updateReadthrough({
				readthrough: readthrough,
				workId: workId,
				currentChapter: tracker.current.chapter,
				currentChapterPosition: tracker.current.startProgress,
				datedProgress: savedReadRef.current?.datedProgress ?? [],
				readChapters: savedReadRef.current?.readChapters ?? [],
			}).then(() => {
				savedRead.reload()
			})
			return
		}

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
				readChapters: ((): number[] => {
					if (tracker.current.endProgress === 1)
						return (
							savedReadRef.current?.readChapters ?? []
						).concat(tracker.current.chapter)

					return savedReadRef.current?.readChapters ?? []
				})(),
			}).then(() => {
				savedRead.reload()
			})
	}

	/**
	 * Gets newest progress for a given chapter, if none found returns 0
	 */
	function getChapterProgress(chapter: number) {
		if (savedRead.data?.currentChapter == chapter)
			return savedRead.data.currentChapterPosition ?? 0

		const chapterProgress = savedRead.data?.datedProgress.filter(
			(v) => v.chapter == chapter
		)

		if (chapterProgress === undefined || chapterProgress.length == 0)
			return 0

		const latestEntry = chapterProgress?.reduce(
			(prev, v) => {
				if (prev.endDate.getTime() < v.endDate.getTime()) return v
				return prev
			},
			{ endDate: new Date(0) } as DBReadthrough["datedProgress"][0]
		)

		return latestEntry.endProgress ?? 0
	}

	function addReadChapter() {
		updateReadthrough({
			readthrough: readthrough,
			workId: workId,
			currentChapter: tracker.current.chapter,
			currentChapterPosition: tracker.current.endProgress ?? 1,
			datedProgress: savedReadRef.current?.datedProgress ?? [],
			readChapters: ((): number[] => {
				if (tracker.current.endProgress === 1)
					return (savedReadRef.current?.readChapters ?? []).concat(
						tracker.current.chapter
					)

				return savedReadRef.current?.readChapters ?? []
			})(),
		}).then(() => {
			savedRead.reload()
		})
	}

	function markChapterAsRead() {
		updateReadthrough({
			readthrough: readthrough,
			workId: workId,
			currentChapter: tracker.current.chapter,
			currentChapterPosition:
				tracker.current.endProgress ?? tracker.current.startProgress,
			datedProgress: savedReadRef.current?.datedProgress ?? [],
			readChapters: (savedReadRef.current?.readChapters ?? []).concat(
				tracker.current.chapter
			),
		}).then(() => {
			savedRead.reload()
		})
	}

	function markChapterAsUnread() {
		updateReadthrough({
			readthrough: readthrough,
			workId: workId,
			currentChapter: tracker.current.chapter,
			currentChapterPosition:
				tracker.current.endProgress ?? tracker.current.startProgress,
			datedProgress: savedReadRef.current?.datedProgress ?? [],
			readChapters: (savedReadRef.current?.readChapters ?? []).filter(
				(v) => v !== tracker.current.chapter
			),
		}).then(() => {
			savedRead.reload()
		})
	}

	function clearChapterProgress(chapter: number) {
		updateReadthrough({
			readthrough: readthrough,
			workId: workId,
			currentChapter: savedRead.data?.currentChapter,
			currentChapterPosition:
				savedRead.data?.currentChapter == chapter
					? 0
					: savedRead.data?.currentChapter,
			datedProgress: savedRead.data?.datedProgress.filter(
				(v) => v.chapter != chapter
			),
			readChapters: savedRead.data?.readChapters.filter(
				(v) => v != chapter
			),
		}).then(() => {
			savedRead.reload()
		})
	}

	return {
		data: savedReadData,
		status: savedReadDataStatus,
		dataHandle: parseDataHandle(savedRead),
		startTracking,
		endTracking,
		getChapterProgress,
		addReadChapter,
		clearChapterProgress,
		markChapterAsRead,
		markChapterAsUnread,
	}
}
