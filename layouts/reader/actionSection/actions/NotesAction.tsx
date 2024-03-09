import { useAppTheme } from "../../../../components/ThemeManager"
import IconTitleBtn from "../../../../components/common/IconTitleBtn"
import { ActionProps } from "../types"

export default function NotesAction(props: ActionProps) {
	const theme = useAppTheme()

	return (
		<IconTitleBtn
			name="note-multiple-outline"
			size={props.style.iconSize}
			onLayout={props.onLayout}
			title={props.showTitle ? "Notes" : undefined}
			style={props.style.view}
			iconStyle={props.style.icon}
			textStyle={props.style.text}
		/>
	)
}
