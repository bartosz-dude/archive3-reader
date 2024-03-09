import { Link } from "expo-router"
import { Text, View } from "react-native"
import Foreach from "../../components/common/Foreach"
import useStyle from "../../hooks/useStyle"
import { AO3WorkResult } from "../../services/ao3/types/workSearchResults"

export default function ResultEntry(props: { item: AO3WorkResult }) {
	const result = props.item

	const style = useStyle({
		itemContainer: {
			display: "flex",
			margin: 10,
			padding: 5,
			borderStyle: "solid",
			borderColor: "grey",
		},
		authorsContainer: {
			display: "flex",
			flexDirection: "row",
			paddingBottom: 5,
		},
		summary: {
			color: "grey",
			textAlign: "justify",
			paddingBottom: 10,
		},
		title: {
			paddingVertical: 10,
			color: "red",
		},
		author: {
			color: "grey",
		},
		authorSeparator: {
			marginRight: 5,
			color: "grey",
		},
		statsContainer: {
			paddingTop: 5,
			display: "flex",
			flexDirection: "row",
			gap: 10,
		},
		greyText: {
			color: "grey",
		},
		fandomsContainer: {
			paddingBottom: 10,
			display: "flex",
			flexDirection: "column",
			gap: 5,
		},
	})

	return (
		<>
			<View style={style.itemContainer}>
				<Link href={`/work/${result.meta.id}/chapter/first`}>
					<Text style={style.title}>{result.meta.title}</Text>
				</Link>
				<View style={style.authorsContainer}>
					<Foreach
						list={result.meta.authors}
						each={(v) => (
							<Text
								style={style.author}
								key={v}
							>
								{v}
							</Text>
						)}
						separator={(k) => (
							<Text
								key={k}
								style={style.authorSeparator}
							>
								,
							</Text>
						)}
					/>
				</View>
				{result.meta.summary && (
					<Text
						style={style.summary}
						numberOfLines={6}
						ellipsizeMode="tail"
						textBreakStrategy="simple"
					>
						{result.meta.summary}
					</Text>
				)}
				<View style={style.fandomsContainer}>
					<Text>Fandoms:</Text>
					{result.meta.tags.fandoms.length > 4 ? (
						<>
							<Foreach
								list={result.meta.tags.fandoms.slice(0, 4)}
								each={(v) => (
									<Text
										style={[]}
										key={v}
									>
										{v}
									</Text>
								)}
							/>
							<Text>...</Text>
						</>
					) : (
						<Foreach
							list={result.meta.tags.fandoms}
							each={(v) => (
								<Text
									style={[]}
									key={v}
								>
									{v}
								</Text>
							)}
						/>
					)}
				</View>
				<View style={style.statsContainer}>
					<Text>
						Chapters: {result.meta.stats.chapters} /{" "}
						{result.meta.stats.maxChapters ?? "?"}
					</Text>
					<Text>Updated: {result.meta.stats.updated}</Text>
				</View>
			</View>
		</>
	)
}