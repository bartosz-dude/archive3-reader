import { useEffect, useRef } from "react"
import { DataHandle, LoadingHandle } from "../types/common"

export default function useLoadedRef<T extends unknown>(
	handle: LoadingHandle<T> | DataHandle<T>
) {
	const ref = useRef<T | null>(null)

	useEffect(() => {
		if (handle.status == "success") ref.current = handle.data
	}, [handle.status])

	return ref
}
