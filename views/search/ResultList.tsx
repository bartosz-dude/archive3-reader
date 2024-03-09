import { useCallback } from "react"
import { FlatList, FlatListProps, RefreshControl } from "react-native"
import { useAppTheme } from "../../components/ThemeManager"
import { AO3WorkResult } from "../../services/ao3/types/workSearchResults"
import ResultEntry from "./ResultEntry"

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
