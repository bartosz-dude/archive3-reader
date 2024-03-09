import { PropsWithChildren, createContext, useContext, useReducer } from "react"
import { ActionsPanels } from "./types"

const ActionSectionContext = createContext<unknown>(null)

export default function ActionPanelStateProvider(
	props: {} & PropsWithChildren
) {
	const [openedPanel, setOpenedPanel] = useReducer(
		(state: ActionsPanels | null, action: ActionsPanels | null) => {
			if (state === action) {
				return null
			}

			return action
		},
		null
	)

	const context = {
		openPanel: (panel: ActionsPanels) => {
			setOpenedPanel(panel)
		},
		closePanel: () => {
			setOpenedPanel(null)
		},
		openedPanel: openedPanel,
	}

	return (
		<ActionSectionContext.Provider value={context}>
			{props.children}
		</ActionSectionContext.Provider>
	)
}

interface ActionSectionContext {
	openPanel: (panel: ActionsPanels) => void
	closePanel: () => void
	openedPanel: ActionsPanels | null
}

export function useActionSection() {
	return useContext(ActionSectionContext) as ActionSectionContext
}
