import { Text, View } from "react-native";
import useStyle from "../../hooks/useStyle";

export default function SearchBarTitle({ title }: { title: string }) {

	const style = useStyle({
		searchBarTitleContainer: {
			backgroundColor: "red",
			paddingVertical: 10
		},
		title: {
			textAlign: "center",
			color: "white"
		}
	})

	return (
		<>
			<View style={style.searchBarTitleContainer}>
				<Text style={style.title}>{title}</Text>
			</View>
		</>
	)
}