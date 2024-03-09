import { LoadingHandle, DataHandle } from "../types/loadedTypes"

/**
 * Determines if the loading was a success and data is null of a LoadingHandle
 */
export default function noData(
	handle: LoadingHandle<unknown> | DataHandle<unknown>
) {
	return handle.status == "success" && handle.data === null
}
