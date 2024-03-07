import { useRef, useState } from "react"
import {
	Pressable,
	StyleProp,
	TextInputProps,
	TextStyle,
	ViewStyle,
} from "react-native"
import { TextInput } from "react-native-gesture-handler"
import IconBtn from "./IconBtn"
import Show from "./Show"

export default function SearchInput(props: {
	placeholder: string
	value: string
	setValue: (value: string) => void
	style: {
		view: StyleProp<ViewStyle>
		input: StyleProp<TextStyle>
		icon: StyleProp<TextStyle>
	}
	onSubmit?: TextInputProps["onSubmitEditing"]
}) {
	const textInputRef = useRef<TextInput>(null)
	const [textInputFocused, setTextInputFocused] = useState(false)

	return (
		<Pressable
			style={[props.style.view]}
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
				style={props.style.input}
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
					iconStyle={props.style.icon}
					onPress={(e) => {
						e.preventDefault()
						props.setValue("")
					}}
				/>
			</Show>
		</Pressable>
	)
}
