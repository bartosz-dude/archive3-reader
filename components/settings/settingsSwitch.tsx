import { Switch, Text, View } from "react-native"
import useStyle from "../../hooks/useStyle"

export default function SettingsSwitch(props: {
	text: string
	value: boolean
	onValueChange: (value: boolean) => void | Promise<void>
}) {
	const style = useStyle({
		entry: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
	})

	return (
		<View style={style.entry}>
			<Text>{props.text}</Text>
			<Switch
				value={props.value}
				onValueChange={props.onValueChange}
				trackColor={{ true: "#ff9999" }}
				thumbColor={props.value ? "red" : "white"}
			/>
		</View>
	)
}
