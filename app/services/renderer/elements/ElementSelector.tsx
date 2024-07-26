import type { HTMLElement } from "node-html-better-parser"
import Paragraph from "./Paragraph"
import Anchor from "./Anchor"
import { Text } from "react-native"
import { useRendererOptions } from "../RendererProvider"
import type { TextPosition } from "../types"

interface ElementSelectorProps {
	elem: HTMLElement
	textPosition?: TextPosition
}

export default function ElementSelector({
	elem,
	textPosition,
}: ElementSelectorProps) {
	const options = useRendererOptions()

	switch (elem.tagName) {
		case "p":
			return (
				<Paragraph
					elem={elem}
					textPosition={textPosition ?? [NaN, NaN]}
				/>
			)
		case "a":
			return <Anchor elem={elem} />
		default:
			// when renderUnsupportedTags is set to true then this will allow to see what html tags are used, but not yet supported inside the text
			return (
				<Text>
					{options.renderUnsupportedTags ? elem.outerHTML : elem.text}
				</Text>
			)
	}
}
