import { Text, View } from "react-native"
import useStyle from "../../hooks/useStyle"
import { useTheme } from "../ThemeManager"

export default function SearchBarTitle({ title }: { title: string }) {
	const theme = useTheme()

	const style = useStyle({
		searchBarTitleContainer: {
			backgroundColor: theme.header.background,
			paddingVertical: 10,
		},
		title: {
			textAlign: "center",
			color: theme.header.font,
		},
	})

	return (
		<>
			<View style={style.searchBarTitleContainer}>
				<Text style={style.title}>{title}</Text>
			</View>
		</>
	)
}
