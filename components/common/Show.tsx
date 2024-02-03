import { PropsWithChildren, ReactElement } from "react"

export default function Show(
	props: { when: boolean; fallback?: ReactElement } & PropsWithChildren
) {
	return <>{props.when ? props.children : props.fallback}</>
}
