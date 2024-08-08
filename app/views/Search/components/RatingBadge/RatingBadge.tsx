import { Appearance, StyleSheet, Text, View } from "react-native"
import type { RatingAO3 } from "../../../../api/ao3Wrapper/types/generic"
import useColorSheet from "../../../../hooks/useColorSheet"
import styleSwitch from "../../../../components/utils/styleSwitch"
import { useMemo } from "react"

interface RatingBadgeProps {
	rating: RatingAO3
}

export default function RatingBadge({ rating }: RatingBadgeProps) {
	const colorSheet = useColorSheet(lightStyle, darkStyle, sharedStyle)

	const ratingMapping = useMemo(
		() =>
			new Map([
				["explicit", "E"],
				["generalAudiences", "G"],
				["mature", "M"],
				["notRated", "NR"],
				["teenAndUpAudiences", "T"],
			]),
		[]
	)

	return (
		<>
			<View
				style={styleSwitch([
					colorSheet.badge,
					[rating == "explicit", colorSheet.eBadge],
					[rating == "generalAudiences", colorSheet.gBadge],
					[rating == "mature", colorSheet.mBadge],
					[rating == "notRated", colorSheet.nrBadge],
					[rating == "teenAndUpAudiences", colorSheet.tBadge],
				])}
			>
				<Text style={colorSheet.text}>{ratingMapping.get(rating)}</Text>
			</View>
		</>
	)
}

const sharedStyle = StyleSheet.create({
	badge: {
		// flex: 1,
		// display: "flex",
		// justifyContent: "center",
		// alignItems: "center",
		minWidth: 18,
		minHeight: 18,
		width: 18,
		height: 18,
		aspectRatio: 1,
		borderRadius: 5,
		// flexGrow: 0,
	},
	text: {
		// borderColor: "pink",
		// borderWidth: 1,

		textAlignVertical: "center",
		textAlign: "center",
		fontWeight: "bold",
		// position: "absolute",
	},
	nrBadge: {
		minWidth: 26,
		width: 26,
		aspectRatio: "2 / 1",
	},
})

const lightStyle = StyleSheet.create({
	text: {
		color: "#fff",
	},
	eBadge: {
		backgroundColor: "#A73030",
	},
	gBadge: {
		backgroundColor: "#56A730",
	},
	mBadge: {
		backgroundColor: "#A76930",
	},
	nrBadge: {
		backgroundColor: "#686868",
	},
	tBadge: {
		backgroundColor: "#3083A7",
	},
})

const darkStyle = StyleSheet.create({
	text: {
		color: "#fff",
	},
	eBadge: {
		backgroundColor: "#A73030",
	},
	gBadge: {
		backgroundColor: "#56A730",
	},
	mBadge: {
		backgroundColor: "#A76930",
	},
	nrBadge: {
		backgroundColor: "#686868",
	},
	tBadge: {
		backgroundColor: "#3083A7",
	},
})
