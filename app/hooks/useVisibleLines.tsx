import { useEffect, useState } from "react"
import { PixelRatio } from "react-native"

export default function useVisibleLines(viewHeight: number) {
	const [visibleLines, setVisibleLines] = useState(0)

	useEffect(() => {
		setVisibleLines(Math.floor(viewHeight / PixelRatio.getFontScale()))
	}, [viewHeight])

	return visibleLines
}
