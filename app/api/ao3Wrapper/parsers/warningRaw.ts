import type { WarningAO3, WarningAO3Raw } from "../types/generic"

export default function warningRawParser(raw: WarningAO3Raw): WarningAO3 {
	switch (raw) {
		case "Creator Chose Not To Use Archive Warnings":
			return "creatorChoseNotToUseArchiveWarnings"
		case "Graphic Depictions Of Violence":
			return "graphicDepictionsOfViolence"
		case "Major Character Death":
			return "majorCharacterDeath"
		case "No Archive Warnings Apply":
			return "noArchiveWarningsApply"
		case "Rape/Non-Con":
			return "rapeNonCon"
		case "Underage":
			return "underage"
	}
}
