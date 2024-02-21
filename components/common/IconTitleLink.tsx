import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, LinkProps } from "expo-router"
import {
	Pressable,
	PressableProps,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from "react-native"

export default function IconTitleLink({
	name,
	title,
	size,
	iconStyle,
	textStyle,
	style,
	...linkProps
}: // ...pressable
{
	href: string
	name: React.ComponentProps<typeof MaterialCommunityIcons>["name"]
	title: string
	size: number
	iconStyle?: StyleProp<TextStyle>
	textStyle?: StyleProp<TextStyle>
	style?: StyleProp<ViewStyle>
} & LinkProps<any>) {
	const styleLocal = StyleSheet.create({
		view: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			alignSelf: "stretch",
		},
		text: {},
		link: {
			display: "flex",
			// flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
	})

	return (
		<Link
			// // @ts-expect-error
			// href={href}
			{...linkProps}
		>
			<View style={[styleLocal.link, style]}>
				<MaterialCommunityIcons
					style={iconStyle}
					name={name}
					size={size}
				/>
				<Text style={[styleLocal.text, textStyle]}>{title}</Text>
			</View>
		</Link>
	)
}
