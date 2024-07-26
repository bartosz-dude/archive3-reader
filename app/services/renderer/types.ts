import type { TextStyle, ViewStyle } from "react-native"

export interface RendererStyle {
	anchor: TextStyle
	paragraph: TextStyle
	text: TextStyle
	renderer: ViewStyle
}

export type TextPosition = [from: number, to: number]

export interface TextHighlight {
	position: TextPosition
	backgroundColor?: string
	borderColor?: string
}
