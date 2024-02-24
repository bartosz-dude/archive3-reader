import { router } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import { useReducer, useState } from "react"
import { View } from "react-native"
import useStyle from "../../hooks/useStyle"
import workUrl from "../../services/ao3/tools/workUrl"
import { useAppTheme } from "../ThemeManager"
import IconTitleBtn from "../common/IconTitleBtn"
import FormatPanel from "./FormatPanel"
import { useFormatter } from "./ReaderFormatter"
import { useReaderManager } from "./ReaderManagerNew"

type FormatterReducerState = {
	fontFamily: string
	fontSize: number
	fontWeight: 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
	wordSpacing: number
	lineSpacing: number
	paragraphSpacing: number
	horizontalSpacing: number
	background: "white" | "warm"
}

type FormatterReducerAction = {
	payload: {
		fontFamily?: string
		fontSize?: number
		fontWeight?: 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
		wordSpacing?: number
		lineSpacing?: number
		paragraphSpacing?: number
		horizontalSpacing?: number
		background?: "white" | "warm"
	}
}

function reducer<T extends unknown, E extends any>(
	state: FormatterReducerState,
	action: FormatterReducerAction
): FormatterReducerState {
	const newState = {
		...state,
		...action.payload,
	}
	return newState
}

export default function ReaderTabs(props: {}) {
	const theme = useAppTheme()
	const newReader = useReaderManager()
	const formatter = useFormatter()

	const [formatEditorOpened, setFormatEditorOpened] = useState(false)
	const [formatEditorTab, setFormatEditorTab] = useState<"fonts" | "spacing">(
		"fonts"
	)
	const [renderFormat, dispatchRenderFormat] = useReducer(
		reducer,
		formatter.format
	)

	const style = useStyle({
		content: {
			backgroundColor: theme.header.background,
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-evenly",
			paddingHorizontal: 20,
			paddingVertical: 10,
			borderTopColor: theme.header.accent,
			borderTopWidth: 1,
		},
		buttonStyle: {
			width: 60,
		},
		iconStyle: {
			color: theme.header.font,
		},
		textStyle: {
			color: theme.header.font,
			fontSize: 12,
		},
		formatEditor: {
			position: "absolute",
			backgroundColor: theme.header.menuBackground,
			height: 200,
			width: "100%",
		},
		formatEditorTabs: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-evenly",
			paddingVertical: 10,
			backgroundColor: theme.header.background,
		},
		formatEditorContent: {
			paddingHorizontal: 15,
		},
		slider: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			paddingVertical: 15,
		},
	})

	function isPreviousChapter() {
		return (newReader.chapters() ?? [])[
			(newReader.currentChapter.chapter ?? 0) - 1
		]
			? true
			: false
	}

	function isNextChapter() {
		return (newReader.chapters() ?? [])[
			(newReader.currentChapter.chapter ?? 0) + 1
		]
			? true
			: false
	}

	return (
		<>
			<FormatPanel isOpened={formatEditorOpened} />
			<View style={style.content}>
				<IconTitleBtn
					name="skip-previous"
					size={24}
					title="Previous"
					style={style.buttonStyle}
					iconStyle={[
						style.iconStyle,
						{
							color: isPreviousChapter()
								? theme.header.font
								: theme.reader.previousChapter.no,
						},
					]}
					textStyle={[
						style.textStyle,
						{
							color: isPreviousChapter()
								? theme.header.font
								: theme.reader.previousChapter.no,
						},
					]}
					disabled={!isPreviousChapter()}
					onPress={() => {
						// reader.endTraking()
						newReader.setChapter(
							(newReader.currentChapter.chapter ?? -68) - 1
						)
					}}
				/>
				{/* <IconTitleBtn
					name="text"
					size={24}
					title="About"
					style={style.buttonStyle}
					iconStyle={style.iconStyle}
					textStyle={style.textStyle}
				/> */}
				<IconTitleBtn
					// href={"../chapterSelect"}
					disabled={(() => {
						const maxChapters = newReader.meta.stats?.maxChapters

						return maxChapters && maxChapters == 1 ? true : false
					})()}
					name="format-list-numbered"
					size={24}
					title="Chapters"
					style={style.buttonStyle}
					iconStyle={style.iconStyle}
					textStyle={style.textStyle}
					onPress={() => {
						router.push("../chapterSelect")
					}}
				/>

				<IconTitleBtn
					name="format-size"
					size={24}
					title="Format"
					style={style.buttonStyle}
					iconStyle={style.iconStyle}
					textStyle={style.textStyle}
					onPress={() => {
						setFormatEditorOpened((prev) => !prev)
					}}
				/>
				<IconTitleBtn
					// href={
					// workUrl(
					// 	reader.work.data?.meta.id ?? -1,
					// 	reader.work.data?.chapters[0].id
					// 		? reader.work.data?.chapters[0].id.toString()
					// 		: "first"
					// ).href
					// }
					name="web"
					size={24}
					title="Original"
					style={style.buttonStyle}
					iconStyle={style.iconStyle}
					textStyle={style.textStyle}
					onPress={() => {
						WebBrowser.openBrowserAsync(
							workUrl(
								newReader.meta.workId ?? -1,
								newReader.currentChapter.id
									? newReader.currentChapter.id.toString()
									: "first"
							).href,
							{
								toolbarColor: theme.header.background,
							}
						)
					}}
				/>
				<IconTitleBtn
					name="skip-next"
					size={24}
					title="Next"
					style={style.buttonStyle}
					iconStyle={[
						style.iconStyle,
						{
							color: isNextChapter()
								? theme.header.font
								: theme.reader.nextChapter.no,
						},
					]}
					textStyle={[
						style.textStyle,
						{
							color: isNextChapter()
								? theme.header.font
								: theme.reader.nextChapter.no,
						},
					]}
					disabled={!isNextChapter()}
					onPress={() => {
						// reader.endTraking()
						newReader.setChapter(
							(newReader.currentChapter.chapter ?? -70) + 1
						)
					}}
				/>
			</View>
		</>
	)
}
