import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { FlatList, ScrollView, Text, View } from "react-native"
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
import ChapterEntry from "./ChapterEntry"

export default function ChaptersList() {
	// const work = useWorkContext()
	const reader = useReaderManager()

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

	const flatListRef = useRef<FlatList>(null)
	// if (flatListRef.current !== null) {

	// }

	const [currentChapterY, setCurrentChapterY] = useState(0)

	useEffect(() => {
		reader.endTracking()
		return () => {
			if (willUnmount) {
				reader.startTracking()
			}
		}
	}, [])

	// useEffect(() => {
	// 	console.log(
	// 		"flatList",
	// 		reader.currentChapter.chapter,
	// 		reader.currentChapter.chapter ?? 0
	// 	)
	// 	flatListRef.current?.scrollToEnd()
	// 	// flatListRef.current?.scrollToIndex({
	// 	// 	index: reader.currentChapter.chapter ?? 0,
	// 	// 	// viewPosition: 0,
	// 	// })
	// }, [flatListRef.current])

	const renderItem = useCallback(
		({
			item,
			index,
		}: {
			item: {
				completed: boolean
				id: number
				title: string
				chapter: number
			}
			index: number
		}) => (
			<ChapterEntry
				item={item}
				index={index}
				style={style.chapterEntry}
			/>
		),
		[]
	)

	return (
		<>
			<StandardHeader title="Select chapter" />
			{/* <Curtain
				isLoading={true}
				loading={<LoadingIndicator />}
			> */}
			<Loaded isLoading={reader.metaStatus}>
				<FlatList
					ref={flatListRef}
					// maxToRenderPerBatch={30}
					initialNumToRender={30}
					initialScrollIndex={reader.currentChapter.chapter ?? 0}
					getItemLayout={(data, index) => ({
						length: 35,
						offset: 35 * index,
						index,
					})}
					data={reader.chapters() ?? []}
					renderItem={renderItem}
					ListFooterComponent={
						<>
							<View
								style={{
									height: 120,
								}}
							></View>
						</>
					}
				/>
			</Loaded>
			{/* </Curtain> */}

			{/* </Loaded> */}
		</>
	)
}
