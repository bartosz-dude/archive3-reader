import { router } from "expo-router"
import { useAppTheme } from "../../../ThemeManager"
import IconTitleBtn from "../../../common/IconTitleBtn"
import { useReaderManager } from "../../ReaderManagerNew"
import { useState } from "react"
import { ActionProps } from "../types"
import { useActionSection } from "../ActionPanelStateProvider"

export default function ChaptersAction(props: ActionProps) {
	const theme = useAppTheme()
	const reader = useReaderManager()
	const actionSection = useActionSection()

	return (
		<IconTitleBtn
			onLayout={props.onLayout}
			disabled={reader.isSingleChapter()}
			name="format-list-numbered"
			size={props.style.iconSize}
			title={props.showTitle ? "Chapters" : undefined}
			style={props.style.view}
			iconStyle={[
				!reader.isSingleChapter()
					? props.style.icon
					: props.style.disabled.icon,
				!props.forceStyle
					? {
							color: !reader.isSingleChapter()
								? theme.header.font
								: theme.reader.previousChapter.no,
					  }
					: {},
			]}
			textStyle={[
				!reader.isSingleChapter()
					? props.style.text
					: props.style.disabled.text,
				!props.forceStyle
					? {
							color: !reader.isSingleChapter()
								? theme.header.font
								: theme.reader.previousChapter.no,
					  }
					: {},
			]}
			onPress={() => {
				router.push("../chapterSelect")
				actionSection.closePanel()
			}}
		/>
	)
}
