## Interface

```typescript
interface WorkSearchQueryAO3 {
// work info
	anyField?: string
	title?: string
	author?: string
	date?: 
		| Date
		| {
			before?: Date
			after?: Date
		}
	completionStatus?: 
		| CompletionStatusAO3
		| "all"
	crossovers?: 
		| "include"
		| "exclude"
		| "only"
	singleChapter?: boolean
	wordCount?: 
		| number
		| {
			from?: number
			to?: number
		}
	language?: LanguagesAO3
	fandoms?: string[]
// work tags
	rating?: RatingAO3
	warnings?: WarningsAO3[]
	categories?: CategoriesAO3[]
	characters?: string[]
	relationsships?: string[]
	additionalTags?: string[]
// work stats
	hits?: 
		| number
		| {
			from?: number
			to?: number
		}
	kudos?: 
		| number
		| {
			from?: number
			to?: number
		}
	comments?: 
		| number
		| {
			from?: number
			to?: number
		}
	bookmarks?: 
		| number
		| {
			from?: number
			to?: number
		}
// search
	sortBy?:
		| "bestMatch"
		| "author"
		| "title"
		| "datePosted"
		| "dateUpdated"
		| "wordCount"
		| "hits"
		| "kudos"
		| "comments"
	sortDirection?:
		| "ascending"
		| "descending"
}
```

## Defaults

| query prop         | default        |
| ------------------ | -------------- |
| `completionStatus` | `"allWorks"`   |
| `crossovers`       | `"include"`    |
| `sortBy`           | `"bestMatch"`  |
| `sortDirection`    | `"descending"` |
