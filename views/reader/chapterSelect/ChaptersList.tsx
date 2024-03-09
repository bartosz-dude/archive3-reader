import { useCallback, useEffect, useRef } from "react"
import { FlatList, View } from "react-native"
import { useReaderManager } from "../../../components/reader/ReaderManagerNew"
import useStyle from "../../../hooks/useStyle"
import useWillUnmount from "../../../hooks/useWillUnmount"
import ChapterEntry from "./ChapterEntry"

export default function ChaptersList() {
	const reader = useReaderManager()

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

	useEffect(() => {
		reader.endTracking()
		return () => {
			if (willUnmount) {
				reader.startTracking()
			}
		}
	}, [])

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
		</>
	)
}
