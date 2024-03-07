import { LoadingStatus, LoadingStatusText } from "../types/common"

export default function parseStatus(status: boolean): LoadingStatusText
export default function parseStatus(status: LoadingStatusText): boolean
export default function parseStatus(
	status: LoadingStatusText | boolean
): LoadingStatusText | boolean {
	if (typeof status == "boolean") {
		if (status) return "success"
		return "loading"
	}

	switch (status) {
		case "loading":
		case "failed":
			return false
		case "success":
			return true
	}
}
