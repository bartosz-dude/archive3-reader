import { ListRenderItemInfo, Text, View } from "react-native";
import { AO3WorkResult } from "../../services/ao3/types/workSearchResults";
import useStyle from "../../hooks/useStyle";
import { useState } from "react";
import Foreach from "../Foreach";
import { Link } from "expo-router";

export default function SearchResultItem({ item }: { item: ListRenderItemInfo<AO3WorkResult> }) {
	const result = item.item

	// const [ a, setA ] = useState("a")?
	const style = useStyle({
		itemContainer: {
			display: "flex",
			margin: 10,
			padding: 5,
			borderStyle: "solid",
			borderColor: "grey",
			// borderWidth: 1
			// outline: "1 black solid"
		},
		authorsContainer: {
			display: "flex",
			flexDirection: "row",
			// gap: 10,
			paddingBottom: 5
			// backgroundColor: "blue",
		},
		summary: {
			color: "grey",
			textAlign: "justify",
			paddingBottom: 10
		},
		title: {
			paddingVertical: 10,
			color: "red",
			// fontWeight: "bold"
			// backgroundColor: "red"
		},
		author: {
			color: "grey",

		},
		authorSeparator: {
			marginRight: 5,
			color: "grey"
		},
		statsContainer: {
			// paddingVertical: 10,
			paddingTop: 5,
			display: "flex",
			flexDirection: "row",
			gap: 10
		},
		greyText: {
			color: "grey"
		},
		fandomsContainer: {
			paddingBottom: 10,
			// paddingTop: 10,
			display: "flex",
			flexDirection: "column",
			gap: 5,
		}
	}, [])

	const [ showedSummaryEllipsis, setShowedSummaryEllipsis ] = useState(false)

	return (
		<>
			<View style={style.itemContainer}>
				<Link href={`/work/${result.meta.id}/chapter/first`}>
					<Text style={style.title}>{result.meta.title}</Text>
				</Link>
				<View style={style.authorsContainer}>
					<Foreach
						list={result.meta.authors}
						each={(v) => <Text style={style.author} key={v}>{v}</Text>}
					// separator={<Text style={style.authorSeparator}>,</Text>}
					/>
					{/* {result.meta.authors.map((v) => <Text style={style.author} key={v}>{v}</Text>)} */}
				</View>
				{/* <Link href={`/detailsModal`}> */}
				{result.meta.summary &&
					<Text
						style={style.summary}
						numberOfLines={6}
						ellipsizeMode="tail"
						onTextLayout={(e) => {
							// console.log()
							if (e.nativeEvent.lines.length > 6)
								setShowedSummaryEllipsis(true)
						}}
					>
						{result.meta.summary}
					</Text>
				}
				{/* </Link> */}
				{/* {showedSummaryEllipsis && <Text style={[ style.greyText ]}>Show more</Text>} */}
				<View style={style.fandomsContainer}>
					<Text>Fandoms:</Text>
					{result.meta.tags.fandoms.length > 4 ?
						<>
							<Foreach list={result.meta.tags.fandoms.slice(0, 4)} each={(v) => <Text style={[]} key={v}>{v}</Text>} />
							<Text>...</Text>
						</>
						:
						<Foreach list={result.meta.tags.fandoms} each={(v) => <Text style={[]} key={v}>{v}</Text>} />
					}
				</View>
				<View style={style.statsContainer}>
					<Text>Chapters: {result.meta.stats.chapters} / {result.meta.stats.maxChapters ?? "?"}</Text>
					<Text>Updated: {result.meta.stats.updated}</Text>
					{/* {result.meta.tags.archiveWarnings.map((v) => <Text>{v}</Text>)} */}
				</View>
			</View >
		</>
	)
}