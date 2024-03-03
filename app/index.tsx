import { Link, Redirect } from "expo-router"
import { View, StyleSheet, Text } from "react-native"
import workSearchURL from "../services/ao3/tools/workSearchUrl"
import useAsyncMemo from "../hooks/useAsyncMemo"
import { useEffect } from "react"
import { useSettings } from "../services/appSettings/components/settingsProvider"

export default function RootIndex() {
	return (
		<>
			{/* <Text>You're not supposed to be here</Text> */}
			<Redirect href={"/search"} />
		</>
	)
}
