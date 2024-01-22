import { Text } from "react-native";
import { useSettings } from "../../../services/appSettings/components/settingsProvider";
import Foreach from "../../../components/Foreach";

export default function SavedIndex() {

	const { settings } = useSettings()

	return (
		<>
			<Text>Saved Page</Text>
			<Text>Sike it's settings</Text>
			<Foreach
				list={Object.entries(settings)}
				each={([ k, v ], i) => {
					console.log(k, v)
					return <Text key={i}>{k}: {JSON.stringify(v)}</Text>
				}}
			/>
		</>
	)
}