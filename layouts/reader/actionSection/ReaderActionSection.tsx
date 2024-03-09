import { createContext, useContext, useReducer } from "react"
import { View } from "react-native"
import useLoadingHandler from "../../../hooks/useLoadingHandler"
import ActionBar from "./ActionsBar"
import ActionsDrawer from "./ActionsDrawer"
import ActionsPanel from "./ActionsPanel"
import { ActionsPanels } from "./types"
import ActionDrawerWrapper from "./wrappers/ActionsDrawerWrapper"
import ActionPanelStateProvider from "./ActionPanelStateProvider"
import { useAppTheme } from "../../../components/ThemeManager"
import { useReaderManager } from "../../../components/reader/ReaderManagerNew"
import Loaded from "../../../components/common/Loaded"

export default function ReaderActionSection() {
	const theme = useAppTheme()
	const reader = useReaderManager()

	const readerUILoading = useLoadingHandler([
		reader.metaStatus,
		reader.localWorkStatus,
	])

	return (
		<>
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
				<ActionsPanel />
				<View
					style={{
						minHeight: 60,
					}}
				>
					<ActionDrawerWrapper>
						<ActionBar />
					</ActionDrawerWrapper>
					{/* <Show when={openedPanel != "actionsDrawer"}> */}
					{/* </Show> */}
					{/* <Show when={openedPanel == "actionsDrawer"}>
							<ActionDrawerWrapper> */}
					{/* <ActionBar /> */}
					{/* <ActionsDrawer />
							</ActionDrawerWrapper>
						</Show> */}
				</View>
			</Loaded>
		</>
	)
}
