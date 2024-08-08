import type { Decorator, Preview } from "@storybook/react"
import React from "react"
import { Appearance, View, type ColorSchemeName } from "react-native"
import ThemeProvider from "../services/theming/ThemeProvider"

const withTheme: Decorator = (StoryFn, context) => {
	const scheme = context.parameters.scheme || context.globals.scheme

	return (
		<>
			<ThemeProvider overwriteScheme={scheme}>
				<StoryFn />
			</ThemeProvider>
		</>
	)
}

const withCenter: Decorator = (StoryFn) => {
	return (
		<>
			<View
				style={{
					padding: 16,
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<StoryFn />
			</View>
		</>
	)
}

const preview: Preview = {
	decorators: [withTheme, withCenter],
	globalTypes: {
		scheme: {
			name: "Color Scheme",
			description: "Color scheme for components",
			defaultValue: "light",
			toolbar: {
				icon: "circlehollow",
				items: [
					{ value: "light", icon: "circlehollow", title: "light" },
					{ value: "dark", icon: "circle", title: "dark" },
				],
				showName: true,
			},
		},
	},
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
}

export default preview
