import type { Meta, StoryObj } from "@storybook/react"
import SearchBar from "./SearchBar"
import SearchService from "../../../../services/search/SearchService"
import {
	searchContext,
	useSearch,
} from "../../../../services/search/SearchProvider"
// import { useState } from "react"
import { useArgs, useEffect, useState, useRef } from "@storybook/preview-api"
import type { WorkSearchQueryAO3 } from "../../../../api/ao3Wrapper/types/worksSearchQuery"

type SearchBarMeta = React.ComponentProps<typeof SearchBar> & {
	query: WorkSearchQueryAO3
}

const meta: Meta<SearchBarMeta> = {
	title: "SearchBar",
	component: SearchBar,
	args: {
		query: {},
	},
	decorators: [
		(StoryFn) => {
			const [{ query }, updateArgs] = useArgs()
			const prevQuery = useRef<any>({})

			const search = useSearch()

			useEffect(() => {
				search.updateQuery(query)
			}, [query])

			return (
				<>
					<StoryFn />
				</>
			)
		},
		(StoryFn) => {
			const [searchQuery, setSearchQuery] =
				useState<WorkSearchQueryAO3 | null>(null)
			return (
				<>
					<searchContext.Provider
						value={{
							fetchQuery(query, properties) {
								throw new Error(
									"can't fetch a query, this is a story"
								)
							},
							updateQuery(query) {
								console.log("update")
								setSearchQuery((prev) => ({
									...(prev ?? {}),
									...query,
								}))
							},
							query: searchQuery,
							status: "complete",
						}}
					>
						<StoryFn />
					</searchContext.Provider>
					{/* </SearchService> */}
				</>
			)
		},
	],
} satisfies Meta<typeof SearchBar>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}
