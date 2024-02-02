import { Text } from "react-native"
import { useSettings } from "../../../services/appSettings/components/settingsProvider"
import Foreach from "../../../components/common/Foreach"
import useLoading from "../../../hooks/useLoading"
import getAllWorks from "../../../services/saver/database/getAllWorks"
import Loaded from "../../../components/common/Loaded"
import { useEffect } from "react"
import useCleanup from "../../../hooks/useCleanup"

export default function SavedPage() {
	// const { settings } = useSettings()
	const works = useLoading(() => getAllWorks())

	// useEffect(() => {
	// 	if (works.status == "loaded") console.log(works.data)
	// }, [works])

	return (
		<>
			<Text>Saved Page</Text>
			<Loaded isLoading={works.status}>
				<Foreach
					list={works.data ?? []}
					each={(item, i) => {
						return <Text key={item.workId}>Id: {item.workId}</Text>
					}}
				/>
			</Loaded>
		</>
	)
}
