import { MaterialCommunityIcons } from "@expo/vector-icons"
import {
	Pressable,
	PressableProps,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	ViewStyle,
} from "react-native"
import Show from "./Show"

export default function IconTitleBtn({
	name,
	title,
	size,
	iconStyle,
	textStyle,
	style,
	...pressable
}: {
	name: React.ComponentProps<typeof MaterialCommunityIcons>["name"]
	size: number
	title?: string
	iconStyle?: StyleProp<TextStyle>
	textStyle?: StyleProp<TextStyle>
	style?: StyleProp<ViewStyle>
} & Omit<PressableProps, "style">) {
	const styleLocal = StyleSheet.create({
		view: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			alignSelf: "stretch",
		},
		text: {},
		pressable: {
			display: "flex",
			// justifyContent: "center",
			alignItems: "center",
			// justifyContent: "space-evenly",
		},
	})

	return (
		<Pressable
			android_ripple={{
				color: "lightgrey",
				radius: 24,
				borderless: true,
			}}
			style={[styleLocal.pressable, style]}
			hitSlop={8}
			{...pressable}
		>
			<MaterialCommunityIcons
				style={iconStyle}
				name={name}
				size={size}
			/>
			<Show when={title ? true : false}>
				<Text style={[styleLocal.text, textStyle]}>{title}</Text>
			</Show>
		</Pressable>
	)
}
