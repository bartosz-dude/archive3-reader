/**
 * When passed array is empty this returns `undefined`, otherwise returns the passed array
 */
export default function arrayAsUndefined<T extends unknown[]>(arr: T) {
	if (arr.length == 0) {
		return undefined
	}

	return arr
}
