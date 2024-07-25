import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { View } from "react-native"
import CompactResult from "./CompactResult"

const meta = {
	title: "CompactResult",
	component: CompactResult,
	args: {},
} satisfies Meta<typeof CompactResult>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
	args: {
		author: [
			{
				pseudo: "Seras0",
				user: "Seras0",
			},
		],
		chapters: {
			current: 200,
			// total: 3,
		},
		date: new Date("24 Jul 2024"),
		hits: 679675,
		kudos: 8473,
		rating: "generalAudiences",
		summary:
			"<p>Night City, it's a place of endless wonders and horrors. Opportunities and dangers, but before Motoko Kusanagi can access any of them. She first has to build up enough strength to walk again. Learn the basics of living in a world that was just a game to her before. Good thing she found a Shard hidden in her stuff that opens the door of opportunity. But like all opportunities in Night City, it usually ends up in a gunfight.</p><p>Self-Insert with a modified Cyberpunk 2077 Gamer System. Not a direct Ghost in the Shell Crossover. MC just happens to share the name.</p><p>&nbsp;</p><p>Update schedule is every fourth day.</p>",
		title: "Ghost in the City",
		words: 718015,
	},
}
