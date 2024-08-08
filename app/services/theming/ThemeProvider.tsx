import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react"
import { Appearance, type ColorSchemeName } from "react-native"

interface ThemeProviderProps {
	overwriteScheme?: ColorSchemeName
	children: ReactNode
}

interface ThemeContext {
	scheme: ColorSchemeName
}

const themeContext = createContext<ThemeContext>({
	scheme: "light",
})

export default function ThemeProvider({
	overwriteScheme,
	children,
}: ThemeProviderProps) {
	const [scheme, setScheme] = useState<ColorSchemeName>(
		overwriteScheme ?? Appearance.getColorScheme()
	)

	useEffect(() => {
		const sub = Appearance.addChangeListener((p) => {
			if (!overwriteScheme) {
				setScheme(p.colorScheme)
			}
		})

		return () => {
			sub.remove()
		}
	}, [])

	return (
		<>
			<themeContext.Provider value={{ scheme: scheme }}>
				{children}
			</themeContext.Provider>
		</>
	)
}

export function useTheme() {
	return useContext(themeContext)
}
