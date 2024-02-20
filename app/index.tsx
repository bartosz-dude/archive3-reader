import { Link, Redirect } from "expo-router"
import { View, StyleSheet } from "react-native"
import workSearchURL from "../services/ao3/tools/workSearchUrl"
import useAsyncMemo from "../hooks/useAsyncMemo"
import { useEffect } from "react"
import { useSettings } from "../services/appSettings/components/settingsProvider"

export default function RootIndex() {
	return (
		<>
			<Redirect href={"/search"} />
		</>
	)
}
