import * as SQLite from "expo-sqlite"
export default function getDB() {
	return SQLite.openDatabase("archive3storage.db")
}