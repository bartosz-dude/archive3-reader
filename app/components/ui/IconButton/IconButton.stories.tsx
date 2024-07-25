import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View } from "react-native"
import IconButton from "./IconButton"

const meta = {
	title: "IconButton",
	component: IconButton,
	args: {
		name: "magnify",
		size: 24,
	},
	decorators: [
		(Story) => (
			<View style={{ padding: 16 }}>
				<Story />
			</View>
		),
	],
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}
