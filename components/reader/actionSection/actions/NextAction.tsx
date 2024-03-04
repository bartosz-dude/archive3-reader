import { useAppTheme } from "../../../ThemeManager"
import IconTitleBtn from "../../../common/IconTitleBtn"
import { useReaderManager } from "../../ReaderManagerNew"
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
				{
					color: isNextChapter()
						? theme.header.font
						: theme.reader.nextChapter.no,
				},
			]}
			textStyle={[
				{
					color: isNextChapter()
						? theme.header.font
						: theme.reader.nextChapter.no,
				},
			]}
			disabled={!isNextChapter() || reader.workStatus !== "success"}
			onPress={() => {
				reader.setChapter((reader.currentChapter.chapter ?? -70) + 1)
			}}
		/>
	)
}
