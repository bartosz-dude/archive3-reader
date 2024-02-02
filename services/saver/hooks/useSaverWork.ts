import { useState } from "react";
import useLoading from "../../../hooks/useLoading";
import getReadthrough from "../database/getReadthrough";

export default function useSaverWork(workId: number) {
	// const [read, setRead] = useState(0)
	const savedRead = useLoading(() => getReadthrough(workId, 0), [])

	return {
		readthrough: {
			get: (readthrough: number) => {

			},
			update: () => {}
		}
	}
}