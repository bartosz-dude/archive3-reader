import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from "react"
import Constants from "expo-constants"
import getSettings from "../../services/appSettings/api/getSettings"
import { useSettings } from "../../services/appSettings/components/settingsProvider"
import useWillUnmount from "../../hooks/useWillUnmount"

const formatterContext = createContext<unknown>(null)

export type FontWeightString =
	| "100"
	| "200"
	| "300"
	| "400"
	| "500"
	| "600"
	| "700"
	| "800"
	| "900"

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

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

export default function ReaderFormatter(props: {} & PropsWithChildren) {
	const { settings, update } = useSettings()
	const willUnmount = useWillUnmount()

	const [renderFormat, dispatch] = useReducer(reducer, settings.readerFormat)

	useEffect(() => {
		return () => {
			if (willUnmount)
				update({
					readerFormat: renderFormat,
				})
		}
	}, [renderFormat])

	const context = {
		format: renderFormat,
		update: (newFormat: Partial<FormatterReducerState>) => {
			dispatch({
				payload: newFormat,
			})
		},
	}

	return (
		<>
			<formatterContext.Provider value={context}>
				{props.children}
			</formatterContext.Provider>
		</>
	)
}

interface FormatterContext {
	format: FormatterReducerState
	update: (newFormat: Partial<FormatterReducerState>) => void
}

export function useFormatter() {
	return useContext(formatterContext) as FormatterContext
}
