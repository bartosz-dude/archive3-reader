import {
	Stack,
	router,
	useGlobalSearchParams,
	useNavigation,
} from "expo-router"
import { createContext, useContext, useEffect, useState } from "react"
import useLoading from "../../../hooks/useLoading"
import { workScraperNew } from "../../../services/ao3/scraper/work"
import { AO3Work } from "../../../services/ao3/types/work"
import useWork from "../../../services/saver/hooks/useWork"
import { LoadingStatusText } from "../../../types/common"
import useReadthrough from "../../../services/saver/hooks/useReadthrough"
import useLoadingHandler from "../../../hooks/useLoadingHandler"
import ReaderManager from "../../../components/reader/ReaderManager"

export default function WorkReaderLayoutNew() {
	return (
		<>
			{/* <WorkContext.Provider value={context}> */}
			<ReaderManager>
				{/* <Slot /> */}
				<Stack
					screenOptions={{
						animation: "none",
					}}
				>
					<Stack.Screen
						name="chapter"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="chapterSelect"
						options={{
							headerShown: false,
							presentation: "modal",
						}}
					/>
				</Stack>
			</ReaderManager>
			{/* </WorkContext.Provider> */}
		</>
	)
}

/**
 * Mess of an api, need to rework in the future
 */

const WorkContext = createContext<unknown>(null)

function WorkReaderLayout() {
	const { workId, chapterId } = useGlobalSearchParams<{
		workId: string
		chapterId: string
	}>()

	const [currentChapter, setCurrentChapter] = useState(0)
	const [currentProgress, setCurrentProgress] = useState(0)
	const [chaptersList, setChaptersList] = useState<AO3Work["chapterslist"]>()
	const [meta, setMeta] = useState<AO3Work["meta"]>()

	const work = useLoading(
		() =>
			workScraperNew(
				parseInt(workId),
				chapterId == "first" ? chapterId : parseInt(chapterId)
			),
		[currentChapter]
	)

	const localWork = useWork(work)
	const readthrough = useReadthrough(work, 0)

	const loading = useLoadingHandler([
		work.status,
		localWork.handle.status,
		readthrough.handle.status,
	])

	// useEffect(() => {
	// 	console.log("api status", loading)
	// }, [loading])
	// const workDb = useLoading(() => getWork(parseInt(workId)))
	// const readDb = useLoading(() => getReadthrough(parseInt(workId), 0))
	// const savedWorkDb = useLoading(() => getSavedWork(parseInt(workId)))

	const chapter = () => work.data?.chapters[currentChapter]
	const currentChapterFromList = () => ({
		status: chaptersList ? "loaded" : work.status,
		data: chaptersList ? chaptersList[currentChapter] : null,
	})
	const currentMeta = () => ({
		status: meta ? "loaded" : work.status,
		data: meta ? meta : null,
	})

	useEffect(() => {
		if (work.status == "success" && work.data) {
			setChaptersList(work.data.chapterslist)
			setMeta(work.data.meta)
			// setCurrentChapter(work.data.chapters[0].chapter - 1)
		}
	}, [work])

	// useEffect(() => {
	// 	console.log("saved", localWork.data?.isSaved)
	// }, [localWork.handle.status])

	function endReadingSession() {
		// console.log("endReadingSession", currentProgress)
		readthrough.endSession(currentProgress)
	}

	const context = {
		status: loading,
		nextChapter: () => {
			const nextChapterId = work.data?.chapterslist[currentChapter + 1].id
			if (nextChapterId) {
				router.replace(`/work/${workId}/chapter/${nextChapterId}`)
				setCurrentChapter((prev) => prev + 1)
			}
		},
		isNextChapter: () =>
			work.data?.chapterslist[currentChapter + 1] ? true : false,
		previousChapter: () => {
			const previousChapterId =
				work.data?.chapterslist[currentChapter - 1].id
			if (previousChapterId) {
				router.replace(`/work/${workId}/chapter/${previousChapterId}`)
				setCurrentChapter((prev) => prev - 1)
			}
		},
		isPreviousChapter: () =>
			work.data?.chapterslist[currentChapter - 1] ? true : false,
		setChapter: (chapter: number) => {
			const chapterId = work.data?.chapterslist[chapter].id
			// console.log("setChapter", chapterId)
			if (chapterId) {
				// router.
				router.replace(`/work/${workId}/chapter/${chapterId}`)
				// router.setParams({
				// 	chapterId: chapterId.toString(),
				// })
				setCurrentChapter(chapter)
				work.reload()
				// console.log("navigate")
			}
		},
		currentChapterFromList: () => currentChapterFromList(),
		currentMeta: () => currentMeta(),
		currentChapter: currentChapter,
		chapterList: chaptersList,
		work: work,
		isSaved: localWork.data?.isSaved,
		setSaved: (isSaved: boolean) => {
			// console.log("setSaved", meta, chaptersList)
			// if (meta && chaptersList)
			localWork.update({
				isSaved: isSaved,
			})
		},
		readthrough: readthrough,
		isSessionActive: () => readthrough.isSessionActive,
		currentProgress: currentProgress,
		setCurrentProgress,
		startingReadingPosition: readthrough.data?.currentChapterPosition,
		startReadingSession() {
			// console.log("startReadingSession")
			readthrough.startSession(currentChapter, currentProgress)
		},
		endReadingSession,
	}

	// useEffect(() => {
	// 	console.log("progress", currentProgress)
	// }, [currentProgress])

	useEffect(() => {
		// console.log("readthrough", readthrough, currentChapter, chapterId)
		if (readthrough.data !== null) {
			if (
				readthrough.data.currentChapter != currentChapter &&
				chapterId == "first"
			) {
				// console.log("currentChapter", readthrough.data.currentChapter)
				context.setChapter(readthrough.data.currentChapter)
				setCurrentProgress(readthrough.data.currentChapterPosition)
			}
		}
	}, [readthrough.handle.status])

	// const nav = useNavigation()

	// nav.addListener("beforeRemove", (e) => {
	// 	if (context.isSessionActive) context.startReadingSession()
	// })

	return (
		<>
			<WorkContext.Provider value={context}>
				<ReaderManager>
					{/* <Slot /> */}
					<Stack
						screenOptions={{
							animation: "none",
						}}
					>
						<Stack.Screen
							name="chapter"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="chapterSelect"
							options={{
								headerShown: false,
								presentation: "modal",
							}}
						/>
					</Stack>
				</ReaderManager>
			</WorkContext.Provider>
		</>
	)
}

export function useWorkContext() {
	return useContext(WorkContext) as {
		status: LoadingStatusText
		nextChapter: () => void
		isNextChapter: () => boolean
		previousChapter: () => void
		isPreviousChapter: () => boolean
		setChapter: (chapter: number) => void
		currentChapterFromList: () => {
			status: LoadingStatusText
			data: {
				id: number
				title: string
			} | null
		}
		currentMeta: () => {
			status: LoadingStatusText
			data: AO3Work["meta"] | null
		}
		currentChapter: number
		chapterList:
			| {
					id: number
					title: string
			  }[]
			| undefined
		work: {
			data: AO3Work | null
			error: any
			status: LoadingStatusText
			reload: () => void
		}
		isSaved: boolean | undefined
		setSaved: (isSaved: boolean) => void
		readthrough: ReturnType<typeof useReadthrough>
		isSessionActive: () => boolean
		currentProgress: number
		setCurrentProgress: (progress: number) => void
		startingReadingPosition: number | undefined
		startReadingSession: () => void
		endReadingSession: () => void
	}
}
