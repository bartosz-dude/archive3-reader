import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View } from "react-native"
import Label from "./Label"

const meta = {
	title: "Label",
	component: Label,
	args: {},
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
	args: {
		content: "Content",
		label: "Label",
	},
}
