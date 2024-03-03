import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import Btn from "../../../components/common/Btn"
import Curtain from "../../../components/common/Curtain"
import Foreach from "../../../components/common/Foreach"
import Loaded from "../../../components/common/Loaded"
import LoadingIndicator from "../../../components/common/LoadingIndicator"
import StandardHeader from "../../../components/common/StandardHeader"
import { useReaderManager } from "../../../components/reader/ReaderManagerNew"
import useStatus from "../../../hooks/useStatus"
import useStyle from "../../../hooks/useStyle"
import useWillUnmount from "../../../hooks/useWillUnmount"
import Show from "../../../components/common/Show"

export default function ChapterSelect() {
	// const work = useWorkContext()
	const newReader = useReaderManager()

	const [status, setStatus] = useStatus()

	const willUnmount = useWillUnmount()

	const style = useStyle({
		chapterEntry: {
			marginVertical: 5,
			alignItems: "flex-start",
			flexShrink: 1,
			width: "100%",
		},
		chaptersList: {
			// height: "auto",
			paddingTop: 10,
			paddingHorizontal: 10,
			paddingBottom: 30,
			marginBottom: 100,
		},
	})

	const currentChapterRef = useRef<View>(null)
	const scrollViewRef = useRef<ScrollView>(null)

	const [currentChapterY, setCurrentChapterY] = useState(0)

	const [isChangingChapter, setIsChangingChapter] = useState(false)
	useEffect(() => {
		newReader.endTracking()
		return () => {
			if (willUnmount) {
				newReader.startTracking()
			}
		}
	}, [])

	return (
		<>
			<StandardHeader title="Select chapter" />
			<Curtain
				isLoading={status}
				loading={<LoadingIndicator />}
			>
				<Loaded isLoading={newReader.metaStatus}>
					<ScrollView
						ref={scrollViewRef}
						contentOffset={{ x: 0, y: currentChapterY }}
					>
						<View style={style.chaptersList}>
							<Foreach
								list={newReader.chapters() ?? []}
								each={(item, i, l) => (
									<View
										onLayout={(e) => {
											if (
												newReader.currentChapter
													.chapter == i
											) {
												setCurrentChapterY(
													e.nativeEvent.layout.y
												)
												setStatus("success")
											}
										}}
										style={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
										}}
										key={i}
									>
										{newReader.currentChapter.chapter ==
										i ? (
											<MaterialCommunityIcons
												name="menu-right"
												size={32}
											/>
										) : (
											<View style={{ width: 32 }} />
										)}
										<Btn
											onPress={() => {
												setIsChangingChapter(true)
												// reader.changeChapter(i)
												newReader.setChapter(i)
												router.back()
											}}
											style={style.chapterEntry}
											numberOfLines={1}
											ellipsizeMode="tail"
										>
											{(() => {
												if (
													item.title ==
													`Chapter ${i + 1}`
												)
													return item.title

												return `Chapter ${i + 1}: ${
													item.title
												}`
											})()}
										</Btn>
										<Show when={item.completed}>
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
								)}
							/>
						</View>
					</ScrollView>
				</Loaded>
			</Curtain>

			{/* </Loaded> */}
		</>
	)
}
