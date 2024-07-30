import { SQLiteProvider } from "expo-sqlite"
import dbMigrator from "./dbMigrator"

/**
 * Contains the `SQLiteProvider`, `useSuspense` is enabled
 */
export default function DbProvider({ children }: { children: JSX.Element }) {
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
