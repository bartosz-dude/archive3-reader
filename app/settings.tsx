import { Switch, Text, View } from "react-native"
import { useSettings } from "../services/appSettings/components/settingsProvider"
import Foreach from "../components/common/Foreach"

export default function SettingsPage() {

	const { settings, update } = useSettings()

	return (
		<>
			<Text>Settings</Text>
			<Text>Saved searches as default when opening search tab</Text>
			<Switch
				onValueChange={() => update({ savedSearchesAsDefault: !settings.savedSearchesAsDefault })}
				value={settings.savedSearchesAsDefault}
			/>
			{/* <Foreach
				list={Object.entries(settings)}
				each={([ k, v ], i) => {
					// console.log(k, v)
					return (
						<View key={i}>
							<Text>{k}</Text>
							<Switch
								value={v}
							/>
						</View>
					)
				}}
			/> */}
		</>
	)
}