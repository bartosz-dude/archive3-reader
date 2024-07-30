/**
 * checks if both arrays contain the same values at the same indexes, it uses === comparison on the elements
 */
export default function arrayCompare(a: any[], b: any[]): boolean {
	if (a.length !== b.length) {
		return false
	}

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false
		}
	}

	return true
}
