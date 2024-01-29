export default function parseComaDecToInt(comaSeperatedNumber: string) {
	return parseInt(comaSeperatedNumber.replace(",", ""))
}