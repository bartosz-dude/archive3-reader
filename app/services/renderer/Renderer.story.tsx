import type { Meta, StoryObj } from "@storybook/react"
import Renderer from "./Renderer"
import RendererProvider from "./RendererProvider"

const meta = {
	title: "Renderer",
	component: Renderer,
	args: {},
	decorators: [
		(StoryFn) => (
			<>
				<RendererProvider>
					<StoryFn />
				</RendererProvider>
			</>
		),
	],
} satisfies Meta<typeof Renderer>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
	args: {
		html: "<p>Night City, it's a place of endless wonders and horrors. Opportunities and dangers, but before Motoko Kusanagi can access any of them. She first has to build up enough strength to walk again. Learn the basics of living in a world that was just a game to her before. Good thing she found a Shard hidden in her stuff that opens the door of opportunity. But like all opportunities in Night City, it usually ends up in a gunfight.</p><p>Self-Insert with a modified Cyberpunk 2077 Gamer System. Not a direct Ghost in the Shell Crossover. MC just happens to share the name.</p><p>&nbsp;</p><p>Update schedule is every fourth day.</p>",
	},
}
