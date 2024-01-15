import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function Page() {
	return (
		<>
			<View style={styles.container}>
				<Link href={"/work/48613378/chapter/122623150"} style={{ height: 50, width: 50, backgroundColor: "blue", color: "white" }}>Works</Link>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
})