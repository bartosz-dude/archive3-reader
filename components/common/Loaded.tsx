import { ReactNode, useState } from "react";

export default function Loaded({ isLoading, loading, fallback, children, options = { loadingDelay: 0, immediatelyShowLoading: false } }:
	{
		isLoading: boolean | ("loading" | "loaded" | "failed"), loading?: JSX.Element, fallback?: JSX.Element, children?: JSX.Element,
		options?: { loadingDelay?: number, immediatelyShowLoading?: boolean }
	}) {

	const [ loadingDelayReached, setLoadingDelayReached ] = useState(false)

	const loadingDelay = setTimeout(() => {
		setLoadingDelayReached(true)
	}, 4)

	if (((typeof isLoading == "boolean" && isLoading) || (typeof isLoading == "string" && isLoading == "loading")))
		return (
			<>
				{loading &&
					<>
						{loading}
					</>
				}
			</>
		)

	if ((typeof isLoading == "string" && isLoading == "failed"))
		return (
			<>
				{fallback &&
					<>
						{fallback}
					</>
				}
			</>
		)

	if ((typeof isLoading == "boolean" && !isLoading) || (typeof isLoading == "string" && isLoading == "loaded"))
		return (
			<>
				{children &&
					<>
						{children}
					</>
				}
			</>
		)
}