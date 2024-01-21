import { ActivityIndicator, View } from "react-native";
import useStyle from "../hooks/useStyle";

export default function LoadingIndicator({}) {

	const style = useStyle({
		indicatorBackground: {
			backgroundColor: "red",
			borderRadius: 50,
			borderColor: "red",
			borderWidth: 5,
		},
		container: {
			zIndex: 1,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			marginVertical: 10
		}
	}, [])

	return (
		<>
			<View style={style.container}>
				<View style={style.indicatorBackground}>
					<ActivityIndicator color={"white"} size={"large"} />
				</View>
			</View>
		</>
	)
}