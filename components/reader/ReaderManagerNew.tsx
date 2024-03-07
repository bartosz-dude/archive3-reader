import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react"
import useRead from "../../services/saver/hooks/useRead"
import { useGlobalSearchParams, useNavigation, usePathname } from "expo-router"
import useLocalWork from "../../services/saver/hooks/useLocalWork"
import useLoading from "../../hooks/useLoading"
import useLoadingHandler from "../../hooks/useLoadingHandler"
import { workScraperNew } from "../../services/ao3/scraper/work"
import useUpdater from "../../hooks/useUpdater"
import useStatus from "../../hooks/useStatus"
import { LoadingStatusText, DataHandle } from "../../types/common"
import { AO3Work } from "../../services/ao3/types/work"
import { DBSavedWork } from "../../types/database"
import { AppState, AppStateStatus } from "react-native"

const ReaderContext = createContext<unknown>(null)

export default function ReaderManagerNew(props: {} & PropsWithChildren) {
	const { workId, chapterId } = useGlobalSearchParams<{
		workId: string
		chapterId: string
	}>()

	const pathname = usePathname()

	const [isStartup, setIsStartup] = useState(true)
	const [currentChapter, setCurrentChapter] = useState(0)
	const [currentProgress, setCurrentProgress] = useState(0)
	const currentProgressRef = useRef(0)

	useEffect(() => {}, [currentProgress])

	const read = useRead(parseInt(workId), 0)

	useEffect(() => {
		if (!isStartup) return
		if (read.dataHandle.status != "success") return

		if (read.dataHandle.data !== null) {
			setCurrentChapter(read.dataHandle.data.currentChapter)
			setCurrentProgress(read.dataHandle.data.currentChapterPosition)
			currentProgressRef.current =
				read.dataHandle.data.currentChapterPosition
			setIsStartup(false)
		}
	}, [read.dataHandle.status])

	const [fetchFirstChapter, setFetchFirstChapter] = useState(false)

	const localWork = useLocalWork(parseInt(workId))

	// when no savedWork, fetch meta
	useEffect(() => {
		if (localWork.savedWorkDataHandle.status != "success") return

		if (localWork.savedWorkDataHandle.data === null) {
			setFetchFirstChapter(true)
		} else {
			setFetchFirstChapter(false)
		}
	}, [localWork.savedWorkDataHandle.status])

	const localLoader = useLoadingHandler([
		read.dataHandle.status,
		localWork.savedWorkDataHandle.status,
	])

	const [workUpdater, workUpdate] = useUpdater()
	const work = useLoading(async () => {
		if (localLoader != "success") return null

		if (fetchFirstChapter) {
			// console.log("work fetch 1")
			return workScraperNew(parseInt(workId), "first")
		}

		const chapters = localWork.getChaptersList()
		if (chapters === null) return null

		// console.log(
		// 	"work fetch 2",
		// 	currentChapter,
		// 	chapters,
		// 	chapters[currentChapter]
		// )

		return workScraperNew(
			parseInt(workId),
			chapters[currentChapter] ? chapters[currentChapter].id : "first" // edge case for single chapter works
		)
	}, [workUpdater])

	// limits fetching to only when chapter isn't matching currently fetched one
	useEffect(() => {
		if (work.status == "loading") return
		if (localLoader != "success") return
		// to works with one chapter I have assigned id -1 to that chapter and it's chapter value is 0
		// this is an edge case
		if (work.data?.chapters[0].id === -1) return

		if (work.data?.chapters[0].chapter !== currentChapter + 1) workUpdate()
	}, [localLoader, currentChapter])

	useEffect(() => {
		if (work.status != "success") return
		if (work.data === null) return

		localWork.saveLocalWork(work.data)
	}, [work.status])

	const [chapterLoaded, setChapterLoaded] = useStatus()

	useEffect(() => {
		if (work.status == "loading") setChapterLoaded("loading")

		if (
			work.data?.chapters[0].chapter === currentChapter + 1 ||
			work.data?.chapters[0].id == -1
		)
			setChapterLoaded("success")
	}, [work.status])

	const workLoaded = useLoadingHandler([read.status, chapterLoaded])

	const meta: Partial<DBSavedWork> = {
		authors: work.data?.meta.authors ?? localWork.data.savedWork?.authors,
		chaptersList:
			work.data?.chapterslist ?? localWork.data.savedWork?.chaptersList,
		language:
			work.data?.meta.language ?? localWork.data.savedWork?.language,
		stats: work.data?.meta.stats ?? localWork.data.savedWork?.stats,
		summary: work.data?.meta.summary ?? localWork.data.savedWork?.summary,
		tags: work.data?.meta.tags ?? localWork.data.savedWork?.tags,
		title: work.data?.meta.title ?? localWork.data.savedWork?.title,
		workId: work.data?.meta.id ?? localWork.data.savedWork?.workId,
	}

	const currentChapterContext = {
		id:
			work.data?.chapterslist[currentChapter]?.id ??
			localWork.data.savedWork?.chaptersList[currentChapter]?.id,
		title:
			work.data?.chapterslist[currentChapter]?.title ??
			localWork.data.savedWork?.chaptersList[currentChapter]?.title,
		chapter: currentChapter,
		completed: (read.data?.readChapters ?? []).includes(currentChapter),
	}

	const [metaStatus, setMetaStatus] = useStatus()

	useEffect(() => {
		if (meta.summary !== undefined) setMetaStatus("success")
	}),
		[work.status, localWork.status]

	function setProgress(progress: number) {
		setCurrentProgress(progress)
		currentProgressRef.current = progress
	}

	function startTracking() {
		// console.log("startTracking")
		read.startTracking(currentChapter, currentProgressRef.current)
	}

	function endTracking() {
		// console.log("endTracking")
		read.endTracking(currentProgressRef.current)
	}

	// updates tracking when app is minimized and maximized
	useEffect(() => {
		if (pathname.includes("chapterSelect")) return

		const backgroundHandler = AppState.addEventListener("change", (e) => {
			if (e == "background" || e == "inactive") {
				endTracking()
			}

			if (e == "active") {
				startTracking()
			}
		})

		return () => backgroundHandler.remove()
	}, [])

	const [isChapterCompleted, setIsChapterCompleted] = useState(
		(read.data?.readChapters ?? []).includes(currentChapter)
	)

	useEffect(() => {
		setIsChapterCompleted(false)
		// if (read.dataHandle.data === null) return

		setIsChapterCompleted(
			(read.data?.readChapters ?? []).includes(currentChapter)
		)
	}, [currentChapter])

	useEffect(() => {
		if (
			currentProgress == 1 &&
			!read.dataHandle.data?.readChapters.includes(currentChapter)
		) {
			read.addReadChapter()
			setIsChapterCompleted(true)
		}
	}, [currentProgress])

	const context = {
		workStatus: workLoaded,
		work: work.data,
		metaStatus: metaStatus,
		localWorkStatus: localWork.status,
		meta: meta,
		chapters: () => {
			const chapterList = localWork.getChaptersList()
			if (chapterList === null) return null
			return chapterList?.map((v) => {
				return {
					...v,
					completed: (
						read.dataHandle.data?.readChapters ?? []
					).includes(v.chapter),
				}
			})
		},
		currentChapter: currentChapterContext,
		currentProgress: currentProgress,
		isWorkSaved: localWork.dataHandle.data?.isSaved,
		isChapterCompleted: isChapterCompleted,
		refetch: () => {
			workUpdate()
		},
		isSingleChapter: () =>
			(localWork.data?.savedWork?.stats?.maxChapters ?? 2) === 1,
		saveWork: () => {
			localWork.updateLocalWork({
				isSaved: !localWork.dataHandle.data?.isSaved,
			})
		},
		setChapter: (chapter: number) => {
			endTracking()
			setCurrentChapter(chapter)
			const savedProgress = read.getChapterProgress(chapter)
			setCurrentProgress(savedProgress)
			currentProgressRef.current = savedProgress
		},
		clearChapterProgress: (chapter: number) => {
			read.clearChapterProgress(chapter)
			setProgress(0)
			setIsChapterCompleted(false)
			workUpdate()
		},
		markChapterAsRead: () => {
			read.markChapterAsRead()
			setIsChapterCompleted(true)
		},
		markChapterAsUnread: () => {
			read.markChapterAsUnread()
			setIsChapterCompleted(false)
		},
		setProgress,
		startTracking,
		endTracking,
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
	workStatus: LoadingStatusText
	work: AO3Work | null
	metaStatus: LoadingStatusText
	meta: Partial<DBSavedWork>
	localWorkStatus: LoadingStatusText
	chapters: () =>
		| {
				completed: boolean
				id: number
				title: string
				chapter: number
		  }[]
		| null
	currentChapter: Partial<{
		completed: boolean
		id: number
		title: string
		chapter: number
	}>
	currentProgress: number
	isWorkSaved: boolean | undefined
	isChapterCompleted: boolean
	refetch: () => void
	isSingleChapter: () => boolean
	clearChapterProgress: (chapter: number) => void
	saveWork: () => void
	setChapter: (chapter: number) => void
	setProgress: (progress: number) => void
	startTracking: () => void
	endTracking: () => void
	markChapterAsRead: () => void
	markChapterAsUnread: () => void
}

export function useReaderManager() {
	return useContext(ReaderContext) as ReaderManagerContext
}
