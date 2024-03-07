import {
	router,
	useGlobalSearchParams,
	useNavigation,
	usePathname,
} from "expo-router"
import { useState, useRef, useEffect } from "react"
import {
	TextInputProps,
	View,
	TextInput,
	Text,
	ToastAndroid,
	Pressable,
	// ToastAndroid,
} from "react-native"
import {
	Menu,
	MenuTrigger,
	MenuOptions,
	MenuOption,
} from "react-native-popup-menu"
import useStyle from "../../hooks/useStyle"
import worksQuery from "../../services/ao3/api/worksQuery"
import IconBtn from "../common/IconBtn"
import Constants from "expo-constants"
import saveQuery, { SaveQueryErrors } from "../../services/saver/api/saveQuery"
import getSavedQueries from "../../services/saver/api/getSavedQueries"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import saveSettings from "../../services/appSettings/api/saveSettings"
import { useSettings } from "../../services/appSettings/components/settingsProvider"
import AppHeader from "../common/AppHeader"
import { useAppTheme } from "../ThemeManager"
import Show from "../common/Show"
import SearchInput from "../common/SearchInput"

export default function SearchBar() {
	const theme = useAppTheme()

	const { ao3Query } = useGlobalSearchParams() as { ao3Query: string }

	const [searchAnyText, setSearchAnyText] = useState("")
	const [query, setQuery] = useState(worksQuery({}))

	const menu = useRef<Menu>(null)

	useEffect(() => {
		const q = worksQuery(ao3Query).paramsAsQuery()
		if (q.anyField) setSearchAnyText(q.anyField)
		else setSearchAnyText("")
	}, [ao3Query])

	// useEffect(() => {
	// setQuery(worksQuery)
	// }, [searchAnyText])

	const submitHander: TextInputProps["onSubmitEditing"] = (e) => {
		const q = worksQuery({
			anyField: searchAnyText.trim(),
		})

		router.replace("/search")
		router.setParams({
			ao3Query: q.paramsAsJSON(),
		})
	}

	const style = useStyle({
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

	const pathname = usePathname()

	const textInputRef = useRef<TextInput>(null)
	const [textInputFocused, setTextInputFocused] = useState(false)

	return (
		<>
			<AppHeader>
				<SearchInput
					onSubmit={submitHander}
					value={searchAnyText}
					setValue={setSearchAnyText}
					placeholder="Search for works..."
					style={{
						icon: { color: theme.header.font },
						input: style.searchInput,
						view: style.searchInputBar,
					}}
				/>
				<IconBtn
					style={style.searchBarBtn}
					iconStyle={{ color: "grey" }}
					name="filter-outline"
					size={32}
					disabled
				/>

				<Menu
					ref={menu}
					name="search-options"
				>
					<MenuTrigger
						customStyles={{
							TriggerTouchableComponent: IconBtn,
							triggerTouchable: {
								name: "dots-vertical",
								size: 32,
								iconStyle: { color: "white" },
							},
						}}
					></MenuTrigger>
					<MenuOptions
						customStyles={
							{
								// optionsContainer: {
								// 	marginTop: 32
								// }
							}
						}
					>
						{pathname == "/search" && (
							<MenuOption
								text="Save search"
								onSelect={() => {
									saveQuery(worksQuery(ao3Query))
										.then(() => {
											ToastAndroid.show(
												"Search saved",
												ToastAndroid.SHORT
											)
										})
										.catch((err) => {
											if (
												err.message ==
												SaveQueryErrors.alreadyExists
											)
												return
											ToastAndroid.show(
												"Already saved",
												ToastAndroid.SHORT
											)
										})
								}}
							/>
						)}
						<MenuOption
							text="Saved searches"
							onSelect={() =>
								router.push("/search/savedSearches")
							}
						/>
						{/* <MenuOption
							text="History"
							disabled
						/> */}
						<MenuOption
							text="Settings"
							onSelect={() => {
								router.push("/settings")
								// update({ savedSearchesAsDefault: !settings.savedSearchesAsDefault })
							}}
						/>
					</MenuOptions>
				</Menu>
			</AppHeader>
		</>
	)
}
