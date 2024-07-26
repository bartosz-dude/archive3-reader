import { HTMLElement, TextNode } from "node-html-better-parser"
import { useMemo } from "react"
import { Text, View } from "react-native"
import { useRendererHighlights, useRendererStyle } from "../RendererProvider"
import type { TextHighlight, TextPosition } from "../types"
import ElementSelector from "./ElementSelector"
import HighlightableText from "../components/HighlightableText"

interface ParagraphProps {
	elem: HTMLElement
	textPosition: TextPosition
}

export default function Paragraph({ elem, textPosition }: ParagraphProps) {
	const style = useRendererStyle()
	const highlights = useRendererHighlights()

	const localNodeTextPositions = useMemo(() => {
		const nodeTextPositions: TextPosition[] = []

		elem.childNodes.forEach((node, i) => {
			if (i === 0) {
				nodeTextPositions.push([0, node.text.length])
			} else {
				const prev = nodeTextPositions.at(i - 1)?.[1] ?? 0
				nodeTextPositions.push([prev + 1, prev + node.text.length])
			}
		})

		return nodeTextPositions
	}, [elem])

	const nodeTextPositions = useMemo(() => {
		return localNodeTextPositions.map((v) => [
			v[0] + textPosition[0],
			v[1] + textPosition[0],
		])
	}, [localNodeTextPositions])

	// filters the highlights to those that are releveant to this component and convert their text positions to local ones
	const localHighlights = useMemo(() => {
		const relevantHighlights = highlights.filter((v) =>
			nodeTextPositions.some(
				(localPos) =>
					localPos[0] <= v.position[1] && localPos[1] >= v.position[0]
			)
		)

		const localHighlights = relevantHighlights.map((v) => {
			// limits the highlight position to be within this paragraph
			const pos = [
				Math.max(v.position[0], nodeTextPositions[0][0]),
				Math.min(v.position[1], nodeTextPositions.at(-1)![1]),
			]
			const localPos = pos.map((v) => v - textPosition[0])

			return {
				...v,
				position: localPos,
			}
		})

		return localHighlights as TextHighlight[]
	}, [highlights, nodeTextPositions])

	// cuts up the text into sections at start and end positions of highlights that are within the text size
	// TODO it makes correct sections, but highlight is applied to one before as well
	const sections = useMemo(() => {
		const sectionsNumbers: number[][] = []
		const sectionedText: string[][] = []
		const sectionedHighlights: (TextHighlight & {
			sections: [number, number]
		})[][][] = []

		elem.childNodes.forEach((node, i) => {
			const relevantHighlights = localHighlights.filter((v) => {
				const textPos = localNodeTextPositions[i]

				return (
					textPos[0] <= v.position[1] && textPos[1] >= v.position[0]
				)
			})

			const textPos = localNodeTextPositions[i]

			const highlightsSections: [number, number][] = []
			const sections = relevantHighlights.reduce<number[]>((prev, v) => {
				const highStart = v.position[0]
				const highEnd = v.position[1]

				// start and end pos of this highlight
				let startPos
				let endPos

				if (highStart >= textPos[0]) {
					if (!prev.includes(highStart)) {
						prev.push(highStart)
					}
					startPos = highStart
				} else {
					if (!prev.includes(textPos[0])) {
						prev.push(textPos[0])
					}
					startPos = textPos[0]
				}

				if (highEnd <= textPos[1]) {
					if (!prev.includes(highEnd)) {
						prev.push(highEnd)
					}
					endPos = highEnd
				} else {
					if (!prev.includes(textPos[1])) {
						prev.push(textPos[1])
					}
					endPos = textPos[1]
				}

				highlightsSections.push([startPos, endPos])
				return prev
			}, [])

			if (!sections.includes(textPos[0])) {
				sections.push(textPos[0])
			}
			if (!sections.includes(textPos[1])) {
				sections.push(textPos[1])
			}

			sections.sort((a, b) => a - b)

			// makes so arrays created in the array are unique and not references to the same one
			const highlighArr: (TextHighlight & {
				sections: [number, number]
			})[][] = Array.from({ length: sections.length }, (e) => [])
			sectionedHighlights.push(highlighArr)

			highlightsSections.forEach(([start, end], highI) => {
				const startIndex = sections.findIndex((v) => v === start)
				const endIndex = sections.findIndex((v) => v === end)

				for (let j = startIndex; j <= endIndex; j++) {
					if (
						!sectionedHighlights[i][j].find(
							(v) =>
								v.position[0] ==
									relevantHighlights[highI].position[0] &&
								v.position[1] ==
									relevantHighlights[highI].position[1]
						)
					) {
						sectionedHighlights[i][j].push({
							...relevantHighlights[highI],
							sections: [startIndex, endIndex],
						})
					}
				}
			})

			sectionsNumbers.push(sections)

			sectionedText.push(
				sections.map((v, i, a) => {
					if (i === 0) {
						return node.text.substring(0, v)
					} else {
						return node.text.substring(sections[i - 1], v)
					}
				})
			)
		})

		return sectionedText.map((v, i) => {
			// console.log("arr", sectionedHighlights, sectionedHighlights[i])
			const sections = v.map((vJ, j) => ({
				text: vJ,
				section: sectionsNumbers[i][j],
				highlights: sectionedHighlights[i][j],
			}))
			// ({ text: v, highlights: sectionedHighlights[ i ] })
			return sections
		})
	}, [localHighlights])

	return (
		<>
			<Text style={[style.text, style.paragraph]}>
				{elem.childNodes.map((node, i) => {
					if (node instanceof TextNode) {
						if (sections[i].length === 1) {
							return (
								<>
									<>{node.text}</>
								</>
							)
						} else {
							return (
								<>
									<>
										{sections[i].map((sec, i) => {
											return (
												<HighlightableText
													highlights={sec.highlights}
													text={sec.text}
													section={i}
												/>
											)
										})}
									</>
								</>
							)
						}
					}

					if (node instanceof HTMLElement) {
						return <ElementSelector elem={node} />
					}

					return <></>
				})}
			</Text>
		</>
	)
}
