import { ExpoConfig, ConfigContext } from "@expo/config"
import "dotenv/config"

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: "Archive3 Reader",
	slug: "archive3-reader",
	extra: {
		eas: {
			projectId: process.env.EAS_PROJECT_ID,
		},
	},
})
