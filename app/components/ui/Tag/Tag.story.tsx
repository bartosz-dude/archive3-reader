import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View } from "react-native"
import Tag from "./Tag"

const meta = {
	title: "Tag",
	component: Tag,
	args: {},
} satisfies Meta<typeof Tag>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
	args: {
		content: "Tag",
	},
}
