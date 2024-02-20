import { Text, View } from "react-native"
import { useTheme } from "../ThemeManager"
import BackBtn from "./BackBtn"
import Header from "./Header"

export default function StandardHeader(props: { title: string }) {
	const theme = useTheme()

	return (
		<Header>
			<BackBtn style={{ color: theme.header.accent }} />
			<Text style={{ color: theme.header.font }}>{props.title}</Text>
			<View style={{ width: 32 }} />
		</Header>
	)
}
