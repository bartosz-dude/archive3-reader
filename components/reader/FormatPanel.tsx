import Slider from "@react-native-community/slider"
import { ScrollView, Text, View } from "react-native"
import Btn from "../common/Btn"
import Show from "../common/Show"
import { FontWeight, useFormatter } from "./ReaderFormatter"
import { useAppTheme } from "../ThemeManager"
import useStyle from "../../hooks/useStyle"
import { useState } from "react"
import FormatSlider from "./FormatSlider"

export default function FormatPanel(props: { isOpened: boolean }) {
	const theme = useAppTheme()
	const formatter = useFormatter()

	// const [formatEditorOpened, setFormatEditorOpened] = useState(false)
	const [formatEditorTab, setFormatEditorTab] = useState<
		"fonts" | "spacing" | "display"
	>("fonts")

	const style = useStyle({
		content: {
			backgroundColor: theme.header.background,
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-evenly",
			paddingHorizontal: 20,
			paddingVertical: 10,
			borderTopColor: theme.header.accent,
			borderTopWidth: 1,
		},
		buttonStyle: {
			width: 60,
		},
		iconStyle: {
			color: theme.header.font,
		},
		textStyle: {
			color: theme.header.font,
			fontSize: 12,
		},
		formatEditor: {
			position: "absolute",
			backgroundColor: theme.header.menuBackground,
			height: 210,
			width: "100%",
			bottom: 0,
		},
		formatEditorTabs: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-evenly",
			paddingVertical: 10,
			backgroundColor: theme.header.background,
		},
		formatEditorContent: {
			paddingHorizontal: 15,
			display: "flex",
			flexDirection: "row",
			gap: 15,
		},
		formatEditorLabelColumn: {
			display: "flex",
			justifyContent: "space-around",
		},
		formatEditorSliderColumn: {
			flexGrow: 1,
		},
		slider: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			paddingVertical: 15,
		},
	})

	return (
		<>
			<Show when={props.isOpened}>
				<View
					style={{
						position: "relative",
					}}
				>
					<View style={style.formatEditor}>
						{/* <Text>test</Text> */}
						<View style={style.formatEditorTabs}>
							<Btn
								textStyle={{
									color: theme.header.font,
									borderBottomColor: theme.header.accent,
									borderBottomWidth:
										formatEditorTab == "fonts" ? 1 : 0,
								}}
								onPress={() => setFormatEditorTab("fonts")}
							>
								Fonts
							</Btn>
							<Btn
								textStyle={{
									color: theme.header.font,
									borderBottomColor: theme.header.accent,
									borderBottomWidth:
										formatEditorTab == "spacing" ? 1 : 0,
								}}
								onPress={() => setFormatEditorTab("spacing")}
							>
								Spacing
							</Btn>
							<Btn
								textStyle={{
									color: theme.header.font,
									borderBottomColor: theme.header.accent,
									borderBottomWidth:
										formatEditorTab == "display" ? 1 : 0,
								}}
								onPress={() => setFormatEditorTab("display")}
							>
								Display
							</Btn>
						</View>
						<ScrollView
							// style={}
							contentContainerStyle={style.formatEditorContent}
							persistentScrollbar
						>
							<Show when={formatEditorTab == "fonts"}>
								<View style={style.formatEditorLabelColumn}>
									<Text>Font size</Text>
								</View>
								<View style={style.formatEditorSliderColumn}>
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
							</Show>
							<Show when={formatEditorTab == "spacing"}>
								<View style={style.formatEditorLabelColumn}>
									<Text>Paragraph spacing</Text>
									<Text>Side margin</Text>
									<Text>Line spacing</Text>
									{/* <Text>Word spacing</Text> */}
								</View>
								<View style={style.formatEditorSliderColumn}>
									<FormatSlider
										buttonStep={1}
										max={20}
										min={1}
										valueState={
											formatter.format.paragraphSpacing
										}
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
										valueState={
											formatter.format.horizontalSpacing
										}
										sliderStep={1}
										valueDisplay={
											formatter.format.horizontalSpacing
										}
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
										valueState={
											formatter.format.lineSpacing
										}
										sliderStep={1}
										valueDisplay={
											formatter.format.lineSpacing
										}
										onChange={(e) => {
											formatter.update({
												lineSpacing: e,
											})
										}}
									/>
									{/* <FormatSlider
										buttonStep={1}
										max={5}
										min={1}
										valueState={
											formatter.format.wordSpacing
										}
										sliderStep={1}
										valueDisplay={
											formatter.format.wordSpacing
										}
										onChange={(e) => {
											formatter.update({
												wordSpacing: e,
											})
										}}
									/> */}
								</View>
							</Show>
							<Show when={formatEditorTab == "display"}>
								<View style={style.formatEditorLabelColumn}>
									<Text>Background color</Text>
									<Text>Scrolling direction</Text>
									<Text>Scrolling type</Text>
								</View>
								{/* <Text>Display</Text> */}
							</Show>
						</ScrollView>
					</View>
				</View>
			</Show>
		</>
	)
}
