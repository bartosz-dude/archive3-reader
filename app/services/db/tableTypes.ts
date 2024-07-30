export interface SavedSearchesTable {
	id: number
	query: string
}

export interface SearchCacheTable {
	id: number
	session_id: number
	page: number
	results: string
}

export interface SearchSessionsTable {
	id: number
	date: string
	saved_search_id: number | null
	query: string | null
}
