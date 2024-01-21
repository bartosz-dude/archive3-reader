import { useEffect, useMemo, useState } from "react"

export default function useLoading<T extends any>(loader: () => Promise<T>, deps: React.DependencyList) {

	const [ data, setData ] = useState<T | null>(null)
	const [ status, setStatus ] = useState<"loading" | "loaded" | "failed">("loading")
	const [ error, setError ] = useState<any | null>(null)

	useMemo(() => {
		setStatus("loading")
		setData(null)
		setError(null)

		loader()
			.then((v) => {
				setData(v)
				setStatus("loaded")
			})
			.catch((v) => {
				setError(v)
				setStatus("failed")
			})
	}, deps)

	return { data: data, error: error, status: status } as { data: typeof data, error: typeof error, status: typeof status }
}