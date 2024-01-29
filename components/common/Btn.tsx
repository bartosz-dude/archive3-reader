import { Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

export default function Btn({ children, style, disabled, onPress }: { children: string, style?: StyleProp<ViewStyle>, disabled?: PressableProps[ "disabled" ], onPress?: PressableProps[ "onPress" ] }) {

	const styleLocal = StyleSheet.create({
		view: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			alignSelf: "stretch"
		},
		text: {
			// display
			// textAlign: "center",
			// textAlignVertical: "center"

		}
	})

	return (
		<Pressable
			style={[ styleLocal.view, style ]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={[ styleLocal.text ]}>{children}</Text>
		</Pressable>
	)
}