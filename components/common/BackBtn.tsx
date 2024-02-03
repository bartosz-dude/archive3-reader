import { StyleProp, TextStyle, ViewStyle } from "react-native"
import IconBtn from "./IconBtn"
import { router } from "expo-router"

export default function BackBtn(props: { style?: StyleProp<TextStyle> }) {
	return (
		<IconBtn
			name="arrow-left"
			size={32}
			iconStyle={[{ color: "white" }, props.style]}
			onPress={() => {
				router.back()
			}}
		/>
	)
}
