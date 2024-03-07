import { useAppTheme } from "../../../../ThemeManager"
import Btn from "../../../../common/Btn"
import { FormatPanelViews } from "../FormatPanel"

export default function FormatCategory(props: {
	title: string
	openedView: FormatPanelViews
	view: FormatPanelViews
	onPress: () => void
}) {
	const theme = useAppTheme()

	return (
		<Btn
			textStyle={{
				color: theme.header.font,
				borderBottomColor: theme.header.accent,
				borderBottomWidth: props.openedView == props.view ? 1 : 0,
			}}
			onPress={props.onPress}
		>
			{props.title}
		</Btn>
	)
}