import { PropsWithChildren } from "react"
import { LoadingStatus } from "../types/loadedTypes"
import useLoadingHandler from "../hooks/useLoadingHandler"

// type LoadingStatus = "loading" | "loaded" | "failed"

/**
 * Based on isLoading status render different elements
 * @param loading renders when status is either false or "loading"
 * @param fallback renders when status is "failed"
 * @param children renders when status is either true or "loaded"
 */
export default function Loaded(
	props: {
		isLoading: LoadingStatus
		loading?: JSX.Element
		fallback?: JSX.Element
	} & PropsWithChildren
) {
	const loadingStatus = useLoadingHandler(props.isLoading)

	if (typeof loadingStatus == "boolean") {
		return <>{loadingStatus ? props.children : props.loading}</>
	}

	switch (loadingStatus) {
		case "loading":
			return <>{props.loading}</>
		case "failed":
			return <>{props.fallback}</>
		case "success":
			return <>{props.children}</>
	}
}
