import { Text } from "react-native"
import FormatPanel, { FormatPanelViews } from "./panels/FormatPanel"
import ActionPanelWrapper from "./wrappers/ActionPanelWrapper"
import { PropsWithChildren, createContext, useContext, useRef } from "react"
import { useActionSection } from "./ActionPanelStateProvider"

const actionsPanelContext = createContext<unknown>(null)

export default function ActionsPanelMemoryProvider(
	props: {} & PropsWithChildren
) {
	const context = useRef({
		formatPanel: {
			currentView: "fonts",
		},
	})

	return (
		<>
			<actionsPanelContext.Provider value={context}>
				{props.children}
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
