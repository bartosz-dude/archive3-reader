import { ScrollView, Text } from "react-native"
import { useWorkContext } from "./_layout"
import Foreach from "../../../components/common/Foreach"
import Loaded from "../../../components/common/Loaded"
import { Link } from "expo-router"
import useStyle from "../../../hooks/useStyle"
import Btn from "../../../components/common/Btn"

export default function ChapterSelect() {
	const work = useWorkContext()

	const style = useStyle({
		chapterEntry: {
			marginVertical: 10,
		},
	})

	return (
		<>
			<Text>Chapter select</Text>
			{/* <Loaded isLoading={work.work.status}> */}
			<ScrollView>
				<Foreach
					list={work.chapterList ?? []}
					each={(item, i) => (
						<Btn
							onPress={() => {
								work.setChapter(i)
							}}
							key={i}
						>
							{item.title}
						</Btn>
					)}
				/>
			</ScrollView>
			{/* </Loaded> */}
		</>
	)
}
