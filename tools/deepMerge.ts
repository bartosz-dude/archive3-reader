import { DeepPartial } from "../types/common"

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item: any) {
	return item && typeof item === "object" && !Array.isArray(item)
}

type GenericObject = { [key: string]: any }

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep<
	T extends GenericObject,
	S extends DeepPartial<GenericObject>
>(target: T, ...sources: S[]) {
	if (sources.length == 0) return target
	const source = sources.shift()

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} })
				mergeDeep(target[key], source[key])
			} else {
				Object.assign(target, { [key]: source[key] })
			}
		}
	}

	return mergeDeep(target, ...sources)
}
