import { Appearance, StyleSheet, Text, View } from "react-native"
import type { RatingAO3 } from "../../../../api/ao3Wrapper/types/generic"
import useColorSheet from "../../../../hooks/useColorSheet"

interface RatingBadgeProps {
	rating: RatingAO3
}

export default function RatingBadge({ rating }: RatingBadgeProps) {
	const colorSheet = useColorSheet(lightStyle, darkStyle, sharedStyle)

	return (
		<>
			{rating == "explicit" && (
				<>
					<View style={[colorSheet.badge, colorSheet.eBadge]}>
						<Text style={colorSheet.text}>E</Text>
					</View>
				</>
			)}
			{rating == "generalAudiences" && (
				<>
					<View style={[colorSheet.badge, colorSheet.gBadge]}>
						<Text style={colorSheet.text}>G</Text>
					</View>
				</>
			)}
			{rating == "mature" && (
				<>
					<View style={[colorSheet.badge, colorSheet.mBadge]}>
						<Text style={colorSheet.text}>M</Text>
					</View>
				</>
			)}
			{rating == "notRated" && (
				<>
					<View style={[colorSheet.badge, colorSheet.nrBadge]}>
						<Text style={colorSheet.text}>NR</Text>
					</View>
				</>
			)}
			{rating == "teenAndUpAudiences" && (
				<>
					<View style={[colorSheet.badge, colorSheet.tBadge]}>
						<Text style={colorSheet.text}>T</Text>
					</View>
				</>
			)}
		</>
	)
}

const sharedStyle = StyleSheet.create({
	badge: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		minWidth: 18,
		minHeight: 18,
		width: 18,
		height: 18,
		aspectRatio: 1,
		borderRadius: 5,
		flexGrow: 0,
	},
	text: {
		textAlign: "center",
		fontWeight: "bold",
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
