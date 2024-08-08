import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View } from "react-native"
import ActionButton from "./ActionButton"

const meta = {
	title: "ActionButton",
	component: ActionButton,
	args: {},
} satisfies Meta<typeof ActionButton>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
	args: {
		label: "Button",
	},
}
