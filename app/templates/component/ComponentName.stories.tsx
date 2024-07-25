import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View } from "react-native"
import ComponentName from "./ComponentName"

const meta = {
	title: ComponentName.name,
	component: ComponentName,
	args: {},
	decorators: [
		(Story) => (
			<View style={{ padding: 16 }}>
				<Story />
			</View>
		),
	],
} satisfies Meta<typeof ComponentName>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}
