import { Text } from "react-native"
import Show from "../../common/Show"
import FormatPanel, { FormatPanelViews } from "./panels/FormatPanel"
import ActionPanelWrapper from "./wrappers/ActionPanelWrapper"
import { createContext, useContext, useRef } from "react"
import { useActionSection } from "./ActionPanelStateProvider"

const actionsPanelContext = createContext<unknown>(null)

export default function ActionsPanel() {
	const actionSection = useActionSection()

	const context = useRef({
		formatPanel: {
			currentView: "fonts",
		},
	})

	return (
		<>
			<actionsPanelContext.Provider value={context}>
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
			</actionsPanelContext.Provider>
		</>
	)
}

interface ActionsPanelContext {
	formatPanel: {
		currentView: FormatPanelViews
	}
}

export function usePanelMemory() {
	return useContext(
		actionsPanelContext
	) as React.MutableRefObject<ActionsPanelContext>
}
