import { StyleProp, View, ViewStyle } from "react-native"
import { useReaderManager } from "../ReaderManagerNew"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import Btn from "../../common/Btn"
import Show from "../../common/Show"

export default function ChapterEntry(props: {
	item: {
		completed: boolean
		id: number
		title: string
		chapter: number
	}
	index: number
	style: StyleProp<ViewStyle>
}) {
	const reader = useReaderManager()

	return (
		<>
			<View
				onLayout={(e) => {
					// if (
					// 	reader.currentChapter.chapter ==
					// 	i
					// ) {
					// 	setCurrentChapterY(
					// 		e.nativeEvent.layout.y
					// 	)
					// 	setStatus("success")
					// }
				}}
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					height: 35,
				}}
			>
				{reader.currentChapter.chapter == props.index ? (
					<MaterialCommunityIcons
						name="menu-right"
						size={32}
					/>
				) : (
					<View style={{ width: 32 }} />
				)}
				<Btn
					onPress={() => {
						// reader.changeChapter(i)
						reader.setChapter(props.index)
						router.back()
					}}
					style={props.style}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{(() => {
						if (props.item.title == `Chapter ${props.index + 1}`)
							return props.item.title

						return `Chapter ${props.index + 1}: ${props.item.title}`
					})()}
				</Btn>
				<Show when={props.item.completed}>
					{/* <Text> Completed</Text> */}
					<MaterialIcons
						name="done"
						size={24}
						style={{
							marginLeft: 5,
						}}
					/>
				</Show>
			</View>
		</>
	)
}
