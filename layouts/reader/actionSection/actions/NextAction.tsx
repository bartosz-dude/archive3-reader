import { useAppTheme } from "../../../../components/ThemeManager"
import IconTitleBtn from "../../../../components/common/IconTitleBtn"
import { useReaderManager } from "../../../../components/reader/ReaderManagerNew"
import { ActionProps } from "../types"

export default function NextAction(props: ActionProps) {
	const theme = useAppTheme()
	const reader = useReaderManager()

	function isNextChapter() {
		return (reader.chapters() ?? [])[
			(reader.currentChapter.chapter ?? 0) + 1
		]
			? true
			: false
	}

	return (
		<IconTitleBtn
			name="skip-next"
			size={props.style.iconSize}
			onLayout={props.onLayout}
			title={props.showTitle ? "Next" : undefined}
			style={props.style.view}
			iconStyle={[
				isNextChapter() ? props.style.icon : props.style.disabled.icon,
				!props.forceStyle
					? {
							color: isNextChapter()
								? theme.header.font
								: theme.reader.previousChapter.no,
					  }
					: {},
			]}
			textStyle={[
				isNextChapter() ? props.style.text : props.style.disabled.text,
				!props.forceStyle
					? {
							color: isNextChapter()
								? theme.header.font
								: theme.reader.previousChapter.no,
					  }
					: {},
			]}
			disabled={!isNextChapter() || reader.workStatus !== "success"}
			onPress={() => {
				reader.setChapter((reader.currentChapter.chapter ?? -70) + 1)
			}}
		/>
	)
}
