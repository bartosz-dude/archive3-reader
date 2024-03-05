import { StyleProp, Text, View, ViewStyle } from "react-native"
import { useFormatter } from "../../../ReaderFormatter"
import FormatSlider from "../formatPanelHelpers/FormatSlider"

export default function FontsView(props: {
	// labelColumnStyle: StyleProp<ViewStyle>
	// actionColumnStyle: StyleProp<ViewStyle>
}) {
	const formatter = useFormatter()

	return (
		<>
			<View
				style={{
					display: "flex",
					justifyContent: "space-around",
				}}
			>
				<Text>Font size</Text>
			</View>
			<View
				style={{
					flexGrow: 1,
				}}
			>
				<FormatSlider
					buttonStep={2}
					max={32}
					min={10}
					valueState={formatter.format.fontSize}
					sliderStep={1}
					valueDisplay={formatter.format.fontSize}
					onChange={(e) => {
						formatter.update({
							fontSize: e,
						})
					}}
				/>
			</View>
		</>
	)
}
