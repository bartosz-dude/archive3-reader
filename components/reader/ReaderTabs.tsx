import { Text, View } from "react-native"
import { useTheme } from "../ThemeManager"
import useStyle from "../../hooks/useStyle"
import { useReaderContext } from "./ReaderManager"
import IconTitleBtn from "../common/IconTitleBtn"
import { Link } from "expo-router"
import IconTitleLink from "../common/IconTitleLink"
import IconTitleExternalLink from "../common/IconTitleExternalLink"
import workUrl from "../../services/ao3/tools/workUrl"
import { useEffect, useReducer, useState } from "react"
import Constants from "expo-constants"
import Btn from "../common/Btn"
import Show from "../common/Show"
import { FontWeight, useFormatter } from "./ReaderFormatter"
import Slider from "@react-native-community/slider"

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
	const theme = useTheme()
	const reader = useReaderContext()
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
		return (reader.chaptersList.data ?? [])[
			reader.currentChapter.chapter - 1
		]
			? true
			: false
	}

	function isNextChapter() {
		return (reader.chaptersList.data ?? [])[
			reader.currentChapter.chapter + 1
		]
			? true
			: false
	}

	return (
		<>
			<View
				style={{
					position: "relative",
				}}
			>
				{/* <Text>test</Text> */}
				<View
					style={[
						style.formatEditor,
						{ display: formatEditorOpened ? undefined : "none" },
					]}
				>
					<View style={style.formatEditorTabs}>
						<Btn
							textStyle={{
								color: theme.header.font,
								borderBottomColor: theme.header.accent,
								borderBottomWidth:
									formatEditorTab == "fonts" ? 1 : 0,
							}}
							onPress={() => setFormatEditorTab("fonts")}
						>
							Fonts
						</Btn>
						<Btn
							textStyle={{
								color: theme.header.font,
								borderBottomColor: theme.header.accent,
								borderBottomWidth:
									formatEditorTab == "spacing" ? 1 : 0,
							}}
							onPress={() => setFormatEditorTab("spacing")}
						>
							Spacing
						</Btn>
					</View>
					<View style={style.formatEditorContent}>
						<Show when={formatEditorTab == "fonts"}>
							<View style={style.slider}>
								<Text>Font size</Text>
								<Slider
									style={{ flexGrow: 1 }}
									minimumValue={10}
									maximumValue={32}
									value={formatter.format.fontSize}
									step={2}
									thumbTintColor={theme.tabBar.selected}
									minimumTrackTintColor={
										theme.tabBar.selected
									}
									maximumTrackTintColor={
										theme.tabBar.unselected
									}
									onValueChange={(e) => {
										formatter.update({
											fontSize: e,
										})
									}}
								/>
								<Text>{formatter.format.fontSize}</Text>
							</View>
							<View style={style.slider}>
								<Text>Font weight</Text>
								<Slider
									style={{ flexGrow: 1 }}
									minimumValue={0}
									maximumValue={900}
									value={formatter.format.fontWeight}
									step={100}
									thumbTintColor={theme.tabBar.selected}
									minimumTrackTintColor={
										theme.tabBar.selected
									}
									maximumTrackTintColor={
										theme.tabBar.unselected
									}
									onValueChange={(e) => {
										formatter.update({
											fontWeight: e as FontWeight,
										})
									}}
								/>
								<Text>
									{formatter.format.fontWeight > 0
										? formatter.format.fontWeight / 100
										: 0}
								</Text>
							</View>
						</Show>
						<Show when={formatEditorTab == "spacing"}>
							<Text>spacing</Text>
						</Show>
					</View>
				</View>
			</View>
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
					onPress={() =>
						reader.setChapter(reader.currentChapter.chapter - 1)
					}
				/>
				<IconTitleBtn
					name="text"
					size={24}
					title="About"
					style={style.buttonStyle}
					iconStyle={style.iconStyle}
					textStyle={style.textStyle}
				/>

				<IconTitleLink
					href={"../chapterSelect"}
					disabled={(() => {
						const maxChapters = reader.meta.data?.stats.maxChapters

						return maxChapters && maxChapters == 1 ? true : false
					})()}
					name="format-list-numbered"
					size={24}
					title="Chapter"
					style={style.buttonStyle}
					iconStyle={style.iconStyle}
					textStyle={style.textStyle}
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
				<IconTitleExternalLink
					href={
						workUrl(
							reader.work.data?.meta.id ?? -1,
							reader.work.data?.chapters[0].id
								? reader.work.data?.chapters[0].id.toString()
								: "first"
						).href
					}
					name="web"
					size={24}
					title="Original"
					style={style.buttonStyle}
					iconStyle={style.iconStyle}
					textStyle={style.textStyle}
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
					onPress={() =>
						reader.setChapter(reader.currentChapter.chapter + 1)
					}
				/>
			</View>
		</>
	)
}
