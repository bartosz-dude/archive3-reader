import { Pressable, StyleSheet, Text, type PressableProps } from "react-native"
import useColorSheet from "../../../hooks/useColorSheet"

interface ActionButtonProps {
	label: string
	onPress?: PressableProps["onPress"]
}

export default function ActionButton({ label, onPress }: ActionButtonProps) {
	const colorSheet = useColorSheet(lightStyle, darkStyle, sharedStyle)

	return (
		<>
			<Pressable
				// android_ripple={{
				// 	color: "#000000010",
				// 	borderless: true,
				// 	foreground: true,
				// }}
				style={colorSheet.container}
				onPress={onPress}
			>
				<Text>{label}</Text>
			</Pressable>
		</>
	)
}

const sharedStyle = StyleSheet.create({
	container: {
		borderRadius: 20,
		paddingHorizontal: 18,
		paddingVertical: 15,
		borderWidth: 2,
	},
})

const lightStyle = StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderColor: "black",
	},
})

const darkStyle = StyleSheet.create({})
