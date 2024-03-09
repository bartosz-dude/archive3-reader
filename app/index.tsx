import { Redirect } from "expo-router"

export default function RootIndex() {
	return (
		<>
			{/* <Text>You're not supposed to be here</Text> */}
			<Redirect href={"/search"} />
		</>
	)
}
