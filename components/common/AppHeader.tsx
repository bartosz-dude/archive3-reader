import { StyleProp, View, ViewStyle } from "react-native"
import useStyle from "../../hooks/useStyle"
import Constants from "expo-constants"
import { PropsWithChildren } from "react"
import { useAppTheme } from "../ThemeManager"

export default function AppHeader(
	props: { style?: StyleProp<ViewStyle> } & PropsWithChildren
) {
	const theme = useAppTheme()

	const headerStyle = useStyle({
		header: {
			paddingTop: Constants.statusBarHeight + 10,
			paddingBottom: 10,
			paddingHorizontal: 15,
			backgroundColor: theme.header.background,
			display: "flex",
			flexDirection: "row",
			gap: 10,
			alignItems: "center",
			justifyContent: "space-between",
		},
	})

	return (
		<View style={[headerStyle.header, props.style]}>{props.children}</View>
	)
}
