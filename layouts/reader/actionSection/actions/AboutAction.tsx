import { useAppTheme } from "../../../../components/ThemeManager"
import IconTitleBtn from "../../../../components/common/btns/IconTitleBtn"
import { ActionProps } from "../types"

export default function AboutAction(props: ActionProps) {
	const theme = useAppTheme()

	return (
		<IconTitleBtn
			name="text"
			size={props.style.iconSize}
			onLayout={props.onLayout}
			title={props.showTitle ? "About" : undefined}
			style={props.style.view}
			iconStyle={props.style.icon}
			textStyle={props.style.text}
		/>
	)
}
