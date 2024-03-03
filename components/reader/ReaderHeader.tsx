import { Link, router } from "expo-router"
import { Share, Text, View } from "react-native"
import useStyle from "../../hooks/useStyle"
import { useAppTheme } from "../ThemeManager"
import AppHeader from "../common/AppHeader"
import IconBtn from "../common/IconBtn"
import Loaded from "../common/Loaded"
import { useReaderManager } from "./ReaderManagerNew"
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
} from "react-native-popup-menu"
import workUrl from "../../services/ao3/tools/workUrl"
import Show from "../common/Show"
import { MaterialIcons } from "@expo/vector-icons"

export default function ReaderHeader() {
	const theme = useAppTheme()
	const readerNew = useReaderManager()
	const style = useStyle({
		titleColumn: {
			display: "flex",
			flexDirection: "column",
			width: "80%",
			flexShrink: 1,
		},
		titleText: {
			color: theme.header.font,
		},
		chapterContainer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			maxWidth: "100%",
			marginRight: 10,
		},
		chapterText: {},
	})

	return (
		<>
			<AppHeader>
				<View style={style.titleColumn}>
					{/* work title */}
					<Text
						style={style.titleText}
						ellipsizeMode="tail"
						numberOfLines={1}
					>
						{readerNew.meta?.title}
					</Text>
					<View style={style.chapterContainer}>
						<Link
							style={style.chapterText}
							href={"../chapterSelect"}
							numberOfLines={1}
							disabled={(() => {
								const maxChapters =
									readerNew.meta?.stats?.maxChapters

								return maxChapters && maxChapters == 1
									? true
									: false
							})()}
						>
							{/* <View style={style.chapterText}> */}
							<Text
								ellipsizeMode="tail"
								numberOfLines={1}
								style={{
									color: theme.header.font,
								}}
							>
								{(() => {
									const chapter = readerNew.currentChapter
									const maxChapters =
										readerNew.meta?.stats?.maxChapters

									const title = readerNew.currentChapter.title
									// work.work.data?.chapters[0].title

									if (
										title ==
										`Chapter ${
											(chapter.chapter ?? -70) + 1
										}`
									)
										return title

									if (
										title &&
										(maxChapters === null ||
											(maxChapters && maxChapters > 1))
									) {
										return `Chapter ${
											(chapter.chapter ?? -70) + 1
										}: ${title}`
									}

									if (
										maxChapters === null ||
										(maxChapters && maxChapters > 1)
									) {
										return `Chapter ${
											(chapter.chapter ?? -70) + 1
										}`
									}

									if (chapter?.title) return `${title}`
								})()}
							</Text>

							{/* </View> */}
						</Link>
						<Show when={readerNew.isChapterCompleted}>
							<MaterialIcons
								name="done"
								size={16}
								style={{
									marginLeft: 5,
									color: theme.header.font,
								}}
							/>
						</Show>
					</View>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						gap: 10,
					}}
				>
					{/* save work btn */}
					<View>
						<IconBtn
							name={
								readerNew.isWorkSaved
									? "bookmark"
									: "bookmark-outline"
							}
							size={32}
							iconStyle={{ color: "white" }}
							onPress={() => {
								readerNew.saveWork()
							}}
						/>
					</View>

					{/* <IconBtn
						name="dots-vertical"
						size={32}
						iconStyle={{
							color: theme.header.font,
						}}
					/> */}
					<Menu
						// ref={menu}
						name="work-options"
					>
						<MenuTrigger
							customStyles={{
								TriggerTouchableComponent: IconBtn,
								triggerTouchable: {
									name: "dots-vertical",
									size: 32,
									iconStyle: { color: theme.header.font },
								},
							}}
						></MenuTrigger>
						<MenuOptions>
							<MenuOption
								text="Share"
								onSelect={() => {
									if (readerNew.work?.meta.id === undefined)
										return

									Share.share({
										message: workUrl(
											readerNew.work?.meta.id,
											(() => {
												const currentChapter =
													readerNew.currentChapter
												return currentChapter.id
													? currentChapter.id.toString()
													: "first"
											})()
										).href,
										url: workUrl(
											readerNew.work?.meta.id,
											(() => {
												const currentChapter =
													readerNew.currentChapter
												return currentChapter.id
													? currentChapter.id.toString()
													: "first"
											})()
										).href,
									})
								}}
							/>
							<MenuOption
								text="Options"
								onSelect={() => {
									router.push("../options")
								}}
							/>
						</MenuOptions>
					</Menu>
				</View>
			</AppHeader>
		</>
	)
}
