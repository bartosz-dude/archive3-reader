import { Slot } from "expo-router"
import { Text, View } from "react-native"
import { useAppTheme } from "../../../../components/ThemeManager"
import AppHeader from "../../../../components/common/AppHeader"
import Loaded from "../../../../components/common/Loaded"
import LoadingIndicator from "../../../../components/common/LoadingIndicator"
import ReaderHeader from "../../../../components/reader/ReaderHeader"
import { useReaderManager } from "../../../../components/reader/ReaderManagerNew"
import ReaderTabs from "../../../../components/reader/ReaderTabs"
import useLoadingHandler from "../../../../hooks/useLoadingHandler"
import { LoadingStatusText } from "../../../../types/common"
import ReaderActionSection from "../../../../components/reader/actionSection/ReaderActionSection"

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
				{/* <View
					style={{
						height: "80%",
						flexShrink: 1,
						flexGrow: 1,
						// maxHeight: "80%",
					}}
				> */}
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
				{/* </View> */}
				{/* <Loaded
					isLoading={readerUILoading}
					loading={
						<View
							style={{
								backgroundColor: theme.header.background,
								paddingHorizontal: 20,
								paddingVertical: 10,
								borderTopColor: theme.header.accent,
								borderTopWidth: 1,
							}}
						>
							<View style={{ height: 24 }} />
							<Text />
						</View>
					}
				> */}
				{/* <ReaderTabs /> */}
				<ReaderActionSection />
				{/* </Loaded> */}
			</View>
		</>
	)
}
