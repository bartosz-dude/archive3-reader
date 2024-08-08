import { parse } from "node-html-better-parser"

/**
 * Converts html string to string containing the html string text and paragraphs that are separated by \n
 */
export default function StringRenderer(html: string) {
	const document = parse(html)

	const paragraphs = document.children.map((v) => {
		if (v.tagName == "br") {
			return "\n"
		}

		return v.text
	})
	const joined = paragraphs.join("\n")

	return joined
}
