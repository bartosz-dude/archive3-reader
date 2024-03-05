import { PropsWithChildren } from "react"
import { View } from "react-native"
import { useAppTheme } from "../../../ThemeManager"

export default function ActionPanelWrapper(props: {} & PropsWithChildren) {
	const theme = useAppTheme()

	return (
		<>
			<View
				style={{
					position: "relative",
				}}
			>
				<View
					style={{
						position: "absolute",
						bottom: 0,
						width: "100%",
						backgroundColor: theme.header.menuBackground,
					}}
				>
					{props.children}
				</View>
			</View>
		</>
	)
}
