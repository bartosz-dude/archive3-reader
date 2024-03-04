import React, { useState } from "react"
import {
	LayoutChangeEvent,
	StyleProp,
	TextStyle,
	ViewStyle,
} from "react-native"
import { useAppTheme } from "../../ThemeManager"
import { ActionProps } from "./types"
import { useSettings } from "../../../services/appSettings/components/settingsProvider"

export default function ActionWrapper(props: {
	action: React.ElementType<ActionProps>
}) {
	const theme = useAppTheme()
	const { settings } = useSettings()

	const [showTitle, setShowTitle] = useState(false)

	return (
		<>
			<props.action
				showTitle={
					settings.readerFormat.actionBarLayout.alwaysHideTitles
						? false
						: showTitle
				}
				onLayout={(e) => {
					if (e.nativeEvent.layout.width < 55) {
						setShowTitle(false)
					} else {
						setShowTitle(true)
					}
				}}
				style={{
					icon: {
						color: theme.header.font,
					},
					text: {
						color: theme.header.font,
						fontSize: 12,
					},
					view: {
						width: 60,
						flexShrink: 1,
						// height: "100%",
						// justifyContent: "center",
					},
					iconSize: 24,
				}}
			/>
		</>
	)
}
