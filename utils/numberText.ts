/**
 * makes number like 1000 or 1400 into 1k or 1.4k
 */
export default function numberText(number: number) {
	if (number > 1000) {
		const tNum = Math.floor(number / 1000)
		const rest = Math.floor((number - tNum * 1000) / 100)
		console.log(tNum, rest)
		return `${tNum}${rest ? `.${rest}` : ""}k`
	}

	return number.toString()
}
