import { useMemo } from "react"
import { ScrollView } from "react-native-gesture-handler"

export default function Packages() {
	const packages = useMemo(() => new Map<string, string>([["", ""]]), [])

	return <ScrollView></ScrollView>
}
