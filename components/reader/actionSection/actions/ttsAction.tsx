import { useAppTheme } from "../../../ThemeManager"
import IconTitleBtn from "../../../common/IconTitleBtn"
import { ActionProps } from "../types"

export default function TtsAction(props: ActionProps) {
	const theme = useAppTheme()

	return (
		<IconTitleBtn
			name="headphones"
			size={props.style.iconSize}
			onLayout={props.onLayout}
			title={props.showTitle ? "TTS" : undefined}
			style={props.style.view}
			iconStyle={props.style.icon}
			textStyle={props.style.text}
		/>
	)
}
