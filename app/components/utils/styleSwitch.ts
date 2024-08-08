import { merge } from "ts-deepmerge"

export default function styleSwitch(
	style: (Record<string, any> | [boolean, Record<string, any>])[]
): Record<string, any> {
	let mergedStyle = {}

	for (const entry of style) {
		if (Array.isArray(entry)) {
			if (entry[0]) {
				mergedStyle = merge(mergedStyle, entry[1])
			}
		} else {
			mergedStyle = merge(mergedStyle, entry)
		}
	}

	return mergedStyle
}
