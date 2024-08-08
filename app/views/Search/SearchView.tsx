import {
	SafeAreaView,
	StatusBar,
	Text,
	useWindowDimensions,
	View,
} from "react-native"
import SearchService from "../../services/search/SearchService"
import Search from "./pages/Search"
import SearchBar from "./components/SearchBar/SearchBar"
import IconButton from "../../components/ui/IconButton/IconButton"
import { useTransition } from "react"
import Show from "../../components/utils/Show"

export default function SearchView() {
	const { height } = useWindowDimensions()

	return (
		<>
			<SearchService>
				<View
					style={{
						borderColor: "pink",
						// borderWidth: 5,
						maxHeight: "100%",
						// display: "flex",
						flex: 1,
						flexDirection: "column",
						marginTop: StatusBar.currentHeight,
						// justifyContent: "center",
						overflow: "hidden",
					}}
				>
					<View
						style={{
							display: "flex",
							// flex: 1,
							flexDirection: "row",
							gap: 10,
							margin: 10,
							justifyContent: "center",
						}}
					>
						<SearchBar />
						{/* <View
							style={{
								flexGrow: 1,
								borderColor: "red",
								borderWidth: 1,
								minWidth: 50,
							}}
						> */}
						<IconButton name="dots-vertical" />
						{/* </View> */}
					</View>
					<View
						style={{
							borderColor: "blue",
							// borderWidth: 1,
							flexGrow: 1,
							flex: 1,
						}}
					>
						<Search />
					</View>
				</View>
			</SearchService>
		</>
	)
}
