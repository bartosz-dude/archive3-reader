import { Slot } from "expo-router"
import { Text, View } from "react-native"
import { useAppTheme } from "../../../../components/ThemeManager"
import AppHeader from "../../../../components/common/AppHeader"
import Loaded from "../../../../components/common/Loaded"
import LoadingIndicator from "../../../../components/common/LoadingIndicator"
import ReaderHeader from "../../../../components/reader/ReaderHeader"
import { useReaderManager } from "../../../../components/reader/ReaderManagerNew"
import ReaderTabs from "../../../../components/reader/ReaderTabs"

export default function ChapterReaderLayout() {
	const theme = useAppTheme()
	const readerNew = useReaderManager()

	return (
		<>
			<View
				style={{
					display: "flex",
					height: "100%",
				}}
			>
				<Loaded
					isLoading={readerNew.metaStatus}
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
					isLoading={readerNew.workStatus}
					loading={
						<View style={{ flexGrow: 1 }}>
							<LoadingIndicator />
						</View>
					}
				>
					<Slot />
				</Loaded>
				{/* </View> */}
				<Loaded
					isLoading={readerNew.metaStatus}
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
				>
					<ReaderTabs />
				</Loaded>
			</View>
		</>
	)
}
