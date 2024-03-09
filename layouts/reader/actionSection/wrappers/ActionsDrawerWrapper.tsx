import { PropsWithChildren } from "react"
import { View } from "react-native"
import { useAppTheme } from "../../../../components/ThemeManager"

export default function ActionDrawerWrapper(props: {} & PropsWithChildren) {
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
						bottom: -60,
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
