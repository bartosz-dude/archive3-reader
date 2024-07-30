/**
 * Stringifies object to work with sqlite
 */
export default function stringifyObject(o: object) {
	return JSON.stringify(o).replace(/\'/g, "''")
}
