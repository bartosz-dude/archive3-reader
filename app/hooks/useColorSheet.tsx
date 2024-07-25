import { useEffect, useState } from "react"
import { Appearance } from "react-native"
import { merge } from "ts-deepmerge"
import { useTheme } from "../services/theming/ThemeProvider"

export default function useColorSheet<
	T extends Record<string, any>,
	K extends Record<string, any>,
	I extends Record<string, any>
>(light: T, dark: K, shared?: I) {
	const theme = useTheme()

	const [colorSchemeSheet, setColorSchemeSheet] = useState<(T | K) & I>(
		merge(shared ?? {}, light) as (T | K) & I
	)
	useEffect(() => {
		switch (theme.scheme) {
			case "dark": {
				setColorSchemeSheet(merge(shared ?? {}, dark) as (T | K) & I)
				break
			}
			case "light": {
				setColorSchemeSheet(merge(shared ?? {}, light) as (T | K) & I)
				break
			}
		}
	}, [])

	useEffect(() => {
		console.log("color", colorSchemeSheet)
	}, [colorSchemeSheet])

	return colorSchemeSheet
}
