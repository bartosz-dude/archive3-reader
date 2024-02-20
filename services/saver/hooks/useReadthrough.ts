import { useEffect, useReducer, useState } from "react"
import useLoading from "../../../hooks/useLoading"
import getReadthrough from "../database/getReadthrough"
import getWork from "../database/getWork"
import updateReadthrough from "../database/updateReadthrough"
import useLoadingHandler from "../../../hooks/useLoadingHandler"
import { LoadingHandle, LoadingStatusText } from "../../../types/common"
import { AO3Work } from "../../ao3/types/work"
import { DBReadthrough } from "../../../types/database"

type TrackerReducerStateFull = {
	chapter: number
	startProgress: number
	startDate: Date
	endProgress: number
	endDate: Date
}

type TrackerReducerState =
	| {
			chapter: number
			startProgress: number
			startDate: Date
			endProgress: null
			endDate: null
	  }
	| TrackerReducerStateFull

type TrackerReducerAction =
	| {
			type: "startTracking"
			payload: {
				chapter: number
				startProgress: number
			}
	  }
	| {
			type: "endTracking"
			payload: {
				endProgress: number
			}
			updater: (state: TrackerReducerStateFull) => void
	  }

function trackerReducer(
	state: TrackerReducerState,
	action: TrackerReducerAction
): TrackerReducerState {
	switch (action.type) {
		case "startTracking": {
			return {
				chapter: action.payload.chapter,
				startProgress: action.payload.startProgress,
				startDate: new Date(),
				endDate: null,
				endProgress: null,
			}
		}
		case "endTracking": {
			const newState = {
				...state,
				endDate: new Date(),
				endProgress: action.payload.endProgress,
			}
			// console.log("endTracking", newState)
			action.updater(newState)
			return newState
		}
		default: {
			return state
		}
	}
}

export default function useReadthrough(
	work: LoadingHandle<AO3Work>,
	readthrough: number
) {
	const savedRead = useLoading(() => {
		if (work.status == "success" && work.data !== null)
			return getReadthrough(work.data.meta.id, readthrough)

		return Promise.reject("1")
	}, [work.status])

	const savedWork = useLoading(() => {
		if (work.status == "success" && work.data !== null)
			return getWork(work.data.meta.id)

		return Promise.reject("2")
	}, [work.status])

	const readthroughStatus = useLoadingHandler([
		savedRead.status,
		savedWork.status,
	])

	const [tracker, dispatchTracker] = useReducer(trackerReducer, {
		chapter: 0,
		startProgress: 0,
		startDate: new Date(),
		endDate: null,
		endProgress: null,
	})
	const [isSessionActive, setIsSessionActive] = useState(false)

	const [currentChapter, setCurrentChapter] = useState(0)
	const [currentChapterPosition, setCurrentChapterPosition] = useState(0)
	const [chapterStartDate, setChapterStartDate] = useState(new Date())

	useEffect(() => {
		if (savedWork.data !== null) {
			if (savedRead.data === null) {
				updateReadthrough({
					workId: savedWork.data.workId,
					currentChapter: 0,
					currentChapterPosition: 0,
					readthrough: 0,
					datedProgress: [],
					readChapters: [],
				}).then(() => savedRead.reload())
			} else {
				// setCurrentChapter(savedRead.data.currentChapter)
			}
		}
	}, [readthroughStatus])

	// useEffect(() => {
	// 	if (savedWork.status == "success" && savedWork.data !== null)
	// 		if (currentChapterPosition == 1) {
	// 			updateReadthrough({
	// 				workId: savedWork.data?.workId,
	// 				readthrough: readthrough,
	// 				currentChapterPosition: currentChapterPosition,
	// 				readChapters: (savedRead.data?.readChapters ?? []).concat(
	// 					currentChapter
	// 				),
	// 			})
	// 		}
	// }, [savedRead.status, currentChapterPosition])

	function isRead(chapter: number) {
		return savedRead.data?.readChapters.find((v) => v == chapter)
	}

	function getAllRead() {
		return savedRead.data?.readChapters
	}

	function startSession(chapter: number, progress: number) {
		setIsSessionActive(true)
		dispatchTracker({
			type: "startTracking",
			payload: {
				chapter: chapter,
				startProgress: isNaN(progress) ? 0 : progress,
			},
		})
		// console.log("chapter", chapter, savedWork.data?.workId)

		if (work.data?.meta.id && !savedRead.data)
			updateReadthrough({
				readthrough: readthrough,
				workId: work.data?.meta.id,
				currentChapter: chapter,
				currentChapterPosition: isNaN(progress) ? 0 : progress,
			})
		// console.log("startSession", tracker)
		// setCurrentChapter(chapter)
	}

	function endSession(progress: number) {
		setIsSessionActive(false)
		dispatchTracker({
			type: "endTracking",
			payload: {
				endProgress: isNaN(progress) ? 0 : progress,
			},
			updater: (state) => {
				// console.log("endUpdater", state)
			},
		})

		if (tracker.startProgress === progress) return

		// console.log("end update", savedWork.data, work.data, tracker, {
		// 	progress: progress,
		// })
		if (work.data?.meta.id)
			updateReadthrough({
				readthrough: readthrough,
				workId: work.data?.meta.id,
				currentChapter: tracker.chapter,
				currentChapterPosition: isNaN(progress) ? 0 : progress,
				readChapters: (() => {
					const chapters = savedRead.data?.readChapters ?? []
					if (progress === 1) chapters.push(tracker.chapter)

					return chapters
				})(),
				datedProgress: (() => {
					const datedProgress = savedRead.data?.datedProgress ?? []
					datedProgress.push({
						chapter: tracker.chapter,
						startDate: tracker.startDate,
						startProgress: tracker.startProgress,
						endDate: new Date(),
						endProgress: progress,
					})

					return datedProgress
				})(),
			})

		// console.log("endSession", tracker)
	}

	function getChapter(chapter: number) {
		const chapterProgress = savedRead.data?.datedProgress.filter(
			(v) => v.chapter == chapter
		)
		const latestEntry = chapterProgress?.reduce(
			(prev, v) => {
				if (prev.endDate.getTime() < v.endDate.getTime()) return v
				return prev
			},
			{ endDate: new Date(0) } as DBReadthrough["datedProgress"][0]
		)

		return latestEntry ?? null
	}

	// useEffect(() => {
	// 	console.log("readthrough", savedRead.data)
	// 	// console.log("trackerUpdate", tracker)
	// 	// return () => {
	// 	// 	console.log("trackerUpdate cleanup", tracker)
	// 	// }
	// }, [savedRead.status])

	return {
		handle: savedRead,
		data: savedRead.data,
		status: readthroughStatus,
		isSessionActive: isSessionActive,
		startSession,
		endSession,
		savedReadthrough: {
			getChapter,
		},
	}
}
