import { Text, View } from "react-native"
import BackBtn from "../../components/common/BackBtn"
import Header from "../../components/common/Header"

export default function LicensePage() {
	return (
		<>
			<Header>
				<BackBtn />
				<Text style={{ color: "white" }}>License</Text>
				<View style={{ width: 32 }} />
			</Header>
			<View>
				<Text>License</Text>
			</View>
		</>
	)
}
