import {
	Slot,
	Stack,
	router,
	useGlobalSearchParams,
	useLocalSearchParams,
	useNavigation,
	usePathname,
} from "expo-router"
import { createContext, useContext, useEffect, useState } from "react"
import { Text, View } from "react-native"
import IconBtn from "../../../components/common/IconBtn"
import Loaded from "../../../components/common/Loaded"
import useLoading from "../../../hooks/useLoading"
import useStyle from "../../../hooks/useStyle"
import { workScraperNew } from "../../../services/ao3/scraper/work"
import { AO3Work } from "../../../services/ao3/types/work"
import getReadthrough from "../../../services/saver/database/getReadthrough"
import getWork from "../../../services/saver/database/getWork"
import updateReadthrough from "../../../services/saver/database/updateReadthrough"
import updateWork from "../../../services/saver/database/updateWork"

const WorkContext = createContext<unknown>(null)

export default function WorkReaderLayout() {
	const { workId, chapterId } = useGlobalSearchParams<{
		workId: string
		chapterId: string
	}>()

	const [currentChapter, setCurrentChapter] = useState(0)
	const [chaptersList, setChaptersList] = useState<AO3Work["chapterslist"]>()
	const [meta, setMeta] = useState<AO3Work["meta"]>()

	const work = useLoading(
		() => workScraperNew(parseInt(workId), chapterId),
		[currentChapter]
	)

	const workDb = useLoading(() => getWork(parseInt(workId)))
	const readDb = useLoading(() => getReadthrough(parseInt(workId), 0))

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
		if (work.status == "loaded" && work.data) {
			setChaptersList(work.data.chapterslist)
			setMeta(work.data.meta)
			// setCurrentChapter(work.data.chapters[0].chapter - 1)
		}
	}, [work])

	useEffect(() => {
		if (
			workDb.status == "loaded" &&
			workDb.data === null &&
			work.status == "loaded" &&
			!(work.data === null)
		) {
			updateWork({
				workId: parseInt(workId),
				availableChapters: work.data?.meta.stats.chapters,
				isOffline: false,
				isSaved: false,
				lastUpdate: new Date(work.data.meta.stats.updated),
				totalChapters: work.data.meta.stats.maxChapters,
			}).then(() => workDb.reload())
		}
	}, [workDb, work])

	useEffect(() => {
		if (
			readDb.status == "loaded" &&
			readDb.data === null &&
			work.status == "loaded" &&
			!(work.data === null) &&
			workDb.status == "loaded" &&
			!(workDb.data === null)
		) {
			updateReadthrough({
				workId: work.data.meta.id,
				currentChapter: chapter()?.chapter ?? 0,
				currentChapterPosition: 0,
				readthrough: 0,
				datedProgress: [],
				readChapters: [],
			}).then(() => readDb.reload())
		}
	}, [readDb, workDb])

	const context = {
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
			console.log("setChapter", chapterId)
			if (chapterId) {
				// router.
				router.replace(`/work/${workId}/chapter/${chapterId}`)
				// router.setParams({
				// 	chapterId: chapterId.toString(),
				// })
				setCurrentChapter(chapter)
				work.reload()
				console.log("navigate")
			}
		},
		currentChapterFromList: () => currentChapterFromList(),
		currentMeta: () => currentMeta(),
		currentChapter: currentChapter,
		chapterList: chaptersList,
		work: work,
		isSaved: workDb.data?.isSaved,
	}

	return (
		<>
			<WorkContext.Provider value={context}>
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
			</WorkContext.Provider>
		</>
	)
}

export function useWorkContext() {
	return useContext(WorkContext) as {
		nextChapter: () => void
		isNextChapter: () => boolean
		previousChapter: () => void
		isPreviousChapter: () => boolean
		setChapter: (chapter: number) => void
		currentChapterFromList: () => {
			status: "loading" | "loaded" | "failed"
			data: {
				id: number
				title: string
			} | null
		}
		currentMeta: () => {
			status: "loading" | "loaded" | "failed"
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
			status: "loaded" | "loading" | "failed"
			reload: () => void
		}
		isSaved: boolean | undefined
	}
}
