import { StyleProp, Text, View, ViewStyle } from "react-native"

export default function DisplayView(props: {}) {
	return (
		<>
			<View
				style={{
					display: "flex",
					justifyContent: "space-around",
				}}
			>
				<Text>Background color</Text>
				<Text>Scrolling direction</Text>
				<Text>Scrolling type</Text>
			</View>
			<View
				style={{
					flexGrow: 1,
				}}
			></View>
		</>
	)
}
