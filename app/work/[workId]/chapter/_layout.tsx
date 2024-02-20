import {
	Link,
	Slot,
	router,
	useLocalSearchParams,
	useNavigation,
} from "expo-router"
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
import { useReaderContext } from "../../../../components/reader/ReaderManager"
import LoadingIndicator from "../../../../components/common/LoadingIndicator"

export default function ChapterReaderLayout() {
	const reader = useReaderContext()

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

	return (
		<>
			<Loaded
				isLoading={reader.meta.status}
				loading={
					<>
						<Header>
							<View>
								<Text style={style.titleText}></Text>
								<Text style={style.titleText}></Text>
							</View>
						</Header>
					</>
				}
			>
				<Header>
					<View style={style.titleColumn}>
						{/* work title */}
						<Text
							style={style.titleText}
							ellipsizeMode="tail"
							numberOfLines={1}
						>
							{reader.meta.data?.title}
						</Text>

						<Link
							href={"../chapterSelect"}
							style={style.titleText}
							ellipsizeMode="tail"
							numberOfLines={1}
							onPress={() => {
								// work.endReadingSession()
							}}
							disabled={(() => {
								const maxChapters =
									reader.meta.data?.stats.maxChapters

								return maxChapters && maxChapters == 1
									? true
									: false
							})()}
						>
							{(() => {
								const chapter = reader.currentChapter
								const maxChapters =
									reader.meta.data?.stats.maxChapters

								const title = chapter?.title ?? ""
								// work.work.data?.chapters[0].title

								if (title == `Chapter ${chapter.chapter + 1}`)
									return title

								if (
									title &&
									(maxChapters === null ||
										(maxChapters && maxChapters > 1))
								) {
									return `Chapter ${
										chapter.chapter + 1
									}: ${title}`
								}

								if (
									maxChapters === null ||
									(maxChapters && maxChapters > 1)
								) {
									return `Chapter ${chapter.chapter + 1}`
								}

								if (chapter?.title) return `${title}`
							})()}
						</Link>
					</View>
					{/* save work btn */}
					<View>
						<IconBtn
							name={
								reader.local.data?.isSaved
									? "bookmark"
									: "bookmark-outline"
							}
							size={32}
							iconStyle={{ color: "white" }}
							onPress={() => {
								reader.setSavedWork(!reader.local.data?.isSaved)
							}}
						/>
					</View>
				</Header>
			</Loaded>
			<Slot />
		</>
	)
}
