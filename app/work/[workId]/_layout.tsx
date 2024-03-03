import { ErrorBoundaryProps, Stack } from "expo-router"
import ReaderManager from "../../../components/reader/ReaderManager"
import { Text, View } from "react-native"
import AppHeader from "../../../components/common/AppHeader"
import StandardHeader from "../../../components/common/StandardHeader"
import ReaderFormatter from "../../../components/reader/ReaderFormatter"
import ReaderManagerNew from "../../../components/reader/ReaderManagerNew"

export default function WorkReaderLayoutNew() {
	return (
		<>
			<ReaderManagerNew>
				{/* <ReaderManager> */}
				<ReaderFormatter>
					<Stack
						screenOptions={{
							animation: "none",
						}}
					>
						<Stack.Screen
							name="chapter"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="chapterSelect"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="options"
							options={{
								headerShown: false,
							}}
						/>
					</Stack>
				</ReaderFormatter>
				{/* </ReaderManager> */}
			</ReaderManagerNew>
		</>
	)
}

// when using it, chapterSelect page goes into loading loop
// export function ErrorBoundary(props: ErrorBoundaryProps) {
// 	return (
// 		<View>
// 			<StandardHeader title="Error" />
// 			{/* <Text>{props.error.message}</Text> */}
// 			<Text>Something went wrong</Text>
// 		</View>
// 	)
// }
