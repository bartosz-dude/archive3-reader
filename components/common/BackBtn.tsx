import { router } from "expo-router"
import { PressableProps, StyleProp, TextStyle } from "react-native"
import IconBtn from "./IconBtn"

export default function BackBtn(
	props: { style?: StyleProp<TextStyle> } & Pick<PressableProps, "onPress">
) {
	return (
		<IconBtn
			name="arrow-left"
			size={32}
			iconStyle={[{ color: "white" }, props.style]}
			onPress={(e) => {
				if (props.onPress) props.onPress(e)
				router.back()
			}}
		/>
	)
}
