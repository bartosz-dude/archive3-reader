import { HTMLElement, TextNode } from "node-html-better-parser"
import { Pressable, Text, View } from "react-native"
import { useRendererStyle } from "../RendererProvider"
import ElementSelector from "./ElementSelector"
import { openBrowserAsync } from "expo-web-browser"

interface AnchorProps {
	elem: HTMLElement
}

export default function Anchor({ elem }: AnchorProps) {
	const style = useRendererStyle()

	return (
		<>
			<Pressable
				onPress={() => {
					openBrowserAsync(elem.attributes.href)
				}}
			>
				<Text style={[style.text, style.anchor]}>
					{elem.childNodes.map((node) => {
						if (node instanceof TextNode) {
							return (
								<>
									<>{node.text}</>
								</>
							)
						}

						if (node instanceof HTMLElement) {
							return <ElementSelector elem={node} />
						}

						return <></>
					})}
				</Text>
			</Pressable>
		</>
	)
}
