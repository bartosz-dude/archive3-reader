import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View } from "react-native"
import RatingBadge from "./RatingBadge"

const meta = {
	title: "RatingBadge",
	component: RatingBadge,
	args: {},
} satisfies Meta<typeof RatingBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
	args: {
		rating: "generalAudiences",
	},
}
