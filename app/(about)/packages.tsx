import React, { useMemo, useRef } from "react"
import { ScrollView } from "react-native-gesture-handler"
import Foreach from "../../components/common/Foreach"
import { Text, View } from "react-native"
import { Link } from "expo-router"
import { ExternalLink } from "../../components/ExternalLink"
import AppHeader from "../../components/common/AppHeader"
import BackBtn from "../../components/common/btns/BackBtn"
import useStyle from "../../hooks/useStyle"
import * as licenses from "../../licenses.json"

export default function PackagesPage() {
	const packages = useRef([
		"@expo/vector-icons",
		"@react-native-async-storage/async-storage",
		"@react-navigation/native",
		"domhandler",
		"domutils",
		"expo",
		"expo-asset",
		"expo-dev-client",
		"expo-file-system",
		"expo-font",
		"expo-linking",
		"expo-router",
		"expo-splash-screen",
		"expo-sqlite",
		"expo-status-bar",
		"expo-system-ui",
		"expo-web-browser",
		"fast-hash-code",
		"htmlparser2",
		"react",
		"react-dom",
		"react-native",
		"react-native-big-list",
		"react-native-gesture-handler",
		"react-native-popup-menu",
		"react-native-reanimated",
		"react-native-safe-area-context",
		"react-native-screens",
		"react-native-web",
		"react-native-webview",
		"@babel/core",
		"@types/react",
		"expo-dev-client",
		"jest",
		"jest-expo",
		"react-native-url-polyfill",
		"react-test-renderer",
		"typescript",
	])

	const style = useStyle({
		packageLink: {
			paddingHorizontal: 10,
			paddingVertical: 10,
		},
	})

	// const a = licenses
	// const b = Object.entries(a)

	return (
		<>
			<AppHeader>
				<BackBtn />
				<Text style={{ color: "white" }}>Packages</Text>
				<View style={{ width: 32 }} />
			</AppHeader>
			<ScrollView>
				<Foreach
					// @ts-expect-error
					list={Object.entries(licenses.default as typeof licenses)}
					each={(item, i) => (
						<View
							key={i}
							style={style.packageLink}
						>
							<ExternalLink href={item[1].licenseUrl}>
								{item[0]}
							</ExternalLink>
						</View>
					)}
					separator={(key) => (
						<View
							key={key}
							style={{
								borderColor: "grey",
								borderTopWidth: 1,
								marginHorizontal: 10,
							}}
						></View>
					)}
				/>
			</ScrollView>
		</>
	)
}
