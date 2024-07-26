import { parse } from "node-html-better-parser"
import { useMemo } from "react"
import { View } from "react-native"
import ElementSelector from "./elements/ElementSelector"
import { useRendererStyle } from "./RendererProvider"
import type { TextPosition } from "./types"

interface RendererProps {
	html: string
}
export default function Renderer({ html }: RendererProps) {
	const style = useRendererStyle()

	const document = useMemo(() => parse(html), [html])

	const nodeTextPositions = useMemo(() => {
		const nodeTextPositions: TextPosition[] = []

		document.childNodes.forEach((node, i) => {
			if (i === 0) {
				nodeTextPositions.push([0, node.text.length])
			} else {
				const prev = nodeTextPositions.at(i - 1)?.[1] ?? 0
				nodeTextPositions.push([prev + 1, prev + node.text.length])
			}
		})

		return nodeTextPositions
	}, [document])

	return (
		<>
			<View style={[style.renderer]}>
				{document.children.map((node, i) => {
					return (
						<ElementSelector
							elem={node}
							textPosition={nodeTextPositions[i]}
						/>
					)
				})}
			</View>
		</>
	)
}
