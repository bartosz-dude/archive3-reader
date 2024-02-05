import useLoading from "../../../hooks/useLoading"
import getReadthrough from "../database/getReadthrough"
import getWork from "../database/getWork"

export default function useSaver(workId: number) {
	const workDb = useLoading(() => getWork(workId))
	const readDb = useLoading(() => getReadthrough(workId, 0))

}