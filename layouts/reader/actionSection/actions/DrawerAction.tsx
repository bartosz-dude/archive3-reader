import IconTitleBtn from "../../../../components/common/btns/IconTitleBtn"
import { useActionSection } from "../ActionPanelStateProvider"
import { ActionProps } from "../types"

export default function DrawerAction(props: ActionProps) {
	const actionSection = useActionSection()

	return (
		<IconTitleBtn
			name="apps"
			size={props.style.iconSize}
			onLayout={props.onLayout}
			title={props.showTitle ? "Drawer" : undefined}
			style={props.style.view}
			iconStyle={props.style.icon}
			textStyle={props.style.text}
			onPress={() => {
				actionSection.openPanel("actionsDrawer")
			}}
		/>
	)
}
