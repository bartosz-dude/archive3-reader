import { StyleSheet, Text, View } from "react-native"
import useColorSheet from "../../../hooks/useColorSheet"
import type { ReactNode } from "react"
import Show from "../../utils/Show"

interface LabelProps {
	label: string
	content: string
	/**
	 * replaces the label text with this component, useful when you want to make tag a link
	 */
	labelComponent?: ReactNode
}

export default function Label({ label, content, labelComponent }: LabelProps) {
	const colorSheet = useColorSheet(lightStyle, darkStyle, sharedStyle)

	return (
		<>
			<View style={colorSheet.container}>
				<Show when={!labelComponent}>
					<Text style={colorSheet.labelText}>{label}</Text>
				</Show>
				<Show when={labelComponent ? true : false}>
					{labelComponent}
				</Show>
				<Text>{content}</Text>
			</View>
		</>
	)
}

const sharedStyle = StyleSheet.create({
	container: {
		borderRadius: 5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
		display: "flex",
		gap: 10,
		flexDirection: "row",
	},
	labelText: {
		fontWeight: "bold",
	},
})

const lightStyle = StyleSheet.create({
	container: {
		borderColor: "black",
		backgroundColor: "white",
	},
})

const darkStyle = StyleSheet.create({})
