import Constants from "expo-constants"
import { Link, useLocalSearchParams, useNavigation } from "expo-router"
import { setStatusBarTranslucent } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native"
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated"
import Btn from "../../../../../components/common/Btn"
import Foreach from "../../../../../components/common/Foreach"
import IconBtn from "../../../../../components/common/IconBtn"
import Loaded from "../../../../../components/common/Loaded"
import LoadingIndicator from "../../../../../components/common/LoadingIndicator"
import useLoading from "../../../../../hooks/useLoading"
import useStyle from "../../../../../hooks/useStyle"
import { workScraperNew } from "../../../../../services/ao3/scraper/work"
import updateWork from "../../../../../services/saver/database/updateWork"
import { useWorkContext } from "../../_layout"

function WorkReader() {
	const { workId, chapterId } = useLocalSearchParams() as {
		workId: string
		chapterId: string
	}
	// const work = useAsyncMemo(async () => workScraperNew(parseInt(workId), chapterId), (r) => {}, [])
	// const work = useAsyncMemo(async () => workScraper(parseInt(workId), chapterId), (r) => {}, [])
	// console.log("work", work)

	const work = useLoading(
		() => workScraperNew(parseInt(workId), chapterId),
		[]
	)

	// TODO When at the end of chapter it for some reason starts firing multiple times
	// FIX using withTiming does some kind of refresh that reloads the component, must investigate futher
	useEffect(() => {
		// console.log("work", work.status, work.data, work.error)
		if (work.status == "loaded" && work.data)
			updateWork({
				workId: work.data.meta.id,
				totalChapters: work.data.meta.stats.maxChapters,
				availableChapters: work.data.meta.stats.chapters,
				lastUpdate: new Date(work.data.meta.stats.updated),
				isSaved: false,
				isOffline: false,
			})
	}, [work])

	const window = useWindowDimensions()

	const [titleBarHeight, setTitleBarHeight] = useState(0)

	const style = StyleSheet.create({
		titleBar: {
			paddingTop: Constants.statusBarHeight + 10,
			paddingBottom: 10,
			paddingHorizontal: 15,
			display: "flex",
			gap: 5,
			width: window.width,
			position: "absolute",
			backgroundColor: "red",
			zIndex: 1,
		},
		titleBarText: {
			color: "white",
		},
		content: {
			paddingTop: titleBarHeight + 20,
			paddingVertical: 20,
			paddingHorizontal: 20,
			paddingBottom: 40,
		},
		bottomNav: {
			// width: "100%",
			width: window.width,
			display: "flex",
			flexDirection: "row",
			height: 60,
			backgroundColor: "red",
			// alignContent: "stretch",
			// justifyContent: "space-between"
			// alignItems: "center",
			// justifyContent: "center",
		},
		bottomNavBtn: {
			width: "50%",
			// backgroundColor: "red",
			// height: 40,
			// flexBasis: "auto",
			// paddingHorizontal: "auto"
			textAlign: "center",
			textAlignVertical: "center",
			color: "white",
			// alignSelf: "stretch"
		},
		navStatusPositioner: {
			position: "absolute",
			top: "20%",
			width: window.width,
			zIndex: 1,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		navStatus: {
			// width: "auto",
			// left: "40%"
			// paddingHorizontal: "auto",
			backgroundColor: "red",
			borderRadius: 50,
			borderColor: "red",
			borderWidth: 5,
		},
	})

	const currentOffsetY = useSharedValue(0)
	const scrollY = useSharedValue(0)

	const rollUp = useAnimatedStyle(() => ({
		top: interpolate(
			scrollY.value,
			[-1, 0, titleBarHeight],
			[0, 0, -titleBarHeight]
		),
	}))

	// const topOffset = useAnimatedStyle(() => ({
	// 	top: interpolate(scrollY.value, [ -1, 0, titleBarHeight ], [ 0, 0, -titleBarHeight ])
	// }))

	const topOffset = useAnimatedStyle(() => ({
		top:
			interpolate(
				scrollY.value,
				[-1, 0, titleBarHeight],
				[titleBarHeight, titleBarHeight, 0]
			) + 80,
	}))
	setStatusBarTranslucent(true)

	const [navigating, setNavigating] = useState(false)

	const nav = useNavigation()
	nav.addListener("state", (e) => {
		// console.log(e.data)
	})

	// const rootNavState = useRootNavigationState()

	// useEffect(() => {
	// 	console.log("root", rootNavState.key)
	// }, [ rootNavState ])

	const scrollViewRef = useRef<ScrollView>(null)

	// console.log(work)
	const scrollViewHeight = useSharedValue(0)
	const scrollViewContentHeight = useSharedValue(0)

	if (work.status == "loaded" && work.data)
		return (
			<>
				<Animated.View
					style={[style.titleBar, rollUp]}
					onLayout={(e) =>
						setTitleBarHeight(e.nativeEvent.layout.height)
					}
				>
					<Text style={style.titleBarText}>
						{work.data.meta.title}
					</Text>
					<Text style={style.titleBarText}>
						Chapter {work.data.chapters[0].chapter} ({chapterId}):{" "}
						{work.data.chapters[0].title}
					</Text>
					<IconBtn
						name="bookmark-outline"
						size={24}
					/>
				</Animated.View>

				{navigating && (
					<Animated.View
						style={[style.navStatusPositioner, topOffset]}
					>
						<View style={style.navStatus}>
							<ActivityIndicator
								color={"white"}
								size={"large"}
							/>
						</View>
					</Animated.View>
				)}

				<ScrollView
					ref={scrollViewRef}
					onLayout={(e) =>
						(scrollViewHeight.value = e.nativeEvent.layout.height)
					}
					onContentSizeChange={(w, h) =>
						(scrollViewContentHeight.value = h)
					}
					scrollEventThrottle={1}
					onScroll={(e) => {
						currentOffsetY.value = e.nativeEvent.contentOffset.y

						// shows titleBar when at the bottom
						if (
							currentOffsetY.value >
							scrollViewContentHeight.value -
								scrollViewHeight.value -
								40
						) {
							scrollY.value = 0 // <- withTiming
							return
							// hides titleBar when moving up from near the bottom
						} else if (
							currentOffsetY.value >
								scrollViewContentHeight.value -
									scrollViewHeight.value -
									80 &&
							(e.nativeEvent.velocity?.y ?? 0) < 0
						) {
							scrollY.value = titleBarHeight // <- withTiming
						}

						// disables moving titleBar when not at the top
						if (currentOffsetY.value > titleBarHeight) return

						// moves the titleBar at the top
						scrollY.value = e.nativeEvent.contentOffset.y
					}}
					onScrollBeginDrag={(e) => {
						// hides titleBar when not near the top and it's started scrolling; doesn't hide it when it's near the bottom
						if (
							currentOffsetY.value > titleBarHeight &&
							scrollY.value < titleBarHeight &&
							!(
								currentOffsetY.value >
								scrollViewContentHeight.value -
									scrollViewHeight.value -
									40
							)
						) {
							scrollY.value = titleBarHeight // <- withTiming
						}
					}}
				>
					<Pressable
						onPress={(e) => {
							// shows titleBar when not near the top and text is tapped
							if (
								currentOffsetY.value > titleBarHeight &&
								scrollY.value >= titleBarHeight
							) {
								scrollY.value = 0 // <- withTiming

								// hides titleBar when not near the top and text is tapped; doesn't hide it when it's near the bottom
							} else if (
								currentOffsetY.value > titleBarHeight &&
								!(
									currentOffsetY.value >
									scrollViewContentHeight.value -
										scrollViewHeight.value -
										40
								)
							) {
								scrollY.value = titleBarHeight // <- withTiming
							}
						}}
					>
						<View
							style={[
								style.content,
								{ paddingTop: titleBarHeight + 20 },
							]}
						>
							{work.data.chapters[0].content.map((v, i) => (
								<Text
									key={i}
									style={{
										paddingBottom: 10,
										textAlign: "justify",
										lineHeight: 22,
									}}
								>
									{v}
								</Text>
							))}
						</View>
					</Pressable>
					<View style={style.bottomNav}>
						<Link
							style={[
								style.bottomNavBtn,
								{
									backgroundColor: work.data.chapterslist[
										work.data.chapters[0].chapter - 2
									]
										? "red"
										: "grey",
								},
							]}
							href={`/work/${workId}/chapter/${
								work.data.chapterslist[
									work.data.chapters[0].chapter - 2
								]
									? work.data.chapterslist[
											work.data.chapters[0].chapter - 2
									  ].id
									: null
							}`}
							disabled={
								!work.data.chapterslist[
									work.data.chapters[0].chapter - 2
								]
							}
							replace
							onPress={() => setNavigating(true)}
						>
							Previous Chapter
						</Link>
						<Link
							style={[
								style.bottomNavBtn,
								{
									backgroundColor: work.data.chapterslist[
										work.data.chapters[0].chapter
									]
										? "red"
										: "grey",
								},
							]}
							href={`/work/${workId}/chapter/${
								work.data.chapterslist[
									work.data.chapters[0].chapter
								]
									? work.data.chapterslist[
											work.data.chapters[0].chapter
									  ].id
									: null
							}`}
							disabled={
								!work.data.chapterslist[
									work.data.chapters[0].chapter
								]
							}
							replace
							onPress={() => {
								// console.log("navigating")
								setNavigating(true)
							}}
						>
							Next Chapter
						</Link>
					</View>
				</ScrollView>
			</>
		)

	return (
		<>
			<Animated.View
				style={[style.titleBar, rollUp]}
				onLayout={(e) => setTitleBarHeight(e.nativeEvent.layout.height)}
			>
				<Text style={style.titleBarText}>Loading...</Text>
				<Text style={style.titleBarText}>Loading...</Text>
			</Animated.View>

			<Animated.View style={[style.navStatusPositioner, topOffset]}>
				<View style={style.navStatus}>
					<ActivityIndicator
						color={"white"}
						size={"large"}
					/>
				</View>
			</Animated.View>
		</>
	)
}

export default function newWorkReader() {
	const work = useWorkContext()

	const [scrollViewHeight, setScrollViewHeight] = useState<
		number | undefined
	>()
	const [scrollViewOffsetY, setScrollViewOffsetY] = useState<
		number | undefined
	>()

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
			// width: 80,
			backgroundColor: "red",
			// alignSelf: "stretch",
			// flexBasis: 1,
			flexGrow: 1,
		},
		chapterNav: {
			display: "flex",
			flexDirection: "row",
			alignItems: "stretch",
			backgroundColor: "red",
			// flexBasis: 1,
		},
	})

	useEffect(() => {
		if (scrollViewHeight && scrollViewOffsetY)
			console.log("chapter position", scrollViewHeight, scrollViewOffsetY)
	}, [scrollViewHeight, scrollViewOffsetY])

	return (
		<>
			<Loaded
				isLoading={work.work.status}
				loading={
					<>
						<LoadingIndicator />
					</>
				}
			>
				<ScrollView
					// onContentSizeChange={(e) => setScrollViewHeight(e)}
					onLayout={(e) =>
						setScrollViewHeight(e.nativeEvent.layout.height)
					}
					onScroll={(e) =>
						setScrollViewOffsetY(e.nativeEvent.contentOffset.y)
					}
				>
					<View style={style.content}>
						<Foreach
							list={work.work.data?.chapters[0].content ?? []}
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
									backgroundColor: work.isPreviousChapter()
										? "red"
										: "grey",
								},
							]}
							textStyle={{ color: "white" }}
							disabled={!work.isPreviousChapter()}
							onPress={() => work.previousChapter()}
						>
							Previous
						</Btn>
						<Btn
							style={[
								style.nextChapter,
								{
									backgroundColor: work.isNextChapter()
										? "red"
										: "grey",
								},
							]}
							textStyle={{ color: "white" }}
							disabled={!work.isNextChapter()}
							onPress={() => work.nextChapter()}
						>
							Next
						</Btn>
					</View>
				</ScrollView>
			</Loaded>
		</>
	)
}
