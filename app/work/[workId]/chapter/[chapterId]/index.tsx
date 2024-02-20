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
import { useTheme } from "../../../../../components/ThemeManager"

export default function newWorkReader() {
	const theme = useTheme()
	const reader = useReaderContext()

	const [status, setStatus] = useStatus()

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
	const scrollViewRef = useRef<ScrollView>(null)
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

	const style = useStyle({
		titleColumn: {
			display: "flex",
			flexDirection: "column",
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
			alignItems: "stretch",
			backgroundColor: "red",
			flexBasis: 1,
		},
	})

	const loadDelay = useRef<NodeJS.Timeout>()

	// const loadDelay = useRe

	const [canScroll, setCanScroll] = useState(false)

	useEffect(() => {
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
			setStatus("success")
			setCanScroll(true)
			reader.startTracking()
		}
	}, [offsetY, workHeight, status])

	useEffect(() => {
		return () => {
			if (willUnmount) {
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
				<ScrollView
					ref={scrollViewRef}
					scrollEnabled={canScroll}
					contentContainerStyle={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
					scrollEventThrottle={1}
					onScroll={(e) => {
						setScrollViewOffsetY(e.nativeEvent.contentOffset.y)
					}}
					onLayout={(e) => {
						setLayoutHeight(e.nativeEvent.layout.height)
					}}
					onContentSizeChange={(w, h) => {
						setContentHeight(h)
					}}
				>
					<View style={style.content}>
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
										? theme.reader.previousChapter.is
										: theme.reader.previousChapter.no,
								},
							]}
							textStyle={{
								color: theme.reader.previousChapter.font,
							}}
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
										? theme.reader.nextChapter.is
										: theme.reader.nextChapter.no,
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
