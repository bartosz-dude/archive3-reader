import workSearchResultsScraper from "../scraper/workSearchResults";
import { WorkQueryReturn } from "./worksQuery";

export default async function worksSearch(queryUrl: WorkQueryReturn, page = 1) {
	// if (queryUrl)
	const url = queryUrl.url
	url.searchParams.set("page", page.toString())

	return workSearchResultsScraper(url)

	// return null
}