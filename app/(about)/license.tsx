import { Text, View } from "react-native"
import BackBtn from "../../components/common/btns/BackBtn"
import AppHeader from "../../components/common/AppHeader"

export default function LicensePage() {
	return (
		<>
			<AppHeader>
				<BackBtn />
				<Text style={{ color: "white" }}>License</Text>
				<View style={{ width: 32 }} />
			</AppHeader>
			<View>
				<Text>License</Text>
			</View>
		</>
	)
}
