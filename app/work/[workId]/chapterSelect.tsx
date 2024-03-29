import { ScrollView, Text, View } from "react-native"
import { useWorkContext } from "./_layout"
import Foreach from "../../../components/common/Foreach"
import Loaded from "../../../components/common/Loaded"
import { Link, router, useNavigation } from "expo-router"
import useStyle from "../../../hooks/useStyle"
import Btn from "../../../components/common/Btn"
import Header from "../../../components/common/Header"
import BackBtn from "../../../components/common/BackBtn"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import Show from "../../../components/common/Show"
import { useEffect, useRef, useState } from "react"
import Curtain from "../../../components/common/Curtain"
import LoadingIndicator from "../../../components/common/LoadingIndicator"
import { useReaderContext } from "../../../components/reader/ReaderManager"
import useStatus from "../../../hooks/useStatus"
import useWillUnmount from "../../../hooks/useWillUnmount"

export default function ChapterSelect() {
	// const work = useWorkContext()
	const reader = useReaderContext()

	const [status, setStatus] = useStatus()

	const willUnmount = useWillUnmount()

	const style = useStyle({
		chapterEntry: {
			marginVertical: 5,
			alignItems: "flex-start",
		},
		chaptersList: {
			// height: "auto",
			paddingTop: 10,
			paddingHorizontal: 20,
			paddingBottom: 30,
			marginBottom: 100,
		},
	})

	const currentChapterRef = useRef<View>(null)
	const scrollViewRef = useRef<ScrollView>(null)

	useEffect(() => {
		// console.log("currentChapterRef", currentChapterRef.current)
	}, [currentChapterRef])

	const [currentChapterY, setCurrentChapterY] = useState(0)
	const [isCurrentChapter, setIsCurrentChapter] = useState(false)

	// console.log("chapterSelect", work.chapterList)
	// const nav = useNavigation()

	// nav.addListener("beforeRemove", (e) => {
	// 	// if (!work.isSessionActive) work.startReadingSession()
	// 	console.log("beforeRemove chapters", e)
	// })

	const [isChangingChapter, setIsChangingChapter] = useState(false)
	useEffect(() => {
		// console.log("select mount")
		reader.endTraking()
		return () => {
			if (willUnmount) reader.startTracking()
			// work.startReadingSession()
		}
	}, [])

	return (
		<>
			<Header>
				<BackBtn />
				<Text style={{ color: "white" }}>Select chapter</Text>
				<View style={{ width: 32 }} />
			</Header>
			<Curtain
				isLoading={status}
				loading={<LoadingIndicator />}
			>
				<ScrollView
					// contentContainerStyle={{
					// 	height: "100%",
					// }}
					ref={scrollViewRef}
					contentOffset={{ x: 0, y: currentChapterY }}
				>
					<View style={style.chaptersList}>
						<Foreach
							list={(() => {
								if (
									reader.chaptersList.data &&
									reader.chaptersList.data.length > 0
								)
									return reader.chaptersList.data

								return [
									{
										id: 1,
										title:
											reader.work.data?.chapters[0]
												.title ?? "",
									},
								]
							})()}
							each={(item, i, l) => (
								<View
									onLayout={(e) => {
										if (
											reader.currentChapter.chapter == i
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
									}}
									key={i}
								>
									{reader.currentChapter.chapter == i ? (
										<MaterialCommunityIcons
											name="menu-right"
											size={32}
										/>
									) : (
										<View style={{ width: 32 }} />
									)}
									<Btn
										onPress={() => {
											// if (l.length == 1) {
											// 	router.back()
											// }
											setIsChangingChapter(true)
											reader.changeChapter(i)
											// router.back()
										}}
										style={style.chapterEntry}
										numberOfLines={1}
									>
										{(() => {
											if (
												item.title == `Chapter ${i + 1}`
											)
												return item.title

											return `Chapter ${i + 1}: ${
												item.title
											}`
										})()}
									</Btn>
								</View>
							)}
						/>
					</View>
				</ScrollView>
			</Curtain>

			{/* </Loaded> */}
		</>
	)
}
