import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated"
import { PropsWithChildren, useEffect } from "react"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { Pressable, View } from "react-native"

export default function Dragable(
	props: {
		movementRange?: {
			top?: number
			bottom?: number
			left?: number
			right?: number
		}
		activateAfterLongPress?: number
		disabled?: boolean
	} & PropsWithChildren
) {
	const translateX = useSharedValue(0)
	const translateY = useSharedValue(0)

	const drag = Gesture.Pan()
		.enabled(props.disabled ?? true)
		.activateAfterLongPress(props.activateAfterLongPress ?? 500)
		.onChange((e) => {
			translateX.value += e.changeX
			translateY.value += e.changeY
		})
		.onEnd((e) => {
			translateX.value = withSpring(0, {
				// stiffness: 20,
				damping: 15,
			})
			translateY.value = withSpring(0, {
				damping: 15,
				// stiffness: 20,
			})
		})

	const dragStyle = useAnimatedStyle(() => {
		return {
			// position: "absolute",
			backgroundColor: "green",
			transform: [
				{
					translateX: translateX.value,
				},
				{
					translateY: translateY.value,
				},
			],
		}
	})

	return (
		<>
			<GestureDetector gesture={drag}>
				<Animated.View style={[dragStyle]}>
					<View>{props.children}</View>
				</Animated.View>
			</GestureDetector>
		</>
	)
}
