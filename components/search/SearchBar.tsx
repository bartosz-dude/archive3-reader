import { router, useGlobalSearchParams } from "expo-router"
import { useState, useRef, useEffect } from "react"
import { TextInputProps, View, TextInput } from "react-native"
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu"
import useStyle from "../../hooks/useStyle"
import worksQuery from "../../services/ao3/api/worksQuery"
import IconBtn from "../IconBtn"
import Constants from "expo-constants"
import saveQuery from "../../services/saver/api/saveQuery"
import getSavedQueries from "../../services/saver/api/getSavedQueries"

export default function SearchBar() {

	const { ao3Query } = useGlobalSearchParams() as { ao3Query: string }

	const [ searchAnyText, setSearchAnyText ] = useState("")

	const menu = useRef<Menu>(null)


	const submitHander: TextInputProps[ "onSubmitEditing" ] = (e) => {
		const q = worksQuery({
			anyField: searchAnyText
		})

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
				{/* <MaterialCommunityIcons style={style.searchBarBtn} name="filter-outline" size={32} />
				<MaterialCommunityIcons style={style.searchBarBtn} name="dots-vertical" size={32} /> */}
				<IconBtn style={style.searchBarBtn} iconStyle={{ color: "white" }} name="filter-outline" size={32} />
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
						<MenuOption text="Save search" onSelect={() => saveQuery(worksQuery(ao3Query))} />
						<MenuOption text="Saved searches" onSelect={() => getSavedQueries().then((v) => console.log("save search ", v))} />
						<MenuOption text="History" />
						<MenuOption text="Settings" />
					</MenuOptions>
				</Menu>
			</View >
		</>
	)
}