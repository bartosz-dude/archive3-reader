import { useState } from "react"
import { LoadingStatusText } from "../types/common"

export default function useStatus(initialState: LoadingStatusText = "loading") {
	return useState<LoadingStatusText>(initialState)
}
