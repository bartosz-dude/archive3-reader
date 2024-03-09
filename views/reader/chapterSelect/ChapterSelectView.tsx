import Loaded from "../../../libs/react-native-loaded/components/Loaded"
import StandardHeader from "../../../components/common/StandardHeader"
import { useReaderManager } from "../../../components/reader/ReaderManagerNew"
import ChaptersList from "./ChaptersList"

export default function ChapterSelectView() {
	const reader = useReaderManager()

	return (
		<>
			<StandardHeader title="Select chapter" />
			<Loaded isLoading={reader.metaStatus}>
				<ChaptersList />
			</Loaded>
		</>
	)
}
