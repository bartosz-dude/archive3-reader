import { PropsWithChildren } from "react"
import { View } from "react-native"
import useStyle from "../../hooks/useStyle"

export default function SettingsEntry(props: {} & PropsWithChildren) {
	const style = useStyle({
		entry: {
			paddingHorizontal: 10,
			paddingVertical: 10,
		},
	})

	return (
		<>
			<View style={style.entry}>{props.children}</View>
		</>
	)
}
