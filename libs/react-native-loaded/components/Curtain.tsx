import {
	PropsWithChildren,
	ReactChildren,
	ReactElement,
	useEffect,
	useState,
} from "react"
import { LoadingStatus } from "../types/loadedTypes"
import useLoadingHandler from "../hooks/useLoadingHandler"
import { View, ViewProps } from "react-native"
import Show from "../../../components/common/Show"
import Loaded from "./Loaded"

/**
 * Based on isLoading status render different elements, children are prerendered in the background
 * @param isLoading when children should be shown
 * @param loading renders when status is either false or "loading"
 * @param fallback renders when status is "failed"
 * @param children shows when status is either true or "loaded"
 */
export default function Curtain({
	isLoading,
	loading,
	fallback,
	children,
	...viewProps
}: {
	isLoading: LoadingStatus
	loading?: ReactElement
	fallback?: ReactElement
} & PropsWithChildren &
	ViewProps) {
	const loadingStatus = useLoadingHandler(isLoading)

	const [show, setShow] = useState(false)

	useEffect(() => {
		if (typeof loadingStatus == "boolean") {
			setShow(loadingStatus)
		}

		if (typeof loadingStatus == "string") {
			switch (loadingStatus) {
				case "loading": {
					setShow(false)
					return
				}
				case "failed": {
					setShow(false)
					return
				}
				case "success": {
					setShow(true)
					return
				}
			}
		}
	}, [loadingStatus])

	return (
		<>
			<Loaded
				isLoading={loadingStatus}
				loading={loading}
				fallback={fallback}
			/>
			<View
				style={{
					transform: show ? [{ scale: 1 }] : [{ scale: 0 }],
					flex: 1,
				}}
				{...viewProps}
			>
				{children}
			</View>
		</>
	)
}
