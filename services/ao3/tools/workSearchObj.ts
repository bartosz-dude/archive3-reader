import { AO3WorkSearchQuery, CategoriesIds, CategoriesIdsReversed, Rating, RatingIdsReversed, SortByValues, SortByValuesReversed, WarningsIds, WarningsIdsReversed } from "../types/workSearch"

export default function workSearchObj(url: URL) {

	const params = Array.from(url.searchParams.entries()).reduce((params, [ k, v ]) => {

		// url.searchParams.forEach((v, k) => {
		// console.log("searchParams", k, v)
		if (k == "commit")
			return params

		const trueKey = k.replace(/^work_search\[(?=\w+\])/, "").replace(/(?<=\w)\]/, "")

		// console.log("trueKey", trueKey)

		if (trueKey.match(/\[\]$/)) {
			const arrayedKey = trueKey.replace(/\[\]$/, "")
			const matchedKey = matchKey(arrayedKey)

			if (params.has(matchKey)) {
				params.set(matchedKey, [])
			}

			(params.get(matchedKey) as string[]).push(v)
			return params
		}

		const arrayedKey = trueKey.replace(/\[\]$/, "")
		const matchedKey = matchKey(arrayedKey)

		params.set(matchedKey, v)
		return params

	}, new Map())

	function matchKey(key: string) {
		switch (key) {
			case "query": return "anyField"
			case "title": return "title"
			case "creators": return "authorArtist"
			case "revised_at": return "date"
			case "complete": return "completionStatus"
			case "crossover": return "crossovers"
			case "word_count": return "wordCount"
			case "language_id": return "language"
			case "fandom_names": return "fandoms"
			case "archive_warning_ids": return "warnings"
			case "category_ids": return "categories"
			case "character_names": return "characters"
			case "relationship_names": return "relationships"
			case "freeform_names": return "additionalTags"
			case "hits": return "hits"
			case "kudos_count": return "kudos"
			case "comments_count": return "comments"
			case "bookmarks_count": return "bookmarks"
			case "sort_column": return "sortBy"
			case "sort_direction": return "sortDirection"
			case "single_chapter": return "singleChapter"
		}
	}

	const queryObj: AO3WorkSearchQuery = {}

	params.forEach((v, k: keyof AO3WorkSearchQuery) => {
		switch (k) {
			// completionStatus
			// crossovers
			case "rating": {
				queryObj[ k ] = RatingIdsReversed[ (v as keyof typeof RatingIdsReversed) ] as Rating
				return
			}
			case "sortBy": {
				// for some reason object has 'string' keys instead of defined strings, I am too lazy to fix it
				// same applays in further cases
				// @ts-ignore
				queryObj[ k ] = SortByValuesReversed[ (v as keyof typeof SortByValuesReversed) ]
				return
			}
			case "warnings": {
				// @ts-ignore
				// queryObj[ k ] = (v as string[]).map((v) => WarningsIdsReversed[(v as keyof typeof WarningsIdsReversed)])
				const typedV = v as string[]
				const findWarning = (id: string) => typedV.find((v) => WarningsIdsReversed[ (v as keyof typeof WarningsIdsReversed) ] == id) ? true : undefined

				queryObj[ k ] = {
					creatorChoseNotToUseArchiveWarnings: findWarning(WarningsIds.creatorChoseNotToUseArchiveWarnings.toString()),
					gaphicDepictionsOfViolence: findWarning(WarningsIds.gaphicDepictionsOfViolence.toString()),
					majorCharacterDeath: findWarning(WarningsIds.majorCharacterDeath.toString()),
					noArchiveWarningsApply: findWarning(WarningsIds.noArchiveWarningsApply.toString()),
					rapeNonCon: findWarning(WarningsIds.rapeNonCon.toString()),
					underage: findWarning(WarningsIds.underage.toString())
				}
				return
			}
			case "categories": {
				// @ts-ignore
				const typedV = v as string[]
				const findCategory = (id: string) => typedV.find((v) => CategoriesIdsReversed[ (v as keyof typeof CategoriesIdsReversed) ] == id) ? true : undefined

				queryObj[ k ] = {
					fF: findCategory(CategoriesIds.fF.toString()),
					fM: findCategory(CategoriesIds.fM.toString()),
					gen: findCategory(CategoriesIds.gen.toString()),
					mM: findCategory(CategoriesIds.mM.toString()),
					multi: findCategory(CategoriesIds.multi.toString()),
					other: findCategory(CategoriesIds.other.toString())
				}
				return
			}
			default: {
				queryObj[ k ] = v
			}
		}
	})

	// console.log("url", params.keys())
	return queryObj
}