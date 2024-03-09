import { useEffect } from "react"
import { useAppTheme } from "../../../components/ThemeManager"
import BtnWithAlert from "../../../components/common/BtnWithAlert"
import StandardHeader from "../../../components/common/StandardHeader"
import { useReaderManager } from "../../../components/reader/ReaderManagerNew"
import useWillUnmount from "../../../hooks/useWillUnmount"

export default function OptionsView() {
	const theme = useAppTheme()
	const reader = useReaderManager()
	const willUnmount = useWillUnmount()

	useEffect(() => {
		reader.endTracking()
		return () => {
			if (willUnmount) {
				reader.startTracking()
			}
		}
	}, [])

	return (
		<>
			<StandardHeader title="Options" />
			<BtnWithAlert
				type="text"
				text="Clear chapter progress"
				textStyle={{ color: theme.common.danger, marginTop: 20 }}
				alert={{
					title: "Are you sure?",
					message:
						"You are attempting to delete chapter progress. This action is permament and unrecoverable. Are you sure you want to continue?",
					ok: {
						text: "Yes",
						style: "destructive",
						onPress: () => {
							const currentChapter = reader.currentChapter.chapter
							if (typeof currentChapter == "number")
								reader.clearChapterProgress(currentChapter)
						},
					},
					cancel: {
						onPress: () => {},
					},
				}}
			/>
		</>
	)
}
