import ActionWrapper from "./wrappers/ActionWrapper"
import ChaptersAction from "./actions/ChaptersAction"
import FormatAction from "./actions/FormatAction"
import NextAction from "./actions/NextAction"
import OriginalAction from "./actions/OriginalAction"
import PreviousAction from "./actions/PreviousAction"
import AboutAction from "./actions/AboutAction"
import NotesAction from "./actions/NotesAction"
import TtsAction from "./actions/TtsAction"
import { Actions } from "./types"
import DrawerAction from "./actions/DrawerAction"
import { ColorValue } from "react-native"
import { Text } from "react-native"

export default function Action(props: {
	name: Actions
	color?: ColorValue
	forceStyle?: boolean
	forceTitle?: boolean
}) {
	switch (props.name) {
		case "previous":
			return (
				<ActionWrapper
					color={props.color}
					forceStyle={props.forceStyle}
					action={PreviousAction}
					forceTitle={props.forceTitle}
				/>
			)
		case "next":
			return (
				<ActionWrapper
					color={props.color}
					forceStyle={props.forceStyle}
					action={NextAction}
					forceTitle={props.forceTitle}
				/>
			)
		case "about":
			return (
				<ActionWrapper
					color={props.color}
					forceStyle={props.forceStyle}
					action={AboutAction}
					forceTitle={props.forceTitle}
				/>
			)
		case "format":
			return (
				<ActionWrapper
					color={props.color}
					forceStyle={props.forceStyle}
					action={FormatAction}
					forceTitle={props.forceTitle}
				/>
			)
		case "original":
			return (
				<ActionWrapper
					color={props.color}
					forceStyle={props.forceStyle}
					action={OriginalAction}
					forceTitle={props.forceTitle}
				/>
			)
		case "tts":
			return (
				<ActionWrapper
					color={props.color}
					forceStyle={props.forceStyle}
					action={TtsAction}
					forceTitle={props.forceTitle}
				/>
			)
		case "notes":
			return (
				<ActionWrapper
					color={props.color}
					forceStyle={props.forceStyle}
					action={NotesAction}
					forceTitle={props.forceTitle}
				/>
			)
		case "chapters":
			return (
				<ActionWrapper
					color={props.color}
					forceStyle={props.forceStyle}
					action={ChaptersAction}
					forceTitle={props.forceTitle}
				/>
			)
		case "drawer":
			return (
				<ActionWrapper
					color={props.color}
					forceStyle={props.forceStyle}
					action={DrawerAction}
					forceTitle={props.forceTitle}
				/>
			)
	}

	return <Text>Action</Text>
}
