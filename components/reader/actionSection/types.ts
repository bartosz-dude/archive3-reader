import {
	LayoutChangeEvent,
	StyleProp,
	ViewStyle,
	TextStyle,
} from "react-native"

export type ActionsPanels = "format" | "ttsControls"

export type Actions =
	| "previous"
	| "next"
	| "about"
	| "format"
	| "original"
	| "tts"
	| "notes"
	| "chapters"

export type ActionProps = {
	showTitle: boolean
	onLayout: (event: LayoutChangeEvent) => void
	style: {
		view: StyleProp<ViewStyle>
		icon: StyleProp<TextStyle>
		text: StyleProp<TextStyle>
		iconSize: number
	}
}
