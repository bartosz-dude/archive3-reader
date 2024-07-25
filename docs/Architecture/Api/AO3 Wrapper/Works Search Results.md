work gifts are not yet supported
## Interface

```typescript
interface WorksSearchResultsAO3 {
	results: {
		id: number
		title: string
		author: {
			user: string
			pseudo: string
		}[]
		date: Date
		fandoms: string[]
		rating: RatingAO3
		warning: WarningAO3[]
		category: CategoryAO3[]
		completionStatus: CompletionStatusAO3
		tags: {
			warnings?: string[]
			characters?: string[]
			relationships?: string[]
			freeforms?: string[]
		}
		summary: string // html string
		series: {
			part: number
			title: string
			id: number
		}[]
		stats: {
			language: LanguagesAO3
			words: number
			chapters: {
				current: number
				total?: number
			}
			comments?: number
			kudos?: number
			bookmarks?: number
			hits?: number
		}
	}[]
	page: number
	totalPages: number
}
```

## Quirks

- `date` property either represents the creation date, when there's only one chapter, or the update date.
- `warnings` exist twice, in the warnings and tags, though tags are separated
- when no results are found `page` and `totalPages` will be 0