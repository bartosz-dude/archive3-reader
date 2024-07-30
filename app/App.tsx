import Constants from "expo-constants"
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"
import { openDatabaseSync } from "expo-sqlite"
import { Suspense } from "react"
import { StyleSheet, Text } from "react-native"
import DbProvider from "./services/db/DbProvider"
import ThemeProvider from "./services/theming/ThemeProvider"
import SearchView from "./views/Search/SearchView"

const db = openDatabaseSync("archive3reader.db")

function App() {
	useDrizzleStudio(db)

	return (
		<ThemeProvider>
			<Suspense fallback={<Text>Loading...</Text>}>
				<DbProvider>
					<SearchView />
				</DbProvider>
			</Suspense>
		</ThemeProvider>
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
