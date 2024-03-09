import { useState } from "react"
import { LoadingStatusText } from "../types/loadedTypes"

export default function useStatus(initialState: LoadingStatusText = "loading") {
	return useState<LoadingStatusText>(initialState)
}
