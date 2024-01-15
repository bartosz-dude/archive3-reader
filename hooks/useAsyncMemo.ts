import React from "react";
import { useMemo, useState } from "react";

export default function useAsyncMemo<T>(factory: () => Promise<T>, catchCallback: (reason: any) => void | PromiseLike<void>, deps: React.DependencyList): T | null {
	const [ awaited, setAwaited ] = useState<T | null>(null)
	const memo = useMemo(() => factory().then((v) => {
		// console.log("asyncMemo ", v)
		setAwaited(v)
	}, (r) => { throw new Error("Could not load work: " + r) }), deps)
	return awaited
}