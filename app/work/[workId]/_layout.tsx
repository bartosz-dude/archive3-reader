import { ErrorBoundaryProps, Stack } from "expo-router"
import ReaderManager from "../../../components/reader/ReaderManager"
import { Text, View } from "react-native"
import Header from "../../../components/common/Header"
import StandardHeader from "../../../components/common/StandardHeader"

export default function WorkReaderLayoutNew() {
	return (
		<>
			<ReaderManager>
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
							presentation: "modal",
						}}
					/>
				</Stack>
			</ReaderManager>
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
