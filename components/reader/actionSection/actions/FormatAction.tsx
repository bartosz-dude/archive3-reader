import IconTitleBtn from "../../../common/IconTitleBtn"
import { useActionSection } from "../ReaderActionSection"
import { ActionProps } from "../types"

export default function FormatAction(props: ActionProps) {
	const actionSection = useActionSection()

	return (
		<IconTitleBtn
			name="format-size"
			size={props.style.iconSize}
			onLayout={props.onLayout}
			title={props.showTitle ? "Format" : undefined}
			style={props.style.view}
			iconStyle={props.style.icon}
			textStyle={props.style.text}
			onPress={() => {
				actionSection.openPanel("format")
			}}
		/>
	)
}
