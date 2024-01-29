import { router, useGlobalSearchParams, useNavigation, usePathname } from "expo-router"
import { useState, useRef, useEffect } from "react"
import { TextInputProps, View, TextInput, Text, ToastAndroid } from "react-native"
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu"
import useStyle from "../../hooks/useStyle"
import worksQuery from "../../services/ao3/api/worksQuery"
import IconBtn from "../common/IconBtn"
import Constants from "expo-constants"
import saveQuery, { SaveQueryErrors } from "../../services/saver/api/saveQuery"
import getSavedQueries from "../../services/saver/api/getSavedQueries"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import saveSettings from "../../services/appSettings/api/saveSettings"
import { useSettings } from "../../services/appSettings/components/settingsProvider"

export default function SearchBar() {

	const { ao3Query } = useGlobalSearchParams() as { ao3Query: string }

	const [ searchAnyText, setSearchAnyText ] = useState("")
	const [ query, setQuery ] = useState(worksQuery({}))

	const menu = useRef<Menu>(null)

	useEffect(() => {
		const q = worksQuery(ao3Query).paramsAsQuery()
		if (q.anyField)
			setSearchAnyText(q.anyField)
		else
			setSearchAnyText("")
	}, [ ao3Query ])

	// useEffect(() => {
	// setQuery(worksQuery)
	// }, [searchAnyText])

	const submitHander: TextInputProps[ "onSubmitEditing" ] = (e) => {
		const q = worksQuery({
			anyField: searchAnyText.trim()
		})

		router.replace("/search")
		router.setParams({
			ao3Query: q.paramsAsJSON()
		})
	}

	const style = useStyle({
		searchBar: {
			paddingTop: Constants.statusBarHeight + 10,
			paddingBottom: 10,
			paddingHorizontal: 15,
			backgroundColor: "red",
			display: "flex",
			flexDirection: "row",
			gap: 10,
			alignItems: "center"
		},
		searchBarText: {
			color: "white"
		},
		searchInput: {
			borderStyle: "solid",
			borderWidth: 2,
			borderColor: "white",
			borderRadius: 50,
			paddingHorizontal: 15,
			color: "white",
			flexGrow: 1
		},
		searchBarBtn: {
			color: "white"
		}
	})

	const pathname = usePathname()

	const { settings, update } = useSettings()

	return (
		<>
			<View style={style.searchBar}>
				<TextInput
					style={style.searchInput}
					onChangeText={setSearchAnyText}
					value={searchAnyText}
					onSubmitEditing={submitHander}
					cursorColor={"white"}
					placeholder="Search for works..."
					placeholderTextColor={"lightgrey"}
				/>
				<IconBtn style={style.searchBarBtn} iconStyle={{ color: "grey" }} name="filter-outline" size={32} disabled />
				{/* <IconBtn style={style.searchBarBtn} iconStyle={{ color: "white" }} name="dots-vertical" size={32}
					onPress={() => menu.current?.open()}
				/> */}
				<Menu
					ref={menu}
					name="search-extra-options"
				>
					<MenuTrigger
						customStyles={{
							TriggerTouchableComponent: IconBtn,
							triggerTouchable: { name: "dots-vertical", size: 32, iconStyle: { color: "white" } }
						}}
					>
						{/* <MaterialCommunityIcons style={{ color: "white" }} name="dots-vertical" size={32} /> */}
					</MenuTrigger>
					<MenuOptions
						customStyles={{
							// optionsContainer: {
							// 	marginTop: 32
							// }
						}}
					>
						{pathname == "/search" &&
							<MenuOption text="Save search" onSelect={() => {
								saveQuery(worksQuery(ao3Query))
									.then(() => {
										ToastAndroid.show("Search saved", ToastAndroid.SHORT)
									})
									.catch((err) => {
										if (err.message == SaveQueryErrors.alreadyExists)
											ToastAndroid.show("Already saved", ToastAndroid.SHORT)
									})
							}} />
						}
						<MenuOption text="Saved searches" onSelect={() => router.push("/search/savedSearches")} />
						<MenuOption text="History" disabled />
						<MenuOption text="Settings" onSelect={() => {
							router.push("/settings")
							// update({ savedSearchesAsDefault: !settings.savedSearchesAsDefault })
						}} />
					</MenuOptions>
				</Menu>
			</View >
		</>
	)
}