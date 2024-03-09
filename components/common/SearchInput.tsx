import { useRef, useState } from "react"
import {
	Pressable,
	StyleProp,
	TextInputProps,
	TextStyle,
	ViewStyle,
} from "react-native"
import { TextInput } from "react-native-gesture-handler"
import IconBtn from "./btns/IconBtn"
import Show from "./Show"
import useStyle from "../../hooks/useStyle"
import { useAppTheme } from "../ThemeManager"

export default function SearchInput(props: {
	placeholder: string
	value: string
	setValue: (value: string) => void
	style?: {
		view?: StyleProp<ViewStyle>
		input?: StyleProp<TextStyle>
		icon?: StyleProp<TextStyle>
	}
	onSubmit?: TextInputProps["onSubmitEditing"]
}) {
	const theme = useAppTheme()
	const textInputRef = useRef<TextInput>(null)
	const [textInputFocused, setTextInputFocused] = useState(false)

	const style = useStyle({
		view: {
			borderStyle: "solid",
			borderWidth: 2,
			borderColor: theme.header.accent,
			borderRadius: 50,
			paddingHorizontal: 15,
			color: theme.header.font,
			flexGrow: 1,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingRight: 5,
		},
	})

	return (
		<Pressable
			style={[style.view, props.style?.view]}
			onPress={() => {
				console.log("press")
				if (textInputRef.current?.isFocused()) {
					textInputRef.current?.blur()
				} else {
					textInputRef.current?.focus()
				}
			}}
		>
			<TextInput
				ref={textInputRef}
				style={[
					{
						color: theme.header.font,
					},
					props.style?.input,
				]}
				onChangeText={props.setValue}
				value={props.value}
				onSubmitEditing={props.onSubmit}
				cursorColor={"white"}
				placeholder={props.placeholder}
				placeholderTextColor={"lightgrey"}
				onFocus={(e) => setTextInputFocused(true)}
				onBlur={(e) => setTextInputFocused(false)}
			/>
			<Show when={!(props.value === "") && textInputFocused}>
				<IconBtn
					type="materialIcons"
					name="clear"
					size={24}
					iconStyle={[
						{ color: theme.header.font },
						props.style?.icon,
					]}
					onPress={(e) => {
						e.preventDefault()
						props.setValue("")
					}}
				/>
			</Show>
		</Pressable>
	)
}
