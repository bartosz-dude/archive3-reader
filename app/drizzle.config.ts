import { defineConfig } from "drizzle-kit"

export default defineConfig({
	driver: "expo",
	schema: "./schema/*",
	out: "./drizzle",
	dialect: "sqlite",
})
