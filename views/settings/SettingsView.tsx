import { Link } from "expo-router"
import { View, ScrollView, Text } from "react-native"
import * as app from "../../app.json"
import { useAppTheme } from "../../components/ThemeManager"
import AppHeader from "../../components/common/AppHeader"
import BackBtn from "../../components/common/BackBtn"
import BtnWithAlert from "../../components/common/BtnWithAlert"
import SettingsCategoryTitle from "./settingsCategoryTitle"
import SettingsEntry from "./settingsEntry"
import SettingsSwitch from "./settingsSwitch"
import useStyle from "../../hooks/useStyle"
import resetSettings from "../../services/appSettings/api/resetSettings"
import { useSettings } from "../../services/appSettings/components/settingsProvider"
import clearReadingData from "../../services/saver/api/clearReadingData"

export default function SettingsView() {
	const theme = useAppTheme()
	const { settings, update } = useSettings()

	const style = useStyle({
		settingsList: {
			paddingHorizontal: 10,
			paddingVertical: 10,
		},
		aboutView: {
			// 	paddingHorizontal: 10,
			// 	paddingVertical: 10,
		},
		aboutList: {
			// 	display: "flex",
			// 	gap: 10,
			// 	paddingTop: 5,
		},
	})

	return (
		<>
			<AppHeader>
				<BackBtn />
				<Text style={{ color: "white" }}>Settings</Text>
				<View style={{ width: 32 }} />
			</AppHeader>
			<ScrollView>
				<View style={style.settingsList}>
					<SettingsSwitch
						text="Saved searches as default when opening search tab"
						value={settings.savedSearchesAsDefault}
						onValueChange={() =>
							update({
								savedSearchesAsDefault:
									!settings.savedSearchesAsDefault,
							})
						}
					/>
				</View>
				<View style={style.aboutView}>
					<SettingsCategoryTitle>
						<Text>Reader</Text>
					</SettingsCategoryTitle>
					<View style={style.aboutList}>
						<SettingsEntry>
							<SettingsSwitch
								text="Always hide actions titles"
								value={
									settings.readerFormat.actionBarLayout
										.alwaysHideTitles
								}
								onValueChange={() =>
									update({
										readerFormat: {
											...settings.readerFormat,
											actionBarLayout: {
												alwaysHideTitles:
													!settings.readerFormat
														.actionBarLayout
														.alwaysHideTitles,
											},
										},
									})
								}
							/>
							{/* <Link href={`/packages`}>Packages</Link> */}
						</SettingsEntry>
						{/* <SettingsEntry>
							<Link href={`/license`}>License</Link>
						</SettingsEntry> */}
						{/* <SettingsEntry>
							<Link href={`/credits`}>Credits</Link>
						</SettingsEntry>
						<SettingsEntry>
							<Text>version: {app.expo.version}</Text>
						</SettingsEntry> */}
					</View>
				</View>
				<View style={style.aboutView}>
					<SettingsCategoryTitle>
						<Text>About</Text>
					</SettingsCategoryTitle>
					<View style={style.aboutList}>
						<SettingsEntry>
							<Link href={`/packages`}>Packages</Link>
						</SettingsEntry>
						{/* <SettingsEntry>
							<Link href={`/license`}>License</Link>
						</SettingsEntry> */}
						<SettingsEntry>
							<Link href={`/credits`}>Credits</Link>
						</SettingsEntry>
						<SettingsEntry>
							<Text>version: {app.expo.version}</Text>
						</SettingsEntry>
					</View>
				</View>
				<View>
					<SettingsCategoryTitle>
						<Text style={{ color: theme.common.danger }}>
							Danger zone
						</Text>
					</SettingsCategoryTitle>
					<SettingsEntry>
						<BtnWithAlert
							type="text"
							text="Clear reading data"
							textStyle={{ color: theme.common.danger }}
							alert={{
								title: "Are you sure?",
								message:
									"You are attempting to delete all reading data. This includes reading history, reading progress and saved works. This action is permament and unrecoverable. Are you sure you want to continue?",
								ok: {
									text: "Yes",
									style: "destructive",
									onPress: () => {
										clearReadingData()
									},
								},
								cancel: {
									onPress: () => {},
								},
							}}
						/>
					</SettingsEntry>
					<SettingsEntry>
						<BtnWithAlert
							type="text"
							text="Reset settings"
							textStyle={{ color: theme.common.danger }}
							alert={{
								title: "Are you sure?",
								message:
									"You are attempting to reset app settings. This action is permament and unrecoverable. Are you sure you want to continue?",
								ok: {
									text: "Yes",
									style: "destructive",
									onPress: () => {
										resetSettings()
									},
								},
								cancel: {
									onPress: () => {},
								},
							}}
						/>
					</SettingsEntry>
				</View>
			</ScrollView>
		</>
	)
}
