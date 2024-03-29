import { Switch, Text, View } from "react-native"
import { useSettings } from "../services/appSettings/components/settingsProvider"
import Foreach from "../components/common/Foreach"
import Header from "../components/common/Header"
import BackBtn from "../components/common/BackBtn"
import SettingsSwitch from "../components/settings/settingsSwitch"
import useStyle from "../hooks/useStyle"
import { ScrollView } from "react-native"
import { Link } from "expo-router"
import SettingsCategoryTitle from "../components/settings/settingsCategoryTitle"
import SettingsEntry from "../components/settings/settingsEntry"

export default function SettingsPage() {
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
			<Header>
				<BackBtn />
				<Text style={{ color: "white" }}>Settings</Text>
				<View style={{ width: 32 }} />
			</Header>
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
					</View>
				</View>
			</ScrollView>
		</>
	)
}
