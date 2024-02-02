import { useEffect, useState } from "react";
import useLoading from "../../../hooks/useLoading";
import getReadthrough from "../database/getReadthrough";
import getWork from "../database/getWork";

export default function useReadthrough(workId: number, readthrough: number) {
	// const [read, setRead] = useState(0)
	const savedRead = useLoading(() => getReadthrough(workId, readthrough), [])
	const savedWork = useLoading(() => getWork(workId), [])

	useEffect(() => {
		// if (savedWork.)
	}, [ savedRead, savedWork ])

	return []
}