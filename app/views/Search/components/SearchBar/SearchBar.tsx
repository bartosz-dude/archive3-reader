import {
	startTransition,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react"
import { Pressable, StyleSheet, TextInput, View } from "react-native"
import IconButton from "../../../../components/ui/IconButton/IconButton"
import useColorSheet from "../../../../hooks/useColorSheet"
import { useSearch } from "../../../../services/search/SearchProvider"
import styleSwitch from "../../../../components/utils/styleSwitch"

interface SearchBarProps {}

export default function SearchBar({}: SearchBarProps) {
	const colorSheet = useColorSheet(lightStyle, darkStyle, sharedStyle)
	const search = useSearch()

	const [focused, setFocused] = useState(false)

	const textInputRef = useRef<TextInput>(null)

	const fetchQuery = useCallback(() => {
		search.updateQuery({
			anyField: search.query?.anyField?.trimStart().trimEnd(),
		})
		search.fetchQuery()
	}, [search.updateQuery, search.fetchQuery])

	return (
		<>
			<View
				style={styleSwitch([
					colorSheet.bar,
					[focused, colorSheet.barFocus],
				])}
			>
				<Pressable
					style={{
						flexGrow: 1,
					}}
					onPress={(e) => {
						e.preventDefault()
						if (textInputRef.current) {
							textInputRef.current.focus()
						}
						console.log("press")
					}}
				>
					<View style={colorSheet.search}>
						<TextInput
							style={{
								// flexGrow: 1,
								width: "100%",
							}}
							onBlur={() => {
								setFocused(false)
							}}
							onFocus={() => {
								setFocused(true)
							}}
							ref={textInputRef}
							role="searchbox"
							placeholder="Search for works"
							onPress={(e) => {
								e.stopPropagation()
								e.preventDefault()
							}}
							value={search.query?.anyField}
							onSubmitEditing={() => {
								fetchQuery()
							}}
							onChangeText={(t) => {
								search.updateQuery({
									anyField: t,
								})
							}}
						/>
					</View>
				</Pressable>
				<View style={colorSheet.extra}>
					<IconButton
						name="magnify"
						onPress={() => {
							fetchQuery()
						}}
					/>
					<IconButton name="filter-outline" />
				</View>
			</View>
		</>
	)
}

const sharedStyle = StyleSheet.create({
	bar: {
		borderWidth: 2,
		borderRadius: 20,
		minHeight: 40,
		flexGrow: 1,
		// width: "100%",
		display: "flex",
		flexDirection: "row",
		gap: 5,
	},
	search: {
		paddingLeft: 15,
		flexGrow: 1,
		width: "100%",

		alignItems: "flex-start",
		justifyContent: "center",
	},
	extra: {
		minWidth: "auto",
		// flexShrink: 1,
		// flexGrow: 1,
		display: "flex",
		flexDirection: "row",
		paddingRight: 15,
		gap: 15,
	},
	text: {
		textAlign: "center",
		fontWeight: "bold",
	},
})

const lightStyle = StyleSheet.create({
	text: {
		color: "#fff",
	},
	bar: {
		borderColor: "#000",
	},
	barFocus: {
		// backgroundColor: "blue",
	},
})

const darkStyle = StyleSheet.create({
	text: {
		color: "#fff",
	},
	barFocus: {},
})
