import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react"
import { Appearance } from "react-native"
import { ColorTheme } from "../types/colorTheme"
import * as light from "../assets/themes/light.json"

const ThemeContext = createContext<unknown>(null)

export default function ThemeManager(props: {} & PropsWithChildren) {
	const [colors, setColors] = useState(Appearance.getColorScheme() ?? "light")
	const [theme, setTheme] = useState(light)

	Appearance.addChangeListener((e) => {
		setColors(e.colorScheme ?? "light")
	})

	useEffect(() => {
		if (colors == "light") setTheme(light)

		if (colors == "dark") setTheme(light)
	}, [colors])

	return (
		<ThemeContext.Provider value={theme}>
			{props.children}
		</ThemeContext.Provider>
	)
}

type ThemeManagerContext = ColorTheme

export function useTheme() {
	return useContext(ThemeContext) as ThemeManagerContext
}
