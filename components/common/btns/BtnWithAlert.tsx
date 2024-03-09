import { useRef } from "react"
import Btn from "./Btn"
import { Alert, AlertButton } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import IconBtn from "./IconBtn"

type AlertProps = {
	title: string
	message: string
	cancel?: {
		text?: string
		onPress: () => void
		style?: AlertButton["style"]
	}
	ok?: {
		text?: string
		onPress: () => void
		style?: AlertButton["style"]
	}
	later?: {
		text?: string
		onPress: () => void
		style?: AlertButton["style"]
	}
}
type BtnWithAlertProps =
	| {
			type: "text"
			text: string
			alert: AlertProps
			style?: React.ComponentProps<typeof Btn>["style"]
			textStyle?: React.ComponentProps<typeof Btn>["textStyle"]
	  }
	| {
			type: "icon"
			iconName: React.ComponentProps<
				typeof MaterialCommunityIcons
			>["name"]
			iconSize: number
			alert: AlertProps
			style?: React.ComponentProps<typeof IconBtn>["style"]
			iconStyle?: React.ComponentProps<typeof IconBtn>["iconStyle"]
	  }

export default function BtnWithAlert(props: BtnWithAlertProps) {
	const showAlert = useRef(() => {
		Alert.alert(
			props.alert.title,
			props.alert.message,
			(() => {
				const btns: AlertButton[] = []

				if (props.alert.ok)
					btns.push({
						text: props.alert.ok.text ?? "Ok",
						onPress: props.alert.ok.onPress,
						style: props.alert.ok.style ?? "default",
					})

				if (props.alert.cancel)
					btns.push({
						text: props.alert.cancel.text ?? "Cancel",
						onPress: props.alert.cancel.onPress,
						style: props.alert.cancel.style ?? "cancel",
					})

				if (props.alert.later)
					btns.push({
						text: props.alert.later.text ?? "Later",
						onPress: props.alert.later.onPress,
						style: props.alert.later.style ?? "default",
					})

				return btns
			})()
		)
	})
	return (
		<>
			{props.type == "text" ? (
				<Btn
					style={props.style}
					textStyle={props.textStyle}
					onPress={() => showAlert.current()}
				>
					{props.text}
				</Btn>
			) : (
				<IconBtn
					style={props.style}
					iconStyle={props.iconStyle}
					name={props.iconName}
					size={props.iconSize}
				/>
			)}
		</>
	)
}
