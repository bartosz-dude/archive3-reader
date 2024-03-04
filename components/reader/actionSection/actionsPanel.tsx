import Show from "../../common/Show"
import FormatPanel from "../FormatPanel"
import { useActionSection } from "./ReaderActionSection"

// TODO make it float over the content instead of FormatPanel alone
export default function ActionPanel() {
	const actionSection = useActionSection()
	return (
		<>
			<Show when={actionSection.openedPanel == "format"}>
				<FormatPanel isOpened={actionSection.openedPanel == "format"} />
			</Show>
		</>
	)
}
