import { Element } from "domhandler";
import { textContent } from "domutils";
import nCleaner from "./nCleaner"

export default function cleanTextContent(elem: Element | null | string) {
	// console.log(elem)
	if (elem && !(typeof elem == "string"))
		return textContent(elem.children).replace(/(\r\n|\n|\r)/gm, "")

	if (elem)
		return elem

	return ""
}