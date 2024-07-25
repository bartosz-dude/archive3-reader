import { MonthNumber, NumberMonth } from "../api/ao3Wrapper/constants"

/**
 * displays date like '01 Jan 2024'
 */
export default function dateText(date: Date) {
	return `${date.getDay()} ${
		NumberMonth[date.getMonth()]
	} ${date.getFullYear()}`
}
