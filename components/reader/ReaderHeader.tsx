import { Link } from "expo-router"
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

export default function ReaderHeader() {
	const theme = useAppTheme()
	const readerNew = useReaderManager()
	const style = useStyle({
		titleColumn: {
			display: "flex",
			flexDirection: "column",
			// width: "80%",
			flexShrink: 1,
		},
		titleText: {
			color: theme.header.font,
		},
		chapterText: {
			color: theme.header.font,
		},
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
								readerNew.meta?.stats?.maxChapters

							return maxChapters && maxChapters == 1
								? true
								: false
						})()}
					>
						{(() => {
							const chapter = readerNew.currentChapter
							const maxChapters =
								readerNew.meta?.stats?.maxChapters

							const title = readerNew.currentChapter.title
							// work.work.data?.chapters[0].title

							if (
								title ==
								`Chapter ${(chapter.chapter ?? -70) + 1}`
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
								return `Chapter ${(chapter.chapter ?? -70) + 1}`
							}

							if (chapter?.title) return `${title}`
						})()}
					</Link>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						gap: 10,
					}}
				>
					<Loaded isLoading={readerNew.workStatus}>
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
										if (
											readerNew.work?.meta.id ===
											undefined
										)
											return
										if (
											readerNew.currentChapter.id ===
											undefined
										)
											return
										Share.share({
											message: workUrl(
												readerNew.work?.meta.id,
												readerNew.currentChapter.id.toString()
											).href,
											url: workUrl(
												readerNew.work?.meta.id,
												readerNew.currentChapter.id.toString()
											).href,
										})
									}}
								/>
							</MenuOptions>
						</Menu>
					</Loaded>
				</View>
			</AppHeader>
		</>
	)
}
