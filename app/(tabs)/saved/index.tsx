import { Text } from "react-native";
import { useSettings } from "../../../services/appSettings/components/settingsProvider";
import Foreach from "../../../components/common/Foreach";

export default function SavedPage() {

	const { settings } = useSettings()

	return (
		<>
			<Text>Saved Page</Text>
		</>
	)
}