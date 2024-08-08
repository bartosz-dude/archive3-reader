import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react"
import { Appearance, type ColorSchemeName } from "react-native"
import type { RendererStyle, TextHighlight } from "./types"
import { merge } from "ts-deepmerge"

interface RendererProviderProps {
	children: ReactNode
	style?: Partial<RendererStyle>
}

interface RendererContext {
	options: {
		renderUnsupportedTags: boolean
	}
	highlights: TextHighlight[]
	style: Partial<RendererStyle>
}

const defaultContext: RendererContext = {
	options: {
		renderUnsupportedTags: true,
	},
	highlights: [
		// {
		// 	position: [0, 24],
		// 	backgroundColor: "#123123aa",
		// },
		// {
		// 	position: [26, 30],
		// 	backgroundColor: "#abcabcaa",
		// },
		// {
		// 	position: [80, 200],
		// 	backgroundColor: "#345678aa",
		// },
	],
	style: {
		anchor: {
			textDecorationLine: "underline",
		},
		paragraph: {
			marginVertical: 8,
			marginHorizontal: 0,
		},
		text: {
			color: "#000",
		},
		renderer: {
			width: "100%",
			backgroundColor: "#fff",
			marginHorizontal: 0,
			marginVertical: 0,
		},
	},
}

const rendererContext = createContext<RendererContext>(defaultContext)

/**
 * Provides style and options for Renderer
 */
export default function RendererProvider({
	children,
	style,
}: RendererProviderProps) {
	return (
		<>
			<rendererContext.Provider
				value={merge(defaultContext, { style: style ?? {} })}
			>
				{children}
			</rendererContext.Provider>
		</>
	)
}

export function useRendererStyle() {
	return useContext(rendererContext).style
}

export function useRendererOptions() {
	return useContext(rendererContext).options
}

export function useRendererHighlights() {
	return useContext(rendererContext).highlights
}
