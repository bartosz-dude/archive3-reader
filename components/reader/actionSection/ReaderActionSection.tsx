import { createContext, useContext, useReducer } from "react"
import ActionBar from "./actionsBar"
import ActionPanel from "./actionsPanel"
import { ActionsPanels } from "./types"
import { View } from "react-native"
import { useAppTheme } from "../../ThemeManager"
import useLoadingHandler from "../../../hooks/useLoadingHandler"
import { useReaderManager } from "../ReaderManagerNew"
import Loaded from "../../common/Loaded"

const ActionSectionContext = createContext<unknown>(null)

export default function ReaderActionSection() {
	const theme = useAppTheme()
	const reader = useReaderManager()

	const readerUILoading = useLoadingHandler([
		reader.metaStatus,
		reader.localWorkStatus,
	])

	const [openedPanel, setOpenedPanel] = useReducer(
		(state: ActionsPanels | null, action: ActionsPanels) => {
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
		openedPanel: openedPanel,
	}

	return (
		<>
			<ActionSectionContext.Provider value={context}>
				<Loaded
					isLoading={readerUILoading}
					loading={
						<View
							style={{
								minHeight: 60,
								backgroundColor: theme.header.background,
							}}
						></View>
					}
				>
					<ActionPanel />
					<View
						style={{
							minHeight: 60,
							backgroundColor: theme.header.background,
						}}
					>
						<ActionBar />
					</View>
				</Loaded>
			</ActionSectionContext.Provider>
		</>
	)
}

interface ActionSectionContext {
	openPanel: (panel: ActionsPanels) => void
	openedPanel: ActionsPanels | null
}

export function useActionSection() {
	return useContext(ActionSectionContext) as ActionSectionContext
}
