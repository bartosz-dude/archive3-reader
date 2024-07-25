import type { CategoryAO3, CategoryAO3Raw } from "../types/generic"

export default function categoryRawParser(raw: CategoryAO3Raw): CategoryAO3 {
	switch (raw) {
		case "F/F":
			return "ff"
		case "F/M":
			return "fm"
		case "Gen":
			return "gen"
		case "M/M":
			return "mm"
		case "Multi":
			return "multi"
		case "Other":
			return "other"
	}
}
