import { PropsWithChildren } from "react"
import { View } from "react-native"
import useStyle from "../../hooks/useStyle"

export default function SettingsCategoryTitle(props: {} & PropsWithChildren) {
	const style = useStyle({
		entry: {
			paddingHorizontal: 10,
			paddingVertical: 10,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
	})

	return (
		<>
			<View style={style.entry}>
				{props.children}
				<View
					style={{
						backgroundColor: "grey",
						height: 1,
						flexGrow: 1,
						marginLeft: 10,
					}}
				></View>
			</View>
		</>
	)
}
