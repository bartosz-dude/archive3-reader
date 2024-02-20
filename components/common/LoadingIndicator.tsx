import { ActivityIndicator, View } from "react-native"
import useStyle from "../../hooks/useStyle"
import { useTheme } from "../ThemeManager"

export default function LoadingIndicator({}) {
	const theme = useTheme()

	const style = useStyle(
		{
			indicatorBackground: {
				backgroundColor: theme.loadingIndicator.background,
				borderRadius: 50,
				borderColor: theme.loadingIndicator.background,
				borderWidth: 5,
			},
			container: {
				zIndex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				marginVertical: 10,
			},
		},
		[]
	)

	return (
		<>
			<View style={style.container}>
				<View style={style.indicatorBackground}>
					<ActivityIndicator
						color={"white"}
						size={"large"}
					/>
				</View>
			</View>
		</>
	)
}
