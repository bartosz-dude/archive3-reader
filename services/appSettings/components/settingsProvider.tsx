import { createContext, useContext, useEffect, useState } from "react"
import { Settings } from "../types/settings"
import useLoading from "../../../hooks/useLoading"
import getSettings from "../api/getSettings"
import saveSettings from "../api/saveSettings"
import { DeepPartial } from "../../../types/common"

interface SettingsContextData {
	settings: Settings
	update: (newSettings: DeepPartial<Settings>) => void
}

// @ts-ignore
const SettingsContext = createContext<SettingsContextData>(null)

export function SettingsProvider(props: { children: JSX.Element }) {
	const [settingsData, setSettingsData] = useState<Settings | null>(null)
	const [updater, setUpdater] = useState(false)

	const settings = useLoading(getSettings, [updater])

	useEffect(() => {
		if (settings.data) setSettingsData(settings.data)
	}, [settings.data])

	const update = (newSettings: DeepPartial<Settings>) => {
		saveSettings(newSettings).then(() => setUpdater((prev) => !prev))
	}

	if (settingsData)
		return (
			<SettingsContext.Provider
				value={{ settings: settingsData, update: update }}
			>
				{props.children}
			</SettingsContext.Provider>
		)
}

export function useSettings() {
	return useContext(SettingsContext)
}
