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
import IconBtn from "../../components/common/btns/IconBtn"
import Constants from "expo-constants"
import saveQuery, { SaveQueryErrors } from "../../services/saver/api/saveQuery"
import getSavedQueries from "../../services/saver/api/getSavedQueries"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import saveSettings from "../../services/appSettings/api/saveSettings"
import { useSettings } from "../../services/appSettings/components/settingsProvider"
import AppHeader from "../../components/common/AppHeader"
import { useAppTheme } from "../../components/ThemeManager"
import Show from "../../components/common/Show"
import SearchInput from "../../components/common/SearchInput"
import SearchBarMenu from "./SearchBarMenu"

export default function SearchBar() {
	const theme = useAppTheme()

	const { ao3Query } = useGlobalSearchParams() as { ao3Query: string }

	const [searchAnyText, setSearchAnyText] = useState("")
	const [query, setQuery] = useState(worksQuery({}))

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
		searchBarBtn: {
			color: theme.header.accent,
		},
	})

	return (
		<>
			<AppHeader>
				<SearchInput
					onSubmit={submitHander}
					value={searchAnyText}
					setValue={setSearchAnyText}
					placeholder="Search for works..."
				/>
				{/* <IconBtn
					style={style.searchBarBtn}
					iconStyle={{ color: "grey" }}
					name="filter-outline"
					size={32}
					disabled
				/> */}

				<SearchBarMenu ao3Query={ao3Query} />
			</AppHeader>
		</>
	)
}
