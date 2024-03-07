import { useReducer } from "react"
import { ScrollView, View } from "react-native"
import useStyle from "../../../../hooks/useStyle"
import { useAppTheme } from "../../../ThemeManager"
import Show from "../../../common/Show"
import FormatCategory from "./formatPanelHelpers/FormatCategory"
import DisplayView from "./formatPanelViews/DisplayView"
import FontsView from "./formatPanelViews/FontsView"
import SpacingView from "./formatPanelViews/SpacingView"
import { usePanelMemory } from "../ActionsPanelMemoryProvider"

export type FormatPanelViews = "fonts" | "spacing" | "display"

export default function FormatPanel(props: {}) {
	const theme = useAppTheme()
	const panelMemory = usePanelMemory()

	const [openedView, setOpenedView] = useReducer(
		(state: FormatPanelViews, action: FormatPanelViews) => {
			panelMemory.current.formatPanel.currentView = action
			return action
		},
		panelMemory.current.formatPanel.currentView
	)

	const style = useStyle({
		content: {
			backgroundColor: theme.header.background,
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-evenly",
			paddingHorizontal: 20,
			paddingVertical: 10,
			borderTopColor: theme.header.accent,
			borderTopWidth: 1,
		},
		formatEditorTabs: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-evenly",
			paddingVertical: 10,
			backgroundColor: theme.header.background,
		},
		formatEditorContent: {
			paddingHorizontal: 15,
			display: "flex",
			flexDirection: "row",
			gap: 15,
		},
	})

	return (
		<>
			<View style={style.formatEditorTabs}>
				<FormatCategory
					title="Fonts"
					view="fonts"
					openedView={openedView}
					onPress={() => setOpenedView("fonts")}
				/>
				<FormatCategory
					title="Spacing"
					view="spacing"
					openedView={openedView}
					onPress={() => setOpenedView("spacing")}
				/>
				<FormatCategory
					title="Display"
					view="display"
					openedView={openedView}
					onPress={() => setOpenedView("display")}
				/>
			</View>
			<ScrollView
				style={{
					minHeight: 200,
				}}
				contentContainerStyle={style.formatEditorContent}
				persistentScrollbar
			>
				<Show when={openedView == "fonts"}>
					<FontsView />
				</Show>
				<Show when={openedView == "spacing"}>
					<SpacingView />
				</Show>
				<Show when={openedView == "display"}>
					<DisplayView />
				</Show>
			</ScrollView>
		</>
	)
}
