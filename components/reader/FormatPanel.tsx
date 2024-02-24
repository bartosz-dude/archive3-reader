import Slider from "@react-native-community/slider"
import { Text, View } from "react-native"
import Btn from "../common/Btn"
import Show from "../common/Show"
import { FontWeight, useFormatter } from "./ReaderFormatter"
import { useAppTheme } from "../ThemeManager"
import useStyle from "../../hooks/useStyle"
import { useState } from "react"

export default function FormatPanel(props: { isOpened: boolean }) {
	const theme = useAppTheme()
	const formatter = useFormatter()

	// const [formatEditorOpened, setFormatEditorOpened] = useState(false)
	const [formatEditorTab, setFormatEditorTab] = useState<"fonts" | "spacing">(
		"fonts"
	)

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
			// height: 200,
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
							{/* <Btn
								textStyle={{
									color: theme.header.font,
									borderBottomColor: theme.header.accent,
									borderBottomWidth:
										formatEditorTab == "spacing" ? 1 : 0,
								}}
								onPress={() => setFormatEditorTab("spacing")}
							>
								Spacing
							</Btn> */}
						</View>
						<View style={style.formatEditorContent}>
							<Show when={formatEditorTab == "fonts"}>
								<View style={style.slider}>
									<Text>Font size</Text>
									<Slider
										style={{ flexGrow: 1 }}
										minimumValue={10}
										maximumValue={32}
										value={formatter.format.fontSize}
										step={2}
										thumbTintColor={theme.tabBar.selected}
										minimumTrackTintColor={
											theme.tabBar.selected
										}
										maximumTrackTintColor={
											theme.tabBar.unselected
										}
										onValueChange={(e) => {
											formatter.update({
												fontSize: e,
											})
										}}
									/>
									<Text>{formatter.format.fontSize}</Text>
								</View>
								<View style={style.slider}>
									<Text>Font weight</Text>
									<Slider
										style={{ flexGrow: 1 }}
										minimumValue={0}
										maximumValue={900}
										value={formatter.format.fontWeight}
										step={100}
										thumbTintColor={theme.tabBar.selected}
										minimumTrackTintColor={
											theme.tabBar.selected
										}
										maximumTrackTintColor={
											theme.tabBar.unselected
										}
										onValueChange={(e) => {
											formatter.update({
												fontWeight: e as FontWeight,
											})
										}}
									/>
									<Text>
										{formatter.format.fontWeight > 0
											? formatter.format.fontWeight / 100
											: 0}
									</Text>
								</View>
							</Show>
							<Show when={formatEditorTab == "spacing"}>
								<Text>spacing</Text>
							</Show>
						</View>
					</View>
				</View>
			</Show>
		</>
	)
}
