import { DataHandle, LoadingHandle } from "../types/common"

export default function parseDataHandle<T extends unknown>(
	handle: LoadingHandle<T>
): DataHandle<T> {
	return {
		data: handle.data,
		error: handle.error,
		status: handle.status,
	} as DataHandle<T>
}
