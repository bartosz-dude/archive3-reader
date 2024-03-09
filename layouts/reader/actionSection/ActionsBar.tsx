import { router } from "expo-router"
import { useState, useReducer } from "react"
import { View } from "react-native"
import useStyle from "../../../hooks/useStyle"
import workUrl from "../../../services/ao3/tools/workUrl"
import FormatPanel from "./panels/FormatPanel"
import * as WebBrowser from "expo-web-browser"
import PreviousAction from "./actions/PreviousAction"
import NextAction from "./actions/NextAction"
import OriginalAction from "./actions/OriginalAction"
import ChaptersAction from "./actions/ChaptersAction"
import FormatAction from "./actions/FormatAction"
import AboutAction from "./actions/AboutAction"
import NotesAction from "./actions/NotesAction"
import TtsAction from "./actions/TtsAction"
import Action from "./Action"
import { useSettings } from "../../../services/appSettings/components/settingsProvider"
import { useActionSection } from "./ActionPanelStateProvider"
import ActionsDrawer from "./ActionsDrawer"
import { useAppTheme } from "../../../components/ThemeManager"
import Show from "../../../components/common/Show"
import { useReaderManager } from "../../../components/reader/ReaderManagerNew"
import Dragable from "../../../libs/react-native-drag-and-drop/components/Dragable"

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

export default function ActionBar() {
	const reader = useReaderManager()
	const theme = useAppTheme()
	const actionSection = useActionSection()
	const { settings } = useSettings()

	const style = useStyle({
		content: {
			backgroundColor: theme.header.background,
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-evenly",
			alignItems: "center",
			paddingHorizontal: 20,
			paddingVertical: 10,
			borderTopColor: theme.header.accent,
			borderTopWidth: 1,
			minHeight: 60,
			// height: "auto",
		},
	})

	return (
		<>
			<View style={style.content}>
				<Show when={reader.isSingleChapter()}>
					{settings.readerFormat.actionBarLayout.singleChapter.actions.map(
						(v, i) => (
							<Action
								key={i}
								name={v}
							/>
						)
					)}
				</Show>
				<Show when={!reader.isSingleChapter()}>
					<Action name="previous" />
					<Action name="about" />
					<Action name="chapters" />
					<Action name="format" />
					{/* <Action name="notes" /> */}
					{/* <Action name="original" /> */}
					{/* <Action name="tts" /> */}
					<Action name="drawer" />
					<Action name="next" />
				</Show>
			</View>
			<Show when={actionSection.openedPanel == "actionsDrawer"}>
				<ActionsDrawer />
			</Show>
		</>
	)
}
