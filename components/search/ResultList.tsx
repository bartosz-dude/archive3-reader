import {
	FlatList,
	FlatListProps,
	RefreshControl,
	SectionList,
} from "react-native"
import { AO3WorkResult } from "../../services/ao3/types/workSearchResults"
import { useCallback } from "react"
import ResultEntry from "./ResultEntry"
import LoadingIndicator from "../common/LoadingIndicator"
import CustomRefreshControl from "../common/CustomRefreshControl"
import { useAppTheme } from "../ThemeManager"

export default function ResultList(
	props: {
		refreshing: boolean
		refresh: () => void
	} & Omit<FlatListProps<AO3WorkResult>, "renderItem">
) {
	const theme = useAppTheme()

	const renderItem = useCallback(
		({ item, index }: { item: AO3WorkResult; index: number }) => (
			<ResultEntry item={item} />
		),
		[]
	)

	return (
		<>
			<FlatList
				renderItem={renderItem}
				refreshControl={
					<RefreshControl
						refreshing={props.refreshing}
						onRefresh={props.refresh}
						// size={"large"}
						tintColor={"white"}
						progressBackgroundColor={
							theme.loadingIndicator.background
						}
						colors={["white"]}
					/>
				}
				showsVerticalScrollIndicator={false}
				{...props}
				// refreshing={props.refreshing}
			/>
		</>
	)
}
