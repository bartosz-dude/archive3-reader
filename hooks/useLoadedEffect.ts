import { useEffect } from "react"
import { LoadingStatus } from "../types/common"
import useLoadingHandler from "./useLoadingHandler"

/**
 * React useEffect hook that is run when every status is "loaded" or true
 */
function useLoadedEffect(
	status: LoadingStatus,
	effect: () => void,
	deps?: React.DependencyList | undefined
) {
	const loadingStatus = useLoadingHandler(status)

	useEffect(() => {
		if (loadingStatus === "loaded" || loadingStatus === true) {
			effect()
		}
	}, deps)
}
