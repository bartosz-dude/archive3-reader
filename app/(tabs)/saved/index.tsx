import { FlatList, ScrollView, Text, TextInput, View } from "react-native"
import { useSettings } from "../../../services/appSettings/components/settingsProvider"
import Foreach from "../../../components/common/Foreach"
import useLoading from "../../../hooks/useLoading"
import getAllWorks from "../../../services/saver/database/getAllWorks"
import Loaded from "../../../components/common/Loaded"
import { useEffect, useState } from "react"
import useCleanup from "../../../hooks/useCleanup"
import getAllSavedWork from "../../../services/saver/database/getAllSavedWorks"
import { Link, router, useNavigation, usePathname } from "expo-router"
import useStyle from "../../../hooks/useStyle"
import AppHeader from "../../../components/common/AppHeader"
import Constants from "expo-constants"
import { useAppTheme } from "../../../components/ThemeManager"
import SearchBarTitle from "../../../components/search/searchBarTitle"
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
} from "react-native-popup-menu"
import IconBtn from "../../../components/common/IconBtn"
import SearchInput from "../../../components/common/SearchInput"

export default function SavedPage() {
	const { settings, update } = useSettings()
	const theme = useAppTheme()
	const path = usePathname()
	const savedWorks = useLoading(() => getAllSavedWork())

	useEffect(() => {
		if (path == "/saved") {
			savedWorks.reload()
		}

		if (savedWorks.status == "success") {
			savedWorks.data
		}
	}, [path])

	const style = useStyle({
		entryList: {},
		entry: {
			display: "flex",
			margin: 10,
			padding: 5,
			borderStyle: "solid",
			borderColor: "grey",
		},
		authorsContainer: {
			display: "flex",
			flexDirection: "row",
			paddingBottom: 5,
		},
		summary: {
			color: "grey",
			textAlign: "justify",
			paddingBottom: 10,
			flexShrink: 1,
		},
		title: {
			paddingVertical: 10,
			color: "red",
		},
		author: {
			color: "grey",
		},
		authorSeparator: {
			marginRight: 5,
			color: "grey",
		},
		searchBar: {
			paddingTop: Constants.statusBarHeight + 10,
			paddingBottom: 10,
			paddingHorizontal: 15,
			backgroundColor: theme.header.background,
			display: "flex",
			flexDirection: "row",
			gap: 10,
			alignItems: "center",
		},
		searchBarText: {
			color: theme.header.font,
		},
		searchInputBar: {
			borderStyle: "solid",
			borderWidth: 2,
			borderColor: theme.header.accent,
			borderRadius: 50,
			paddingHorizontal: 15,
			color: theme.header.font,
			flexGrow: 1,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingRight: 5,
		},
		searchInput: {
			color: theme.header.font,
		},
		searchBarBtn: {
			color: theme.header.accent,
		},
	})

	const [filterTitle, setFilterTitle] = useState("")

	return (
		<>
			<AppHeader>
				<SearchInput
					// onSubmit={submitHander}
					value={filterTitle}
					setValue={setFilterTitle}
					placeholder="Search titles..."
					style={{
						icon: { color: theme.header.font },
						input: style.searchInput,
						view: style.searchInputBar,
					}}
				/>
				<Menu
					// ref={menu}
					name="saved-works-options"
				>
					<MenuTrigger
						customStyles={{
							TriggerTouchableComponent: IconBtn,
							triggerTouchable: {
								name: "dots-vertical",
								size: 32,
								iconStyle: { color: theme.header.font },
							},
						}}
					></MenuTrigger>
					<MenuOptions>
						<MenuOption
							text={
								settings.saved.filters.order == "latestAdded"
									? "Sorting by latest added"
									: "Sorting by oldest added"
							}
							onSelect={() => {
								update({
									saved: {
										filters: {
											order:
												settings.saved.filters.order ==
												"latestAdded"
													? "oldestAdded"
													: "latestAdded",
										},
									},
								})
							}}
						/>
					</MenuOptions>
				</Menu>
			</AppHeader>
			<SearchBarTitle title="Saved Works" />
			<Loaded isLoading={savedWorks.status}>
				<FlatList
					data={(() => {
						const filteredByTitles = (savedWorks.data ?? []).filter(
							(v) =>
								v.title
									.toLowerCase()
									.includes(filterTitle.toLowerCase())
						)

						if (settings.saved.filters.order == "oldestAdded")
							return filteredByTitles

						if (settings.saved.filters.order == "latestAdded")
							return filteredByTitles.slice().reverse()
					})()}
					renderItem={(item) => (
						<View
							style={style.entry}
							key={item.item.workId}
						>
							<Link
								style={style.title}
								href={`/work/${item.item.workId}/chapter/first`}
							>
								{item.item.title}
							</Link>
							<View style={style.authorsContainer}>
								<Foreach
									list={item.item.authors}
									each={(v) => (
										<Text
											style={style.author}
											key={v}
										>
											{v}
										</Text>
									)}
									separator={(k) => (
										<Text
											key={k}
											style={style.authorSeparator}
										>
											,
										</Text>
									)}
								/>
							</View>
							<Text
								style={style.summary}
								numberOfLines={6}
								ellipsizeMode="tail"
								textBreakStrategy="simple"
							>
								{item.item.summary}
							</Text>
						</View>
					)}
					ItemSeparatorComponent={() => (
						<View
							style={{
								height: 1,
								backgroundColor: "lightgrey",
								marginHorizontal: 10,
							}}
						/>
					)}
				/>
			</Loaded>
		</>
	)
}
