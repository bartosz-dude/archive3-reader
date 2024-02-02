import { Link, Slot, router, useLocalSearchParams } from "expo-router"
import { createContext, useContext, useEffect, useState } from "react"
import { Text, View } from "react-native"
import useLoading from "../../../../hooks/useLoading"
import { workScraperNew } from "../../../../services/ao3/scraper/work"
import getReadthrough from "../../../../services/saver/database/getReadthrough"
import getWork from "../../../../services/saver/database/getWork"
import updateReadthrough from "../../../../services/saver/database/updateReadthrough"
import updateWork from "../../../../services/saver/database/updateWork"
import IconBtn from "../../../../components/common/IconBtn"
import useStyle from "../../../../hooks/useStyle"
import Header from "../../../../components/common/Header"
import { AO3Work } from "../../../../services/ao3/types/work"
import Loaded from "../../../../components/common/Loaded"
import { useWorkContext } from "../_layout"

export default function ChapterReaderLayout() {
	const work = useWorkContext()

	const style = useStyle({
		titleColumn: {
			display: "flex",
			flexDirection: "column",
			// width: "80%",
			flexShrink: 1,
		},
		titleText: {
			color: "white",
		},
		chapterText: {
			color: "white",
		},
	})

	useEffect(() => {
		console.log("currentMeta", work.currentMeta())
	}, [work.currentMeta().status])

	return (
		<>
			<Header>
				<View style={style.titleColumn}>
					{/* work title */}
					<Loaded
						isLoading={work.currentMeta().status}
						loading={<Text></Text>}
					>
						<Text
							style={style.titleText}
							ellipsizeMode="tail"
							numberOfLines={1}
						>
							{work.currentMeta().data?.title}
						</Text>
					</Loaded>
					{/* chapter name */}
					<Loaded
						isLoading={work.currentChapterFromList().status}
						loading={<Text></Text>}
					>
						<Link
							href={"../chapterSelect"}
							style={style.titleText}
							ellipsizeMode="tail"
							numberOfLines={1}
						>
							{(() => {
								const chapter =
									work.currentChapterFromList().data
								const maxChapters =
									work.currentMeta().data?.stats.maxChapters

								if (
									chapter?.title &&
									(maxChapters === null ||
										(maxChapters && maxChapters > 1))
								) {
									return `Chapter ${
										work.currentChapter + 1
									}: ${chapter.title}`
								}

								if (
									maxChapters === null ||
									(maxChapters && maxChapters > 1)
								) {
									return `Chapter ${work.currentChapter + 1}`
								}

								if (chapter?.title) return `${chapter.title}`
							})()}
						</Link>
					</Loaded>
				</View>
				{/* save work btn */}
				<View>
					<Loaded isLoading={work.currentMeta().status}>
						<IconBtn
							name={
								work.isSaved ? "bookmark" : "bookmark-outline"
							}
							size={32}
							iconStyle={{ color: "white" }}
							onPress={() => {
								// if (workDb.data)
								// 	updateWork({
								// 		workId: workDb.data.workId,
								// 		availableChapters:
								// 			workDb.data.availableChapters,
								// 		isOffline: workDb.data.isOffline,
								// 		isSaved: !workDb.data.isSaved,
								// 		lastUpdate: workDb.data.lastUpdate,
								// 		totalChapters:
								// 			workDb.data.totalChapters,
								// 	}).then(() => workDb.reload())
							}}
						/>
					</Loaded>
				</View>
			</Header>
			<Slot />
		</>
	)
}
