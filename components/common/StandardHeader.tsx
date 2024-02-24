import { Text, View } from "react-native"
import { useAppTheme } from "../ThemeManager"
import BackBtn from "./BackBtn"
import AppHeader from "./AppHeader"

export default function StandardHeader(props: { title: string }) {
	const theme = useAppTheme()

	return (
		<AppHeader>
			<BackBtn style={{ color: theme.header.accent }} />
			<Text style={{ color: theme.header.font }}>{props.title}</Text>
			<View style={{ width: 32 }} />
		</AppHeader>
	)
}
