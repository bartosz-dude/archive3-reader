import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react"
import useRead from "../../services/saver/hooks/useRead"
import { useGlobalSearchParams } from "expo-router"
import useLocalWork from "../../services/saver/hooks/useLocalWork"
import useLoading from "../../hooks/useLoading"
import useLoadingHandler from "../../hooks/useLoadingHandler"
import { workScraperNew } from "../../services/ao3/scraper/work"
import useUpdater from "../../hooks/useUpdater"
import useStatus from "../../hooks/useStatus"
import { LoadingStatusText } from "../../types/common"
import { AO3Work } from "../../services/ao3/types/work"
import { DBSavedWork } from "../../types/database"

const ReaderContext = createContext<unknown>(null)

export default function ReaderManagerNew(props: {} & PropsWithChildren) {
	const { workId, chapterId } = useGlobalSearchParams<{
		workId: string
		chapterId: string
	}>()

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
			return workScraperNew(parseInt(workId), "first")
		}

		const chapters = localWork.getChaptersList()
		if (chapters === null) return null

		// console.log("work fetch 2", currentChapter)

		return workScraperNew(parseInt(workId), chapters[currentChapter].id)
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

	const workLoaded = useLoadingHandler([
		read.dataHandle.status,
		chapterLoaded,
	])

	const meta: Partial<DBSavedWork> = {
		authors:
			work.data?.meta.authors ??
			localWork.savedWorkDataHandle.data?.authors,
		chaptersList:
			work.data?.chapterslist ??
			localWork.savedWorkDataHandle.data?.chaptersList,
		language:
			work.data?.meta.language ??
			localWork.savedWorkDataHandle.data?.language,
		stats:
			work.data?.meta.stats ?? localWork.savedWorkDataHandle.data?.stats,
		summary:
			work.data?.meta.summary ??
			localWork.savedWorkDataHandle.data?.summary,
		tags: work.data?.meta.tags ?? localWork.savedWorkDataHandle.data?.tags,
		title:
			work.data?.meta.title ?? localWork.savedWorkDataHandle.data?.title,
		workId:
			work.data?.meta.id ?? localWork.savedWorkDataHandle.data?.workId,
	}

	const currentChapterContext = {
		id:
			work.data?.chapterslist[currentChapter]?.id ??
			localWork.savedWorkDataHandle.data?.chaptersList[currentChapter]
				?.id,
		title:
			work.data?.chapterslist[currentChapter]?.title ??
			localWork.savedWorkDataHandle.data?.chaptersList[currentChapter]
				?.title,
		chapter: currentChapter,
	}

	const [metaStatus, setMetaStatus] = useStatus()

	useEffect(() => {
		if (meta.summary !== undefined) setMetaStatus("success")
	}),
		[work.status, localWork.savedWorkDataHandle.status]

	function setProgress(progress: number) {
		setCurrentProgress(progress)
		currentProgressRef.current = progress
	}

	function startTracking() {
		read.startTracking(currentChapter, currentProgressRef.current)
	}

	function endTracking() {
		read.endTracking(currentProgressRef.current)
	}

	const context = {
		workStatus: workLoaded,
		work: work.data,
		metaStatus: metaStatus,
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
	chapters: () =>
		| {
				completed: boolean
				id: number
				title: string
				chapter: number
		  }[]
		| null
	currentChapter: Partial<{
		id: number
		title: string
		chapter: number
	}>
	currentProgress: number
	isWorkSaved: boolean | undefined
	saveWork: () => void
	setChapter: (chapter: number) => void
	setProgress: (progress: number) => void
	startTracking: () => void
	endTracking: () => void
}

export function useReaderManager() {
	return useContext(ReaderContext) as ReaderManagerContext
}
