import workSearchURL from "../scraper/workSearchUrl"
import { AO3WorkSearchQuery } from "../types/workSearch"

export type WorkQueryReturn = {
	url: URL,
	paramsAsObj: () => { [ k: string ]: string },
	paramsAsJSON: () => string
}

export default function worksQuery(query: AO3WorkSearchQuery): WorkQueryReturn
export default function worksQuery(jsonQuery: string): WorkQueryReturn
export default function worksQuery(query: AO3WorkSearchQuery | string): WorkQueryReturn {
	if (typeof query == "string") {
		const searchURL = new URL("https://archiveofourown.org/works/search")

		const queryParams: { [ k: string ]: string } = JSON.parse(query)

		Object.entries(queryParams)
			.forEach(([ k, v ]) => {
				searchURL.searchParams.append(k, v)
			})

		return {
			url: searchURL,
			paramsAsObj: () => Object.fromEntries(searchURL.searchParams.entries()),
			paramsAsJSON: () => JSON.stringify(Object.fromEntries(searchURL.searchParams.entries()))
		}
	}


	const url = workSearchURL(query)

	return {
		url: url,
		paramsAsObj: () => Object.fromEntries(url.searchParams.entries()),
		paramsAsJSON: () => JSON.stringify(Object.fromEntries(url.searchParams.entries()))
	}
}