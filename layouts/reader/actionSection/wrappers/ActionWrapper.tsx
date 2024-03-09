import React, { useState } from "react"
import {
	ColorValue,
	LayoutChangeEvent,
	StyleProp,
	TextStyle,
	ViewStyle,
} from "react-native"
import { ActionProps } from "../types"
import { useSettings } from "../../../../services/appSettings/components/settingsProvider"
import { useAppTheme } from "../../../../components/ThemeManager"
import Dragable from "../../../../libs/react-native-drag-and-drop/components/Dragable"

export default function ActionWrapper(props: {
	action: React.ElementType<ActionProps>
	color?: ColorValue
	disabledColor?: ColorValue
	forceStyle?: boolean
	forceTitle?: boolean
}) {
	const theme = useAppTheme()
	const { settings } = useSettings()

	const [showTitle, setShowTitle] = useState(props.forceTitle ?? false)

	return (
		<>
			<Dragable>
				<props.action
					showTitle={
						props.forceTitle ??
						(settings.readerFormat.actionBarLayout.alwaysHideTitles
							? false
							: showTitle)
					}
					onLayout={(e) => {
						if (props.forceTitle) return
						if (e.nativeEvent.layout.width < 55) {
							setShowTitle(false)
						} else {
							setShowTitle(true)
						}
					}}
					style={{
						icon: {
							color: props.color ?? theme.header.font,
						},
						text: {
							color: props.color ?? theme.header.font,
							fontSize: 12,
						},
						disabled: {
							icon: {
								color:
									props.disabledColor ??
									theme.reader.previousChapter.no,
							},
							text: {
								color:
									props.disabledColor ??
									theme.reader.previousChapter.no,
								fontSize: 12,
							},
						},
						view: {
							width: 60,
							flexShrink: 1,
						},
						iconSize: 24,
					}}
					forceStyle={props.forceStyle ?? false}
				/>
			</Dragable>
		</>
	)
}
