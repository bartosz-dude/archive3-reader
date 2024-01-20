import { ReactNode } from "react";

export default function Loaded({ isLoading, loading, fallback, children }: { isLoading: boolean | ("loading" | "loaded" | "failed"), loading?: ReactNode, fallback?: ReactNode, children?: ReactNode }) {
	if ((typeof isLoading == "boolean" && isLoading) || (typeof isLoading == "string" && isLoading == "loading"))
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