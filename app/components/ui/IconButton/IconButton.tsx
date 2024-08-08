import { MaterialCommunityIcons } from "@expo/vector-icons"
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	type GestureResponderEvent,
	type ViewStyle,
} from "react-native"
interface NameProps {
	name: ConstructorParameters<typeof MaterialCommunityIcons>["0"]["name"]
	size?: number
	onPress?: (event: GestureResponderEvent) => void
	style?: ViewStyle
}

export default function IconButton({ name, size, onPress, style }: NameProps) {
	return (
		<>
			<View style={[styles.container, style]}>
				<Pressable
					onPress={onPress}
					android_ripple={{
						color: "#000000010",
						radius: size,
						borderless: true,
						foreground: true,
					}}
				>
					<MaterialCommunityIcons
						name={name}
						size={size ?? 24}
					/>
				</Pressable>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
})
