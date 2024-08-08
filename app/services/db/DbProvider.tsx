import { SQLiteProvider } from "expo-sqlite"
import dbMigrator from "./dbMigrator"
import type { ReactNode } from "react"

/**
 * Contains the `SQLiteProvider`, `useSuspense` is enabled
 */
export default function DbProvider({ children }: { children: ReactNode }) {
	return (
		<>
			<SQLiteProvider
				databaseName="archive3reader.db"
				onInit={dbMigrator}
				useSuspense
			>
				{children}
			</SQLiteProvider>
		</>
	)
}
