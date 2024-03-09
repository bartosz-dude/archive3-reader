import * as WebBrowser from "expo-web-browser"
import workUrl from "../../../../services/ao3/tools/workUrl"
import { ActionProps } from "../types"
import { useAppTheme } from "../../../../components/ThemeManager"
import IconTitleBtn from "../../../../components/common/IconTitleBtn"
import { useReaderManager } from "../../../../components/reader/ReaderManagerNew"

export default function OriginalAction(props: ActionProps) {
	const theme = useAppTheme()
	const reader = useReaderManager()

	return (
		<IconTitleBtn
			name="web"
			size={props.style.iconSize}
			onLayout={props.onLayout}
			title={props.showTitle ? "Original" : undefined}
			style={props.style.view}
			iconStyle={props.style.icon}
			textStyle={props.style.text}
			onPress={() => {
				WebBrowser.openBrowserAsync(
					workUrl(
						reader.meta.workId ?? -1,
						(() => {
							const currentChapter = reader.currentChapter
							return currentChapter.id
								? currentChapter.id.toString()
								: "first"
						})()
					).href,
					{
						toolbarColor: theme.header.background,
					}
				)
			}}
		/>
	)
}
