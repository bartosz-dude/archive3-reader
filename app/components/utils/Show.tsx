import type { ReactNode } from "react"
import type React from "react"

export default function Show({
	when,
	children,
	fallback,
}: {
	when: boolean
	children: ReactNode
	fallback?: ReactNode
}) {
	return <>{when ? children : fallback}</>
}
