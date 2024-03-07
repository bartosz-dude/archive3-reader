import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
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

type IconType = "materialIcons" | "communityMaterialIcons"

export default function IconBtn<T extends IconType>({
	name,
	size,
	iconStyle,
	style,
	// @ts-ignore
	type = "communityMaterialIcons",
	...pressable
}: {
	name: React.ComponentProps<
		T extends "communityMaterialIcons"
			? typeof MaterialCommunityIcons
			: typeof MaterialIcons
	>["name"]
	size: number
	type?: T
	iconStyle?: StyleProp<TextStyle>
	style?: StyleProp<ViewStyle>
} & Omit<PressableProps, "style">) {
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
		pressable: {
			// borderRadius: 50
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
			// style=
			hitSlop={8}
			{...pressable}
		>
			<Show when={type == "communityMaterialIcons"}>
				<MaterialCommunityIcons
					style={iconStyle}
					name={
						name as React.ComponentProps<
							typeof MaterialCommunityIcons
						>["name"]
					}
					size={size}
				/>
			</Show>
			<Show when={type == "materialIcons"}>
				<MaterialIcons
					style={iconStyle}
					name={
						name as React.ComponentProps<
							typeof MaterialIcons
						>["name"]
					}
					size={size}
				/>
			</Show>
		</Pressable>
	)
}
