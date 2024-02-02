import { useEffect } from "react";

export default function useCleanup(callback: () => void) {
	useEffect(() => callback, [])
}