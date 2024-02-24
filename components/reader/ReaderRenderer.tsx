import { useEffect, useRef, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import useStatus from "../../hooks/useStatus"
import useStyle from "../../hooks/useStyle"
import useWillUnmount from "../../hooks/useWillUnmount"
import clamp from "../../tools/clamp"
import fixed from "../../tools/fixed"
import Btn from "../common/Btn"
import Foreach from "../common/Foreach"
import Loaded from "../common/Loaded"
import LoadingIndicator from "../common/LoadingIndicator"
import { useAppTheme } from "../ThemeManager"
import { FontWeightString, useFormatter } from "./ReaderFormatter"
import IconTitleBtn from "../common/IconTitleBtn"
import { useReaderManager } from "./ReaderManagerNew"
import { usePathname } from "expo-router"

export default function ReaderRenderer() {
	const theme = useAppTheme()
	const newReader = useReaderManager()
	const formatter = useFormatter()
	const pathname = usePathname()

	useEffect(() => {}, [])
	// const [status, setStatus] = useStatus()

	const willUnmount = useWillUnmount()

	const [layoutHeight, setLayoutHeight] = useState(0)
	const [contentHeight, setContentHeight] = useState(0)
	const [workHeight, setWorkHeight] = useState(0)

	useEffect(() => {
		setWorkHeight(contentHeight - layoutHeight)
	}, [layoutHeight, contentHeight])

	const [currentChapter, setCurrentChapter] = useState(0)

	const scrollViewRef = useRef<ScrollView>(null)
	const [scrollViewOffsetY, setScrollViewOffsetY] = useState(0)
	const [offsetY, setOffsetY] = useState(0)
	const [canScroll, setCanScroll] = useState(false)

	useEffect(() => {
		if (newReader.currentChapter.chapter != currentChapter) {
			setCurrentChapter(newReader.currentChapter.chapter ?? 0)
			setScrollViewOffsetY(0)
			setCanScroll(false)
			// setStatus("loading")
			// console.log("reopened")
		}
	}, [newReader.currentChapter.chapter])

	// update progress when scrolling
	useEffect(() => {
		const offsetY = clamp(
			fixed(isNaN(scrollViewOffsetY) ? 0 : scrollViewOffsetY, 2),
			{
				min: { else: 0, to: 0 },
				max: { to: workHeight, else: workHeight },
			}
		)
		setOffsetY(offsetY)

		if (!canScroll) return

		const newProgress = (() => {
			if (isNaN(offsetY / workHeight)) return 0

			if (fixed(offsetY / workHeight, 5) >= 0.99999) return 1

			return offsetY / workHeight
		})()

		newReader.setProgress(newProgress)
	}, [scrollViewOffsetY])

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
			display: "flex",
			paddingVertical: 40,
			paddingHorizontal: formatter.format.horizontalSpacing,
		},
		paragraph: {
			fontFamily: formatter.format.fontFamily,
			fontSize: formatter.format.fontSize,
			paddingBottom: formatter.format.paragraphSpacing,
			textAlign: "justify",
			lineHeight:
				formatter.format.fontSize + formatter.format.lineSpacing,
			fontWeight:
				formatter.format.fontWeight === 0
					? "normal"
					: (formatter.format.fontWeight.toString() as FontWeightString),
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

	// scroll to saved position when opening a work
	useEffect(() => {
		if (
			isNaN(newReader.currentProgress ?? NaN) ||
			isNaN(offsetY / workHeight)
		)
			return

		if (
			newReader.currentProgress >= 0 &&
			fixed(offsetY / workHeight, 5) !=
				fixed(newReader.currentProgress, 5) &&
			// status != "success"
			!canScroll
		) {
			scrollViewRef.current?.scrollTo({
				y: workHeight * newReader.currentProgress,
			})
		}
		if (
			newReader.currentProgress >= 0 &&
			fixed(offsetY / workHeight, 5) ==
				fixed(newReader.currentProgress, 5) &&
			// status != "success"
			!canScroll
		) {
			// setStatus("success")
			setCanScroll(true)
			// for some reason when opening chapter select it still loads this component
			// so this prevents start of tracking in such situation
			if (!pathname.includes("chapterSelect")) newReader.startTracking()
		}
	}, [offsetY, workHeight, canScroll])

	useEffect(() => {
		return () => {
			// this is wrong, should be willUnmount.current, but it works how it should, so better not touch it
			if (willUnmount) {
				newReader.endTracking()
			}
		}
	}, [])

	function isPreviousChapter() {
		return (newReader.chapters() ?? [])[
			(newReader.currentChapter.chapter ?? 0) - 1
		]
			? true
			: false
	}

	function isNextChapter() {
		return (newReader.chapters() ?? [])[
			(newReader.currentChapter.chapter ?? 0) + 1
		]
			? true
			: false
	}

	return (
		<>
			<Loaded
				isLoading={newReader.workStatus}
				loading={
					<>
						{/* <View style={{ height: "80%" }}> */}
						{/* <LoadingIndicator /> */}
						{/* </View> */}
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
							list={newReader.work?.chapters[0].content ?? []}
							each={(item, i) => {
								return (
									<Text
										key={i}
										style={{
											fontFamily:
												formatter.format.fontFamily,
											fontSize: formatter.format.fontSize,
											paddingBottom:
												formatter.format
													.paragraphSpacing,
											textAlign: "justify",
											lineHeight:
												formatter.format.fontSize +
												formatter.format.lineSpacing,
											fontWeight:
												formatter.format.fontWeight ===
												0
													? "normal"
													: (formatter.format.fontWeight.toString() as FontWeightString),
											flexShrink: 1,
										}}
									>
										{item}
									</Text>
								)
							}}
						/>
					</View>
					<View style={style.chapterNav}>
						<IconTitleBtn
							style={[
								style.nextChapter,
								{
									backgroundColor: isPreviousChapter()
										? theme.reader.previousChapter.is
										: theme.reader.previousChapter.no,
								},
								{
									flexDirection: "row",
									justifyContent: "center",
								},
							]}
							textStyle={{
								color: theme.reader.previousChapter.font,
							}}
							disabled={!isPreviousChapter()}
							onPress={() => {
								newReader.setChapter(
									(newReader.currentChapter.chapter ?? -68) -
										1
								)
							}}
							name="skip-previous"
							size={32}
							title="Previous"
							iconStyle={{
								color: theme.reader.previousChapter.font,
							}}
							android_ripple={undefined}
						/>
						<IconTitleBtn
							style={[
								style.nextChapter,
								{
									backgroundColor: isNextChapter()
										? theme.reader.nextChapter.is
										: theme.reader.nextChapter.no,
								},
								{
									flexDirection: "row-reverse",
									justifyContent: "center",
								},
							]}
							textStyle={{ color: theme.reader.nextChapter.font }}
							disabled={!isNextChapter()}
							onPress={() => {
								newReader.setChapter(
									(newReader.currentChapter.chapter ?? -70) +
										1
								)
							}}
							name="skip-next"
							size={32}
							title="Next"
							iconStyle={{
								color: theme.reader.nextChapter.font,
							}}
							android_ripple={undefined}
						/>
					</View>
				</ScrollView>
			</Loaded>
		</>
	)
}
