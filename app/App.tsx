import { ScrollView, StyleSheet, Text, View } from "react-native"
import Constants from "expo-constants"
import IconButton from "./components/ui/IconButton/IconButton"
import { useEffect, useState } from "react"
import type { WorkAO3 } from "./api/ao3Wrapper/types/work"
import fetchWork from "./api/ao3Wrapper/methods/fetchWork"
import queryWorks from "./api/ao3Wrapper/methods/queryWorks"

function App() {
	const [response, setResponse] = useState<any>()

	useEffect(() => {
		const a = async () => {
			const b = await queryWorks({
				fandoms: ["Miraculous Ladybug"],
				page: 2,
			})
			setResponse(b)
		}

		a()
	}, [])

	return (
		<View style={styles.container}>
			{/* <Text>Open up App.tsx to start working on your app!</Text> */}
			<ScrollView>
				<Text>{JSON.stringify(response, undefined, "  ")}</Text>
			</ScrollView>
			<IconButton name="magnify" />
		</View>
	)
}

let AppEntryPoint = App

if (Constants.expoConfig?.extra?.storybookEnabled === "true") {
	AppEntryPoint = require("./.ondevice").default
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
})

export default AppEntryPoint
