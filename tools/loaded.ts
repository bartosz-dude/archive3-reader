import { DataHandle, LoadingHandle } from "../types/common"

/**
 * Determines if the loading was a success and data is not null of a LoadingHandle
 */
export default function loaded<
	T extends LoadingHandle<unknown> | DataHandle<unknown>
>(handle: T, expectedValue?: T["data"]) {
	return (
		handle.status == "success" &&
		handle.data !== null &&
		(expectedValue ? handle.data === expectedValue : true)
	)
}
