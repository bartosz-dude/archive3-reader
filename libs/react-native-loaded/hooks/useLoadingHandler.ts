import { useEffect, useState } from "react"
import { LoadingStatus, NormalizedLoadingStatus } from "../types/loadedTypes"

/**
 * combines multiple loading statuses into one for easier loading status handling
 */
export default function useLoadingHandler(status: LoadingStatus) {
	const [loadingStatus, setLoadingStatus] =
		useState<NormalizedLoadingStatus<typeof status>>("loading")

	useEffect(() => {
		if (Array.isArray(status)) {
			if (status.every((v) => typeof v == "boolean")) {
				if (status.find((v) => v == false)) setLoadingStatus(false)
				if (status.every((v) => v == true)) setLoadingStatus(true)
			}
			if (status.every((v) => typeof v == "string")) {
				if (status.find((v) => v == "failed"))
					setLoadingStatus("failed")
				if (status.find((v) => v == "loading"))
					setLoadingStatus("loading")
				if (status.every((v) => v == "success"))
					setLoadingStatus("success")
			}
		} else {
			setLoadingStatus(status)
		}
	}, [status])

	return loadingStatus
}
