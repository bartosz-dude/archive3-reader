import { FlatList, ScrollView, Text, View } from "react-native"
import { useSettings } from "../../../services/appSettings/components/settingsProvider"
import Foreach from "../../../components/common/Foreach"
import useLoading from "../../../hooks/useLoading"
import getAllWorks from "../../../services/saver/database/getAllWorks"
import Loaded from "../../../components/common/Loaded"
import { useEffect } from "react"
import useCleanup from "../../../hooks/useCleanup"
import getAllSavedWork from "../../../services/saver/database/getAllSavedWorks"
import { Link, useNavigation, usePathname } from "expo-router"
import useStyle from "../../../hooks/useStyle"
import Header from "../../../components/common/Header"

export default function SavedPage() {
	// const { settings } = useSettings()
	const path = usePathname()
	const savedWorks = useLoading(() => getAllSavedWork())

	useEffect(() => {
		if (path == "/saved") {
			savedWorks.reload()
			// console.log("savedWorks reloaded")
		}

		if (savedWorks.status == "success") {
			savedWorks.data
		}
	}, [path])

	const style = useStyle({
		entryList: {},
		entry: {
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
	})

	return (
		<>
			<Header style={{ justifyContent: "center" }}>
				<Text style={{ color: "white" }}>Saved Works</Text>
			</Header>
			<Loaded isLoading={savedWorks.status}>
				<FlatList
					data={savedWorks.data ?? []}
					renderItem={(item) => (
						<View
							style={style.entry}
							key={item.item.workId}
						>
							<Link
								style={style.title}
								href={`/work/${item.item.workId}/chapter/first`}
							>
								{item.item.title}
							</Link>
							<View style={style.authorsContainer}>
								<Foreach
									list={item.item.authors}
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
							<Text
								style={style.summary}
								numberOfLines={6}
								ellipsizeMode="tail"
							>
								{item.item.summary}
							</Text>
						</View>
					)}
					ItemSeparatorComponent={() => (
						<View
							style={{
								height: 1,
								backgroundColor: "lightgrey",
								marginHorizontal: 10,
							}}
						/>
					)}
				/>
			</Loaded>
		</>
	)
}
