import { ErrorBoundaryProps, router, useGlobalSearchParams } from "expo-router"
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
import { workScraperNew } from "../../services/ao3/scraper/work"
import { AO3Work } from "../../services/ao3/types/work"
import useLocalWork from "../../services/saver/hooks/useLocalWork"
import useRead from "../../services/saver/hooks/useRead"
import loaded from "../../tools/loaded"
import noData from "../../tools/noData"
import parseDataHandle from "../../tools/parseDataHandle"
import { DataHandle, LoadingStatusText } from "../../types/common"
import { DBReadthrough, DBSavedWork, DBWork } from "../../types/database"
import { View, Text } from "react-native"

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

	useEffect(() => {
		if (noData(read.dataHandle)) return

		if (read.dataHandle.data !== null) {
			// console.log("loaded from local")
			setCurrentChapter(read.dataHandle.data.currentChapter)
			setCurrentProgress(read.dataHandle.data.currentChapterPosition)
			setIsProgressFromLocal(true)
		}
	}, [read.dataHandle.status])

	const forWorkLocal = useLoadingHandler([
		read.dataHandle.status,
		localWork.savedWorkDataHandle.status,
	])

	const work = useLoading(async () => {
		if (localWork.savedWorkDataHandle.data !== null) {
			return workScraperNew(
				parseInt(workId),
				(() => {
					const chapterList =
						localWork.savedWorkDataHandle.data.chaptersList
					if (chapterList.length > 0)
						return chapterList[currentChapter].id

					return "first"
				})()
				// localWork.savedWorkDataHandle.data.chaptersList[currentChapter]
				// .id ?? "first"
			)
		}
		if (noData(read.dataHandle) || noData(localWork.savedWorkDataHandle))
			return workScraperNew(
				parseInt(workId),
				chapterId == "first" ? chapterId : parseInt(chapterId)
			)

		return null
	}, [forWorkLocal, isProgressFromLocal, currentChapter])

	const managerLoading = useLoadingHandler([
		localWork.status,
		read.dataHandle.status,
		work.status,
	])

	useEffect(() => {
		if (work.status == "failed") throw work.error

		if (loaded(work) && work.data !== null) {
			localWork.saveLocalWork(work.data)
		}
		// console.log("manager", localWork, read, work)
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
			read.startTracking(
				currentChapterRef.current,
				currentProgressRef.current
			)
			// console.log("startTracking")
		},
		endTraking: () => {
			read.endTracking(currentProgressRef.current)
			// console.log("endTracking")
		},
		changeChapter: (chapter: number) => {
			// startTraking fires before currentChapter updates, so it takes wrong chapter, with setting ref first it works
			currentChapterRef.current = chapter
			setCurrentChapter(chapter)

			const progress = read.getChapterProgress(chapter)
			// console.log("chapterProgress", progress)
			setCurrentProgress(progress)

			router.back()
		},
		setChapter: (chapter: number) => {
			currentChapterRef.current = chapter
			setCurrentChapter(chapter)

			const progress = read.getChapterProgress(chapter)
			// console.log("chapterProgress", progress)
			setCurrentProgress(progress)
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

export function useReaderContext() {
	return useContext(ReaderContext) as ReaderManagerContext
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
	return (
		<View>
			<Text>{props.error.message}</Text>
		</View>
	)
}
