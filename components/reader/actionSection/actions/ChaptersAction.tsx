import { router } from "expo-router"
import { useAppTheme } from "../../../ThemeManager"
import IconTitleBtn from "../../../common/IconTitleBtn"
import { useReaderManager } from "../../ReaderManagerNew"
import { useState } from "react"
import { ActionProps } from "../types"

export default function ChaptersAction(props: ActionProps) {
	const theme = useAppTheme()
	const reader = useReaderManager()

	return (
		<IconTitleBtn
			onLayout={props.onLayout}
			disabled={reader.isSingleChapter()}
			name="format-list-numbered"
			size={props.style.iconSize}
			title={props.showTitle ? "Chapters" : undefined}
			style={props.style.view}
			iconStyle={[
				{
					color: !reader.isSingleChapter()
						? theme.header.font
						: theme.reader.previousChapter.no,
				},
			]}
			textStyle={[
				{
					color: !reader.isSingleChapter()
						? theme.header.font
						: theme.reader.previousChapter.no,
				},
			]}
			onPress={() => {
				router.push("../chapterSelect")
			}}
		/>
	)
}
