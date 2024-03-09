import { useAppTheme } from "../../../../components/ThemeManager"
import IconTitleBtn from "../../../../components/common/IconTitleBtn"
import { useReaderManager } from "../../../../components/reader/ReaderManagerNew"
import { ActionProps } from "../types"

export default function PreviousAction(props: ActionProps) {
	const theme = useAppTheme()
	const reader = useReaderManager()

	function isPreviousChapter() {
		return (reader.chapters() ?? [])[
			(reader.currentChapter.chapter ?? 0) - 1
		]
			? true
			: false
	}

	return (
		<IconTitleBtn
			name="skip-previous"
			size={props.style.iconSize}
			onLayout={props.onLayout}
			title={props.showTitle ? "Previous" : undefined}
			style={props.style.view}
			iconStyle={[
				isPreviousChapter()
					? props.style.icon
					: props.style.disabled.icon,
				!props.forceStyle
					? {
							color: isPreviousChapter()
								? theme.header.font
								: theme.reader.previousChapter.no,
					  }
					: {},
			]}
			textStyle={[
				isPreviousChapter()
					? props.style.text
					: props.style.disabled.text,
				!props.forceStyle
					? {
							color: isPreviousChapter()
								? theme.header.font
								: theme.reader.previousChapter.no,
					  }
					: {},
			]}
			disabled={!isPreviousChapter() || reader.workStatus !== "success"}
			onPress={() => {
				reader.setChapter((reader.currentChapter.chapter ?? -68) - 1)
			}}
		/>
	)
}
