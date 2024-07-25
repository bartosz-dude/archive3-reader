export type CompletionStatusAO3 = "complete" | "workInProgress"

export type WarningAO3 =
	| "creatorChoseNotToUseArchiveWarnings"
	| "graphicDepictionsOfViolence"
	| "majorCharacterDeath"
	| "noArchiveWarningsApply"
	| "rapeNonCon"
	| "underage"

export type WarningAO3Raw =
	| "Creator Chose Not To Use Archive Warnings"
	| "Graphic Depictions Of Violence"
	| "Major Character Death"
	| "No Archive Warnings Apply"
	| "Rape/Non-Con"
	| "Underage"

export type RatingAO3 =
	| "notRated"
	| "generalAudiences"
	| "teenAndUpAudiences"
	| "mature"
	| "explicit"

export type RatingAO3Raw =
	| "Not Rated"
	| "General Audiences"
	| "Teen And Up Audiences"
	| "Mature"
	| "Explicit"

export type CategoryAO3 = "ff" | "fm" | "gen" | "mm" | "multi" | "other"

export type CategoryAO3Raw = "F/F" | "F/M" | "Gen" | "M/M" | "Multi" | "Other"

export type LanguagesAO3 = "en" | "es"

export type MonthAO3 =
	| "Jan"
	| "Feb"
	| "Mar"
	| "Apr"
	| "May"
	| "Jun"
	| "Jul"
	| "Aug"
	| "Sep"
	| "Oct"
	| "Nov"
	| "Dec"
