import { Text, View } from "react-native"
import { useSettings } from "../../../services/appSettings/components/settingsProvider"
import Action from "./Action"

export default function ActionsDrawer() {
	const { settings } = useSettings()

	return (
		<>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					paddingHorizontal: 10,
					rowGap: 15,
					paddingVertical: 20,
					justifyContent: "center",
				}}
			>
				{settings.readerFormat.actionBarLayout.actionsDrawer.map(
					(v, i) => (
						<Action
							key={i}
							name={v}
							color="#000000"
							forceStyle
							forceTitle
						/>
					)
				)}
			</View>
		</>
	)
}
