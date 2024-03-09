import { router, useGlobalSearchParams } from "expo-router"
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react"
import useLoading from "../../hooks/useLoading"
import useLoadingHandler from "../../hooks/useLoadingHandler"
import useUpdater from "../../hooks/useUpdater"
import { workScraperNew } from "../../services/ao3/scraper/work"
import { AO3Work } from "../../services/ao3/types/work"
import useLocalWork from "../../services/saver/hooks/useLocalWork"
import useRead from "../../services/saver/hooks/useRead"
import dataLoaded from "../../tools/loaded"
import noData from "../../tools/noData"
import parseDataHandle from "../../tools/parseDataHandle"
import { DataHandle, LoadingStatusText } from "../../types/common"
import { DBReadthrough, DBSavedWork, DBWork } from "../../types/database"

const ReaderContext = createContext<unknown>(null)

export default function ReaderManager(props: {} & PropsWithChildren) {
	const { workId, chapterId } = useGlobalSearchParams<{
		workId: string
		chapterId: string
	}>()

	const localWork = useLocalWork(parseInt(workId))
	const read = useRead(parseInt(workId), 0)

	const loadingLocal = useLoadingHandler([
		localWork.dataHandle.status,
		read.dataHandle.status,
	])

	const [currentChapter, setCurrentChapter] = useState(0)
	const [currentProgress, setCurrentProgress] = useState(0)

	useEffect(() => {
		router.setParams({
			chapterId: currentChapterRef.current.toString(),
		})
		// router.replace(`/work/${workId}/chapter/${currentChapterRef.current}`)
	}, [currentChapter])

	// when using state in startTracking and stopTraking it uses default values instead of updated, so I convert them to ref here
	const currentChapterRef = useRef(0)
	const currentProgressRef = useRef(0)

	useEffect(() => {
		currentProgressRef.current = currentProgress
	}, [currentProgress])

	useEffect(() => {
		currentChapterRef.current = currentChapter
	}, [currentChapter])

	const [isProgressFromLocal, setIsProgressFromLocal] = useState(false)

	// loads data on opening
	useEffect(() => {
		if (noData(read.dataHandle)) return

		// console.log("chapterId", chapterId)

		if (read.dataHandle.data !== null && chapterId === "first") {
			// setCurrentChapter(read.dataHandle.data.currentChapter)
			// setCurrentProgress(read.dataHandle.data.currentChapterPosition)
			// setIsProgressFromLocal(true)
		}
	}, [read.dataHandle.status])

	const forWorkLocal = useLoadingHandler([
		read.dataHandle.status,
		localWork.savedWorkDataHandle.status,
	])

	const [workFetchUpdater, workFetchUpdate] = useUpdater()
	const fetchCounter = useRef(0)

	const work = useLoading(async () => {
		if (localWork.savedWorkDataHandle.data !== null) {
			fetchCounter.current += 1
			return workScraperNew(
				parseInt(workId),
				(() => {
					const chapterList =
						localWork.savedWorkDataHandle.data.chaptersList
					if (chapterList.length > 0)
						return chapterList[currentChapter].id

					return "first"
				})()
			)
		}
		if (noData(read.dataHandle) || noData(localWork.savedWorkDataHandle)) {
			fetchCounter.current += 1
			return workScraperNew(
				parseInt(workId),
				chapterId == "first" ? chapterId : parseInt(chapterId)
			)
		}
		return null
	}, [workFetchUpdater])

	useEffect(() => {
		if (work.data?.chapters[0].chapter === 0) return

		if (
			work.status == "success" &&
			work.data?.chapters[0].chapter !== currentChapter + 1
		) {
			workFetchUpdate()
		}
	}, [forWorkLocal, isProgressFromLocal, currentChapter])

	// in case some bug throws into work loading into fetch-looping, this will break it
	useEffect(() => {
		if (fetchCounter.current > 3)
			throw new Error("too many requests, wait before trying again")

		if (fetchCounter.current > 0) {
			const resetTimeout = setTimeout(() => {
				fetchCounter.current = 0
			}, 1000)
			return () => {
				clearTimeout(resetTimeout)
			}
		}
	}, [work.status])

	const managerLoading = useLoadingHandler([
		localWork.status,
		read.dataHandle.status,
		work.status,
	])

	useEffect(() => {
		if (work.status == "failed") throw work.error
		if (dataLoaded(work) && work.data !== null) {
			localWork.saveLocalWork(work.data)
		}
	}, [work.status, managerLoading])

	const context = {
		status: managerLoading,
		work: parseDataHandle(work),
		chaptersList: {
			data: localWork.savedWorkDataHandle.data?.chaptersList,
			error: localWork.savedWorkDataHandle.error,
			status: localWork.status,
		},
		meta: {
			data: localWork.savedWorkDataHandle.data,
			error: localWork.savedWorkDataHandle.error,
			status: localWork.status,
		},
		currentChapter: {
			...localWork.savedWorkDataHandle.data?.chaptersList[currentChapter],
			chapter: currentChapter,
		},
		tracker: read.dataHandle,
		local: localWork.dataHandle,
		localStatus: loadingLocal,
		setSavedWork: (saved: boolean) => {
			localWork.updateLocalWork({
				isSaved: saved,
			})
		},
		startTracking: () => {
			// console.log(
			// 	"startTracking",
			// 	currentProgressRef.current,
			// 	currentProgress
			// )
			read.startTracking(
				currentChapterRef.current,
				currentProgressRef.current
			)
		},
		endTraking: () => {
			// console.log("endTracking", currentProgressRef.current)
			read.endTracking(currentProgressRef.current)
		},
		changeChapter: (chapter: number) => {
			// startTraking fires before currentChapter updates, so it takes wrong chapter, with setting ref first it works

			const progress = read.getChapterProgress(chapter)
			// console.log("changeChapter progress", progress)
			currentProgressRef.current = progress
			setCurrentProgress(progress)

			currentChapterRef.current = chapter
			setCurrentChapter(chapter)

			router.back()
		},
		setChapter: (chapter: number) => {
			context.endTraking()

			const progress = read.getChapterProgress(chapter)
			// console.log("setChapter progress", chapter, progress)
			currentProgressRef.current = progress
			setCurrentProgress(progress)

			currentChapterRef.current = chapter
			setCurrentChapter(chapter)
		},
		setProgress: setCurrentProgress,
		getProgress: currentProgress,
	}

	return (
		<>
			<ReaderContext.Provider value={context}>
				{props.children}
			</ReaderContext.Provider>
		</>
	)
}

interface ReaderManagerContext {
	status: LoadingStatusText
	work: DataHandle<AO3Work>
	chaptersList: DataHandle<DBSavedWork["chaptersList"]>
	meta: DataHandle<DBSavedWork>
	currentChapter: DBSavedWork["chaptersList"][0] & { chapter: number }
	tracker: DataHandle<DBReadthrough | null>
	local: DataHandle<DBWork>
	localStatus: LoadingStatusText
	setSavedWork: (saved: boolean) => void
	setChapter: (chapter: number) => void
	setProgress: (progress: number) => void
	changeChapter: (chapter: number) => void
	startTracking: () => void
	endTraking: () => void
	getProgress: number
}

function useReaderContext() {
	return useContext(ReaderContext) as ReaderManagerContext
}
