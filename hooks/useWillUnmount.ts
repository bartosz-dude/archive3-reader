import { useEffect, useRef } from "react"

export default function useWillUnmount() {
	const componentWillUnmount = useRef(false)

	useEffect(() => {
		return () => {
			componentWillUnmount.current = true
		}
	}, [])

	return componentWillUnmount
}
