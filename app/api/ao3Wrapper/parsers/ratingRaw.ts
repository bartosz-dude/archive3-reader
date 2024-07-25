import type { RatingAO3, RatingAO3Raw } from "../types/generic"

export default function ratingRawParser(raw: RatingAO3Raw): RatingAO3 {
	switch (raw) {
		case "Not Rated":
			return "notRated"
		case "General Audiences":
			return "generalAudiences"
		case "Teen And Up Audiences":
			return "teenAndUpAudiences"
		case "Mature":
			return "mature"
		case "Explicit":
			return "explicit"
	}
}
