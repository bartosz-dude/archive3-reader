import { StyleSheet, Text, View } from "react-native"
import useColorSheet from "../../../hooks/useColorSheet"
import type { ReactNode } from "react"
import Show from "../../utils/Show"

interface TagProps {
	content: string
	/**
	 * replaces the content text with this component, useful when you want to make tag a link
	 */
	contentComponent?: ReactNode
}

export default function Tag({ content, contentComponent }: TagProps) {
	const colorSheet = useColorSheet(lightStyle, darkStyle, sharedStyle)

	return (
		<>
			<View style={colorSheet.container}>
				<Show when={!contentComponent}>
					<Text>{content}</Text>
				</Show>
				<Show when={contentComponent ? true : false}>
					{contentComponent}
				</Show>
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
	},
})

const lightStyle = StyleSheet.create({
	container: {
		borderColor: "black",
		backgroundColor: "white",
	},
})

const darkStyle = StyleSheet.create({})
