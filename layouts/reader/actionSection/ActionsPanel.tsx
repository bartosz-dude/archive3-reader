import { Text } from "react-native"
import FormatPanel, { FormatPanelViews } from "./panels/FormatPanel"
import ActionPanelWrapper from "./wrappers/ActionPanelWrapper"
import { createContext, useContext, useRef } from "react"
import { useActionSection } from "./ActionPanelStateProvider"
import ActionsPanelMemoryProvider from "./ActionsPanelMemoryProvider"
import Show from "../../../components/common/Show"

export default function ActionsPanel() {
	const actionSection = useActionSection()

	return (
		<>
			<ActionsPanelMemoryProvider>
				<Show when={actionSection.openedPanel == "format"}>
					<ActionPanelWrapper>
						<FormatPanel />
					</ActionPanelWrapper>
				</Show>
				<Show when={actionSection.openedPanel == "ttsControls"}>
					<ActionPanelWrapper>
						<Text>TTS Controls</Text>
					</ActionPanelWrapper>
				</Show>
			</ActionsPanelMemoryProvider>
		</>
	)
}
