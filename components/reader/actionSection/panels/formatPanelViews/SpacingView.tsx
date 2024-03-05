import { StyleProp, Text, View, ViewStyle } from "react-native"
import { useFormatter } from "../../../ReaderFormatter"
import FormatSlider from "../formatPanelHelpers/FormatSlider"

export default function SpacingView(props: {}) {
	const formatter = useFormatter()

	return (
		<>
			<View
				style={{
					display: "flex",
					justifyContent: "space-around",
				}}
			>
				<Text>Paragraph spacing</Text>
				<Text>Side margin</Text>
				<Text>Line spacing</Text>
			</View>
			<View
				style={{
					flexGrow: 1,
				}}
			>
				<FormatSlider
					buttonStep={1}
					max={20}
					min={1}
					valueState={formatter.format.paragraphSpacing}
					sliderStep={1}
					valueDisplay={formatter.format.fontSize}
					onChange={(e) => {
						formatter.update({
							paragraphSpacing: e,
						})
					}}
				/>
				<FormatSlider
					buttonStep={5}
					max={20}
					min={1}
					valueState={formatter.format.horizontalSpacing}
					sliderStep={1}
					valueDisplay={formatter.format.horizontalSpacing}
					onChange={(e) => {
						formatter.update({
							horizontalSpacing: e,
						})
					}}
				/>
				<FormatSlider
					buttonStep={2}
					max={16}
					min={1}
					valueState={formatter.format.lineSpacing}
					sliderStep={1}
					valueDisplay={formatter.format.lineSpacing}
					onChange={(e) => {
						formatter.update({
							lineSpacing: e,
						})
					}}
				/>
			</View>
		</>
	)
}
