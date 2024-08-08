/** @type{import("@storybook/react-webpack5").StorybookConfig} */
import { StorybookConfig } from "@storybook/react-webpack5"

const main: StorybookConfig = {
	stories: [
		"../components/**/*.stories.mdx",
		"../components/**/*.stories.@(js|jsx|ts|tsx)",
		"../components/**/*.story.@(js|jsx|ts|tsx)",
		"../views/**/*.stories.@(js|jsx|ts|tsx)",
		"../views/**/components/*.stories.@(js|jsx|ts|tsx)",
		"../views/**/*.story.@(js|jsx|ts|tsx)",
		"../services/**/*.story.@(js|jsx|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-react-native-web",
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {},
	},
	docs: {
		autodocs: true,
	},
}

export default main
