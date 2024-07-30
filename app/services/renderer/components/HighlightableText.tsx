import { Text } from "react-native"
import type { TextHighlight } from "../types"
import { useEffect, useState } from "react"
import Show from "../../../components/utils/Show"

interface HighlightableTextProps {
	text: string
	highlights: TextHighlight[]
	section: number
}

export default function HighlightableText({
	text,
	highlights,
	section,
}: HighlightableTextProps) {
	// console.log(text, highlights, section)

	return (
		<>
			{/* {highlights.map((v) => {
				console.log(v.position[0], section)
				if (v.position[0] === section) {
					return (
						<Text
							style={{
								display: "flex",
								// position: "absolute",
								minWidth: 5,
								width: 25,
								borderLeftWidth: 5,
								borderTopWidth: 5,
								borderBottomWidth: 5,
								borderColor: highlights.at(-1)?.backgroundColor,
							}}
						></Text>
					)
				}

				return <></>
			})} */}
			<Text
				style={{
					// zIndex: 1,
					// position: "relative",
					backgroundColor: highlights.at(-1)?.backgroundColor,
					borderTopLeftRadius:
						highlights.at(-1)?.position[0] === section ? 4 : 0,
					borderBottomLeftRadius:
						highlights.at(-1)?.position[0] === section ? 4 : 0,
					borderTopRightRadius:
						highlights.at(-1)?.position[1] === section ? 4 : 0,
					borderBottomRightRadius:
						highlights.at(-1)?.position[1] === section ? 4 : 0,
				}}
			>
				{text}
			</Text>
			{/* {highlights.map((v) => {
				console.log(v.position[0], section)
				if (v.position[1] === section) {
					return (
						<Text
							style={{
								minWidth: 5,
								width: 5,
								borderRightWidth: 5,
								borderRightColor:
									highlights.at(-1)?.backgroundColor,
							}}
						></Text>
					)
				}

				return <></>
			})} */}
		</>
	)
}
