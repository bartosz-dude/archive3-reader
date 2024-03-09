import IconTitleBtn from "../../../../components/common/btns/IconTitleBtn"
import { useActionSection } from "../ActionPanelStateProvider"
import { ActionProps } from "../types"

export default function TtsAction(props: ActionProps) {
	const actionSection = useActionSection()

	return (
		<IconTitleBtn
			name="headphones"
			size={props.style.iconSize}
			onLayout={props.onLayout}
			title={props.showTitle ? "TTS" : undefined}
			style={props.style.view}
			iconStyle={props.style.icon}
			textStyle={props.style.text}
			onPress={() => {
				actionSection.openPanel("ttsControls")
			}}
		/>
	)
}
