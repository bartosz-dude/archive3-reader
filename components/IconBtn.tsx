import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";

export default function IconBtn({ name, size, iconStyle, style, ...pressable }: { name: React.ComponentProps<typeof MaterialCommunityIcons>[ "name" ], size: number, iconStyle: StyleProp<TextStyle>, style: StyleProp<ViewStyle> } & Omit<PressableProps, "style">) {

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

		},
		pressable: {
			// borderRadius: 50
		}
	})

	return (
		<Pressable
			android_ripple={{ color: "lightgrey", radius: 24, borderless: true }}
			style={[ styleLocal.pressable, style ]}
			// style=
			{...pressable}
		>
			<MaterialCommunityIcons style={iconStyle} name={name} size={size} />
		</Pressable>
	)
}