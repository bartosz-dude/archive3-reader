import { ScrollView, Text, View } from "react-native"
import { useWorkContext } from "./_layout"
import Foreach from "../../../components/common/Foreach"
import Loaded from "../../../components/common/Loaded"
import { Link, router } from "expo-router"
import useStyle from "../../../hooks/useStyle"
import Btn from "../../../components/common/Btn"
import Header from "../../../components/common/Header"
import BackBtn from "../../../components/common/BackBtn"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import Show from "../../../components/common/Show"

export default function ChapterSelect() {
	const work = useWorkContext()

	const style = useStyle({
		chapterEntry: {
			marginVertical: 5,
			alignItems: "flex-start",
		},
		chaptersList: {
			paddingTop: 10,
			paddingHorizontal: 20,
			paddingBottom: 30,
		},
	})

	return (
		<>
			<Header>
				<BackBtn />
				<Text style={{ color: "white" }}>Select chapter</Text>
				<View style={{ width: 32 }} />
			</Header>
			<ScrollView>
				<View style={style.chaptersList}>
					<Show
						when={(work.chapterList?.length ?? 0) > 0}
						fallback={
							<View
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<MaterialCommunityIcons
									name="menu-right"
									size={32}
								/>
								<Btn
									onPress={() => {
										router.back()
									}}
									style={style.chapterEntry}
									numberOfLines={1}
								>
									Chapter 1:{" "}
									{work.work.data?.chapters[0].title ?? ""}
								</Btn>
							</View>
						}
					>
						<Foreach
							list={work.chapterList ?? []}
							each={(item, i) => (
								<View
									style={{
										display: "flex",
										flexDirection: "row",
									}}
									key={i}
								>
									{work.currentChapter == i ? (
										<MaterialCommunityIcons
											name="menu-right"
											size={32}
										/>
									) : (
										<View style={{ width: 32 }} />
									)}
									<Btn
										onPress={() => {
											work.setChapter(i)
										}}
										style={style.chapterEntry}
										numberOfLines={1}
									>
										Chapter {(i + 1).toString()}:{" "}
										{item.title}
									</Btn>
								</View>
							)}
						/>
					</Show>
				</View>
			</ScrollView>
			{/* </Loaded> */}
		</>
	)
}
