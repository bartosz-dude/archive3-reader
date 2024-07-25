import { Constants } from "../constants"
import workParser from "../parsers/work"
import type { WorkAO3 } from "../types/work"

/**
 * fetches an ao3 work
 */
export default function fetchWork(id: number): Promise<WorkAO3>
export default function fetchWork(id: number, chapter: number): Promise<WorkAO3>
export default async function fetchWork(
	id: number,
	chapter?: number
): Promise<WorkAO3> {
	const workUrl = new URL(
		"https://" +
			Constants.hostname +
			`/works/${id}` +
			(chapter !== undefined ? `chapters/${chapter}` : "")
	)
	const workResponse = await fetch(workUrl)
	const workText = await workResponse.text()

	const workParsed = workParser(workText)

	return workParsed
}
