import { Switch, Text, View } from "react-native"
import { useSettings } from "../services/appSettings/components/settingsProvider"
import Foreach from "../components/common/Foreach"
import AppHeader from "../components/common/AppHeader"
import BackBtn from "../components/common/BackBtn"
import SettingsSwitch from "../components/settings/settingsSwitch"
import useStyle from "../hooks/useStyle"
import { ScrollView } from "react-native"
import { Link } from "expo-router"
import SettingsCategoryTitle from "../components/settings/settingsCategoryTitle"
import SettingsEntry from "../components/settings/settingsEntry"
import BtnWithAlert from "../components/common/BtnWithAlert"
import clearReadingData from "../services/saver/api/clearReadingData"
import { useAppTheme } from "../components/ThemeManager"

export default function SettingsPage() {
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
							<Text>version: 0.3.0</Text>
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
				</View>
			</ScrollView>
		</>
	)
}
