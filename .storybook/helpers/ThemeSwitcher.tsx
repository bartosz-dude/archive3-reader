import React, { useEffect } from "react"
import { Appearance, type ColorSchemeName } from "react-native"

interface ThemeSwitcherProps {
	scheme: ColorSchemeName
	children: JSX.Element
}

export default function ThemeSwitcher({
	scheme,
	children,
}: ThemeSwitcherProps) {
	useEffect(() => {
		console.log("color", scheme)
		Appearance.setColorScheme(scheme)
	}, [scheme])
	return <>{children}</>
}
