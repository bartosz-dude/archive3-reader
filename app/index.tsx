import 'react-native-url-polyfill/auto';
import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import workSearchURL from "../services/ao3/scraper/workSearchUrl";
import useAsyncMemo from "../hooks/useAsyncMemo"
import { useEffect } from "react";
import { useSettings } from "../services/appSettings/components/settingsProvider";

export default function RootIndex() {

	const { settings } = useSettings()

	return (
		<>
			<View style={styles.container}>
				<Link href={"/work/48613378/chapter/122623150"} style={{ height: 50, width: 50, backgroundColor: "blue", color: "white" }}>Works</Link>
				<Link href={settings.savedSearchesAsDefault ? "/search/savedSearches" : "/search"} style={{ height: 50, width: 50, backgroundColor: "blue", color: "white" }}>Search</Link>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
})