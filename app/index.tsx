import { Redirect } from "expo-router"
import { Text } from "react-native"

export default function RootIndex() {
	return (
		<>
			<Text>You're not supposed to be here</Text>
			<Redirect href={"/(tabs)/search"} />
		</>
	)
}
