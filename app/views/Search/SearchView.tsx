import { Text } from "react-native"
import SearchService from "../../services/search/SearchService"
import Search from "./pages/Search"

export default function SearchView() {
	return (
		<>
			<SearchService>
				<Search />
			</SearchService>
		</>
	)
}
