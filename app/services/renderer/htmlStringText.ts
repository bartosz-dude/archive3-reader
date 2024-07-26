import { parse } from "node-html-better-parser"

/**
 * converts html string into a string containing only the text (without html tags)
 * this doesn't add \n between paragraphs
 */
export default function htmlStringLength(html: string) {
	const document = parse(html)

	const paragraphs = document.children.map((v) => v.text)
	const joined = paragraphs.join("")

	return joined.length
}
