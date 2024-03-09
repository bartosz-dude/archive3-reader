import { Alert, Pressable, Text, View } from "react-native"
import { AO3WorkSearchQuery } from "../../services/ao3/types/workSearch"
import useStyle from "../../hooks/useStyle"
import { router, useNavigation } from "expo-router"
import worksQuery from "../../services/ao3/api/worksQuery"
import IconBtn from "../common/btns/IconBtn"
import { useState } from "react"
import deleteQuery from "../../services/saver/api/deleteQuery"

export default function SaveSearchItem({ query }: { query: string }) {
	const q: AO3WorkSearchQuery = worksQuery(query).paramsAsQuery()

	const [mode, setMode] = useState<"view" | "edit">("view")

	const style = useStyle({
		container: {
			margin: 10,
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			gap: 5,
		},
		dataColumn: {
			display: "flex",
			flexDirection: "column",
			gap: 5,
		},
		editColumn: {
			display: "flex",
			flexDirection: "column",
			gap: 15,
		},
	})

	const nav = useNavigation()

	if (mode == "view")
		return (
			<>
				<View style={style.container}>
					<Pressable
						onPress={() => {
							const q = worksQuery(query)

							router.replace("/search")
							router.setParams({
								ao3Query: q.paramsAsJSON(),
							})
						}}
					>
						<View style={style.dataColumn}>
							{q.anyField && <Text>Query: {q.anyField}</Text>}
							{q.sortDirection && (
								<Text>
									Order:{" "}
									{q.sortDirection == "desc"
										? "descending"
										: "ascending"}
								</Text>
							)}
						</View>
					</Pressable>
					<View style={style.editColumn}>
						{/* <IconBtn name="pencil-outline" size={32} onPress={() => setMode("edit")} /> */}
						<IconBtn
							name="delete-outline"
							size={32}
							onPress={() =>
								deleteQuery(worksQuery(query)).then(() =>
									router.replace("/search/savedSearches")
								)
							}
						/>
					</View>
				</View>
			</>
		)

	if (mode == "edit")
		return (
			<>
				<View style={style.container}>
					<View style={style.dataColumn}>
						{q.anyField && <Text>Query: {q.anyField}</Text>}
						{q.sortDirection && (
							<Text>
								Order:{" "}
								{q.sortDirection == "desc"
									? "descending"
									: "ascending"}
							</Text>
						)}
					</View>
					<View style={style.editColumn}>
						<IconBtn
							name="close"
							size={32}
							onPress={() => setMode("view")}
						/>
						<IconBtn
							name="delete-outline"
							size={32}
						/>
					</View>
				</View>
			</>
		)
}
