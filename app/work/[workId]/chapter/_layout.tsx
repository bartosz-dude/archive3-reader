import { Slot } from "expo-router"
import { Text, View } from "react-native"
import { useAppTheme } from "../../../../components/ThemeManager"
import AppHeader from "../../../../components/common/AppHeader"
import LoadingIndicator from "../../../../components/common/LoadingIndicator"
import { useReaderManager } from "../../../../components/reader/ReaderManagerNew"
import ReaderHeader from "../../../../layouts/reader/ReaderHeader"
import ActionPanelStateProvider from "../../../../layouts/reader/actionSection/ActionPanelStateProvider"
import ReaderActionSection from "../../../../layouts/reader/actionSection/ReaderActionSection"
import Loaded from "../../../../libs/react-native-loaded/components/Loaded"
import useLoadingHandler from "../../../../libs/react-native-loaded/hooks/useLoadingHandler"
import { LoadingStatusText } from "../../../../libs/react-native-loaded/types/loadedTypes"

export default function ChapterReaderLayout() {
	const theme = useAppTheme()
	const readerNew = useReaderManager()

	const readerUILoading = useLoadingHandler([
		readerNew.metaStatus,
		readerNew.localWorkStatus,
	])

	const workLoading = useLoadingHandler([
		readerUILoading as LoadingStatusText,
		readerNew.workStatus,
	])

	return (
		<>
			<ActionPanelStateProvider>
				<View
					style={{
						display: "flex",
						height: "100%",
					}}
				>
					<Loaded
						isLoading={readerUILoading}
						loading={
							<>
								<AppHeader>
									<View>
										<Text></Text>
										<Text></Text>
									</View>
								</AppHeader>
							</>
						}
					>
						<ReaderHeader />
					</Loaded>
					<Loaded
						isLoading={workLoading}
						loading={
							<View style={{ flexGrow: 1 }}>
								<LoadingIndicator />
							</View>
						}
					>
						<Slot />
					</Loaded>
					<ReaderActionSection />
				</View>
			</ActionPanelStateProvider>
		</>
	)
}
