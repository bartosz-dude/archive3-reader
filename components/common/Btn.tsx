import {
	Pressable,
	PressableProps,
	StyleProp,
	StyleSheet,
	Text,
	TextProps,
	TextStyle,
	ViewStyle,
} from "react-native"

export default function Btn({
	children,
	style,
	textStyle,
	disabled,
	onPress,
	...textProps
}: {
	children: string | string[]
	style?: StyleProp<ViewStyle>
	textStyle?: StyleProp<TextStyle>
	disabled?: PressableProps["disabled"]
	onPress?: PressableProps["onPress"]
} & Omit<TextProps, "style" | "disabled" | "onPress">) {
	const styleLocal = StyleSheet.create({
		view: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			alignSelf: "stretch",
		},
		text: {
			// display
			// textAlign: "center",
			// textAlignVertical: "center"
		},
	})

	return (
		<Pressable
			style={[styleLocal.view, style]}
			onPress={onPress}
			disabled={disabled}
			hitSlop={8}
		>
			<Text
				style={[styleLocal.text, textStyle]}
				{...textProps}
			>
				{children}
			</Text>
		</Pressable>
	)
}
