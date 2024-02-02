import { PropsWithChildren, ReactNode, useEffect, useState } from "react"

type LoadingStatus = "loading" | "loaded" | "failed"

export default function Loaded({
	isLoading,
	loading,
	fallback,
	children,
	options = { loadingDelay: 0, immediatelyShowLoading: false },
}: {
	isLoading: boolean | LoadingStatus | LoadingStatus[]
	loading?: JSX.Element
	fallback?: JSX.Element
	options?: { loadingDelay?: number; immediatelyShowLoading?: boolean }
} & PropsWithChildren) {
	const [loadingDelayReached, setLoadingDelayReached] = useState(false)

	const loadingDelay = setTimeout(() => {
		setLoadingDelayReached(true)
	}, 4)

	const [loadingStatus, setLoadingStatus] = useState<LoadingStatus | boolean>(
		"loading"
	)

	useEffect(() => {
		if (Array.isArray(isLoading)) {
			if (isLoading.find((v) => v == "failed")) setLoadingStatus("failed")
			if (isLoading.find((v) => v == "loading"))
				setLoadingStatus("loading")
			if (isLoading.every((v) => v == "loaded"))
				setLoadingStatus("loaded")
		} else {
			setLoadingStatus(isLoading)
		}
	}, [isLoading])

	if (
		(typeof loadingStatus == "boolean" && loadingStatus) ||
		(typeof loadingStatus == "string" && loadingStatus == "loading")
	)
		return <>{loading && <>{loading}</>}</>

	if (typeof loadingStatus == "string" && loadingStatus == "failed")
		return <>{fallback && <>{fallback}</>}</>

	if (
		(typeof loadingStatus == "boolean" && !loadingStatus) ||
		(typeof loadingStatus == "string" && loadingStatus == "loaded")
	)
		return <>{children && <>{children}</>}</>
}
