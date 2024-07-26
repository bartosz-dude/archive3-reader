import { FlatList, View, Text, StyleSheet } from "react-native"
import type { RatingAO3 } from "../../../../api/ao3Wrapper/types/generic"
import type { WorksSearchResultsAO3 } from "../../../../api/ao3Wrapper/types/worksSearchResults"
import RatingBadge from "../RatingBadge/RatingBadge"
import useColorSheet from "../../../../hooks/useColorSheet"
import IconButton from "../../../../components/ui/IconButton/IconButton"
import dateText from "../../../../utils/dateText"
import numberText from "../../../../utils/numberText"
import StringRenderer from "../../../../services/renderer/StringRenderer"

interface CompactResultProps {
	title: string
	author: WorksSearchResultsAO3["results"][0]["author"]
	rating: RatingAO3
	summary: string
	words: number
	hits: number
	kudos: number
	date: Date
	chapters: WorksSearchResultsAO3["results"][0]["stats"]["chapters"]
}

export default function CompactResult({
	rating,
	title,
	author,
	summary,
	words,
	chapters,
	hits,
	kudos,
	date,
}: CompactResultProps) {
	const colorSheet = useColorSheet(lightStyle, darkStyle, sharedStyle)

	return (
		<>
			<View style={colorSheet.container}>
				<View style={colorSheet.top}>
					<View style={colorSheet.header}>
						<View style={colorSheet.title}>
							<Text
								numberOfLines={1}
								ellipsizeMode="tail"
								style={colorSheet.text}
							>
								{title}
							</Text>
							<RatingBadge rating={rating} />
						</View>
						<FlatList
							data={author}
							horizontal
							ItemSeparatorComponent={() => <Text>, </Text>}
							renderItem={({ item }) => (
								<>
									<Text style={colorSheet.text}>
										{item.pseudo}
									</Text>
								</>
							)}
						/>
					</View>
					<View style={colorSheet.bookmarkContainer}>
						<IconButton name="bookmark-plus-outline" />
					</View>
				</View>
				<View style={colorSheet.center}>
					<Text
						numberOfLines={4}
						style={[colorSheet.text, colorSheet.summary]}
					>
						{StringRenderer(summary)}
					</Text>
				</View>
				<View style={colorSheet.bottom}>
					<View style={colorSheet.bottomInnerLeft}>
						<Text style={colorSheet.text}>
							Words: {numberText(words)}
						</Text>
						<Text style={colorSheet.text}>
							{chapters.current} / {chapters.total ?? "?"}
						</Text>
					</View>
					<View style={colorSheet.bottomInnerRight}>
						<View style={colorSheet.hitsKudos}>
							<Text style={colorSheet.text}>
								Hits: {numberText(hits)}
							</Text>
							<Text style={colorSheet.text}>
								Kudos: {numberText(kudos)}
							</Text>
						</View>
						<Text style={colorSheet.text}>{dateText(date)}</Text>
					</View>
				</View>
			</View>
		</>
	)
}

const sharedStyle = StyleSheet.create({
	container: {
		width: 360,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	title: {
		flex: 1,
		flexDirection: "row",
		gap: 5,
		alignItems: "center",
	},
	header: {
		flex: 1,
		gap: 5,
	},
	top: {
		flex: 1,
		flexDirection: "row",
		flexGrow: 1,
	},
	bookmarkContainer: {
		alignSelf: "flex-start",
		marginLeft: 15,
	},
	center: {
		marginVertical: 10,
	},
	bottom: {
		flex: 1,
		flexDirection: "row",
		// flexShrink: 1,
	},
	bottomInnerLeft: {
		flex: 1,
		gap: 15,
		alignItems: "flex-start",
	},
	bottomInnerRight: {
		flex: 1,
		gap: 15,
		// justifyContent: "flex-end",
		alignItems: "flex-end",
		flexGrow: 2,
	},
	hitsKudos: {
		flex: 1,
		flexDirection: "row",
		gap: 10,
	},
	summary: {
		// textAlign: "justify",
	},
})
const lightStyle = StyleSheet.create({
	text: {
		color: "#000000",
	},
	container: {
		backgroundColor: "#ffffff",
	},
})
const darkStyle = StyleSheet.create({
	text: {
		color: "#ffffff",
	},
	container: {
		backgroundColor: "#181818",
	},
})
