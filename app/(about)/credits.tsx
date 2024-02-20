import { Text, View } from "react-native"
import BackBtn from "../../components/common/BackBtn"
import Header from "../../components/common/Header"
import useStyle from "../../hooks/useStyle"
import { ExternalLink } from "../../components/ExternalLink"

export default function CreditsPage() {
	const style = useStyle({
		content: {
			padding: 10,
		},
	})

	return (
		<>
			<Header>
				<BackBtn />
				<Text style={{ color: "white" }}>Credits</Text>
				<View style={{ width: 32 }} />
			</Header>
			<View style={style.content}>
				{/* <Text>UI - Bartosz Dudziński</Text>
				<Text>Programming - Bartosz Dudziński</Text> */}
			</View>
			<View style={style.content}>
				<Text>
					Content provided by{" "}
					<ExternalLink
						href="https://archiveofourown.org/"
						style={{
							textDecorationLine: "underline",
							textDecorationColor: "blue",
						}}
					>
						archiveofourown.org
					</ExternalLink>
					.
				</Text>
				<Text>
					This app is developed independently from archiveofourown.
				</Text>
			</View>
		</>
	)
}
