import { useEffect, useRef, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import Btn from "../../../../../components/common/Btn"
import Foreach from "../../../../../components/common/Foreach"
import Loaded from "../../../../../components/common/Loaded"
import LoadingIndicator from "../../../../../components/common/LoadingIndicator"
import { useReaderContext } from "../../../../../components/reader/ReaderManager"
import useLoadingHandler from "../../../../../hooks/useLoadingHandler"
import useStatus from "../../../../../hooks/useStatus"
import useStyle from "../../../../../hooks/useStyle"
import clamp from "../../../../../tools/clamp"
import fixed from "../../../../../tools/fixed"
import { LoadingStatusText } from "../../../../../types/common"
import useWillUnmount from "../../../../../hooks/useWillUnmount"
import Curtain from "../../../../../components/common/Curtain"

export default function newWorkReader() {
	// const work = useWorkContext()
	const reader = useReaderContext()

	const [status, setStatus] = useStatus()

	// useEffect(() => {
	// 	// setStatus(reader.status)
	// 	console.log(reader.status)
	// }, [reader.status])

	const willUnmount = useWillUnmount()

	const [layoutHeight, setLayoutHeight] = useState(0)
	const [contentHeight, setContentHeight] = useState(0)
	const [workHeight, setWorkHeight] = useState(0)

	useEffect(() => {
		setWorkHeight(contentHeight - layoutHeight)
	}, [layoutHeight, contentHeight])

	const [currentChapter, setCurrentChapter] = useState(0)

	useEffect(() => {
		if (reader.currentChapter.chapter != currentChapter) {
			setCurrentChapter(reader.currentChapter.chapter)
			setStatus("loading")
		}
	}, [reader.currentChapter.chapter])
	// const [status, b] = useStatus()

	// const [scrolled, setScrolled] = useState<LoadingStatusText>("loading")

	// const loading = useLoadingHandler([reader.status /*scrolled*/])

	const scrollViewRef = useRef<ScrollView>(null)

	// const [scrollViewHeight, setScrollViewHeight] = useState(0)
	const [scrollViewOffsetY, setScrollViewOffsetY] = useState(0)
	const [offsetY, setOffsetY] = useState(0)

	useEffect(() => {
		const offsetY = clamp(
			fixed(isNaN(scrollViewOffsetY) ? 0 : scrollViewOffsetY, 2),
			{
				min: { else: 0, to: 0 },
				max: { to: workHeight, else: workHeight },
			}
		)
		setOffsetY(offsetY)
		reader.setProgress(
			isNaN(offsetY / workHeight) ? 0 : offsetY / workHeight
		)
	}, [scrollViewOffsetY])

	const [startChapterPosition, setStartChapterPosition] = useState(0)
	// const [chapter]

	const style = useStyle({
		titleColumn: {
			display: "flex",
			flexDirection: "column",
			// width: "80%",
			flexShrink: 1,
		},
		titleText: {
			color: "white",
		},
		chapterText: {
			color: "white",
		},
		content: {
			paddingVertical: 40,
			paddingHorizontal: 20,
			// paddingBottom: 40,
		},
		paragraf: {
			paddingBottom: 10,
			textAlign: "justify",
			lineHeight: 22,
		},
		nextChapter: {
			height: 80,
			backgroundColor: "red",
			flexGrow: 1,
		},
		chapterNav: {
			display: "flex",
			flexDirection: "row",
			// paddingBottom: 50,
			alignItems: "stretch",
			backgroundColor: "red",
			flexBasis: 1,
		},
	})

	// useEffect(() => {
	// if (
	// 	(contentHeight == 0 || layoutHeight == 0) &&
	// 	reader.tracker.status != "success"
	// )
	// 	return

	// if (reader.tracker.data)
	// 	scrollViewRef.current?.scrollTo({
	// 		y: workHeight * reader.getProgress,
	// 	})
	// setStartChapterPosition(
	// 	workHeight * reader.tracker.data?.currentChapterPosition
	// )
	// setStatus("success")
	// reader.startTracking()
	// }, [workHeight])

	const loadDelay = useRef<NodeJS.Timeout>()

	// const loadDelay = useRe

	const [canScroll, setCanScroll] = useState(false)

	useEffect(() => {
		// console.log(
		// 	"offset A",
		// 	reader.getProgress,
		// 	offsetY / workHeight,
		// 	offsetY,
		// 	workHeight
		// )
		if (isNaN(reader.getProgress ?? NaN) || isNaN(offsetY / workHeight))
			return

		if (
			reader.getProgress >= 0 &&
			fixed(offsetY / workHeight, 5) != fixed(reader.getProgress, 5) &&
			status != "success"
		) {
			scrollViewRef.current?.scrollTo({
				y: workHeight * reader.getProgress,
			})
		}

		if (
			reader.getProgress >= 0 &&
			fixed(offsetY / workHeight, 5) == fixed(reader.getProgress, 5) &&
			status != "success"
		) {
			// clearTimeout(loadDelay.current)
			// loadDelay.current = setTimeout(() => {
			setStatus("success")
			setCanScroll(true)
			// console.log("scrolled")
			reader.startTracking()
			// }, 100)
		}
		// console.log("offset", reader.getProgress, offsetY / workHeight)
	}, [offsetY, workHeight, status])

	useEffect(() => {
		// setStatus("loading")
		// reader.startTracking()
		return () => {
			if (willUnmount) {
				// console.log("reader willUnmount")
				reader.endTraking()
			}
		}
	}, [])

	function isPreviousChapter() {
		return (reader.chaptersList.data ?? [])[
			reader.currentChapter.chapter - 1
		]
			? true
			: false
	}

	function isNextChapter() {
		return (reader.chaptersList.data ?? [])[
			reader.currentChapter.chapter + 1
		]
			? true
			: false
	}

	// scrollViewRef.current?.scrollTo()

	return (
		<>
			<Loaded
				isLoading={reader.status}
				loading={
					<>
						<LoadingIndicator />
					</>
				}
			>
				{/* <Loaded isLoading={reader.status}> */}
				<ScrollView
					ref={scrollViewRef}
					scrollEnabled={canScroll}
					// contentOffset={{ x: 0, y: startChapterPosition }}
					contentContainerStyle={{
						// minHeight: "auto",
						// height: 800,
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
					scrollEventThrottle={1}
					onScroll={(e) => {
						// console.log(
						// 	"onScroll",
						// 	e.nativeEvent.contentSize.height,
						// 	e.nativeEvent.layoutMeasurement.height
						// )
						// setScrollViewHeight(
						// 	e.nativeEvent.contentSize.height -
						// 		e.nativeEvent.layoutMeasurement.height
						// )
						setScrollViewOffsetY(e.nativeEvent.contentOffset.y)
					}}
					// 	// console.log(
					// 	// 	"scroll",
					// 	// 	e.nativeEvent.contentSize.height,
					// 	// 	e.nativeEvent.contentSize.height -
					// 	// 		e.nativeEvent.layoutMeasurement.height
					// 	// )
					// }}
					onLayout={(e) => {
						// console.log("layout", e.nativeEvent.layout.height)
						setLayoutHeight(e.nativeEvent.layout.height)
					}}
					onContentSizeChange={(w, h) => {
						// console.log("sizeChange", w, h)
						setContentHeight(h)
					}}
				>
					<View
						style={style.content}
						onLayout={(e) => {
							// setScrollViewHeight(e.nativeEvent.layout.height)
						}}
					>
						<Foreach
							list={reader.work.data?.chapters[0].content ?? []}
							each={(item, i) => {
								return (
									<Text
										key={i}
										style={style.paragraf}
									>
										{item}
									</Text>
								)
							}}
						/>
					</View>
					<View style={style.chapterNav}>
						<Btn
							style={[
								style.nextChapter,
								{
									backgroundColor: isPreviousChapter()
										? "red"
										: "grey",
								},
							]}
							textStyle={{ color: "white" }}
							disabled={!isPreviousChapter()}
							onPress={() =>
								reader.setChapter(
									reader.currentChapter.chapter - 1
								)
							}
						>
							Previous
						</Btn>
						<Btn
							style={[
								style.nextChapter,
								{
									backgroundColor: isNextChapter()
										? "red"
										: "grey",
								},
							]}
							textStyle={{ color: "white" }}
							disabled={!isNextChapter()}
							onPress={() =>
								reader.setChapter(
									reader.currentChapter.chapter + 1
								)
							}
						>
							Next
						</Btn>
					</View>
				</ScrollView>
				{/* </Loaded> */}
			</Loaded>
		</>
	)
}
