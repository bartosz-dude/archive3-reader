import { router } from "expo-router"
import { useState, useReducer } from "react"
import { View } from "react-native"
import useStyle from "../../../hooks/useStyle"
import workUrl from "../../../services/ao3/tools/workUrl"
import { useAppTheme } from "../../ThemeManager"
import IconTitleBtn from "../../common/IconTitleBtn"
import FormatPanel from "../FormatPanel"
import { useFormatter } from "../ReaderFormatter"
import { useReaderManager } from "../ReaderManagerNew"
import * as WebBrowser from "expo-web-browser"
import PreviousAction from "./actions/PreviousAction"
import NextAction from "./actions/NextAction"
import OriginalAction from "./actions/OriginalAction"
import ChaptersAction from "./actions/ChaptersAction"
import FormatAction from "./actions/FormatAction"
import AboutAction from "./actions/aboutAction"
import NotesAction from "./actions/notesAction"
import TtsAction from "./actions/ttsAction"
import Action from "./Action"
import { useSettings } from "../../../services/appSettings/components/settingsProvider"

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
	const theme = useAppTheme()
	const { settings } = useSettings()

	const style = useStyle({
		content: {
			// backgroundColor: theme.header.background,
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
				{/* {settings.readerFormat.actionBarLayout.actions.map((v, i) => (
					<Action
						key={i}
						name={v}
					/>
				))} */}
				<Action name={"previous"} />
				<Action name={"about"} />
				<Action name="chapters" />
				<Action name={"format"} />
				<Action name={"original"} />
				{/* <Action name={"tts"} /> */}
				<Action name={"next"} />
			</View>
		</>
	)
}
