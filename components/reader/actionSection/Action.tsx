import ActionWrapper from "./actionWrapper"
import ChaptersAction from "./actions/ChaptersAction"
import FormatAction from "./actions/FormatAction"
import NextAction from "./actions/NextAction"
import OriginalAction from "./actions/OriginalAction"
import PreviousAction from "./actions/PreviousAction"
import AboutAction from "./actions/aboutAction"
import NotesAction from "./actions/notesAction"
import TtsAction from "./actions/ttsAction"
import { Actions } from "./types"

export default function Action(props: { name: Actions }) {
	switch (props.name) {
		case "previous":
			return <ActionWrapper action={PreviousAction} />
		case "next":
			return <ActionWrapper action={NextAction} />
		case "about":
			return <ActionWrapper action={AboutAction} />
		case "format":
			return <ActionWrapper action={FormatAction} />
		case "original":
			return <ActionWrapper action={OriginalAction} />
		case "tts":
			return <ActionWrapper action={TtsAction} />
		case "notes":
			return <ActionWrapper action={NotesAction} />
		case "chapters":
			return <ActionWrapper action={ChaptersAction} />
	}
}
