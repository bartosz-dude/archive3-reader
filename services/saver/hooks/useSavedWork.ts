import { useEffect } from "react"
import useLoading from "../../../libs/react-native-loaded/hooks/useLoading"
import {
	DataHandle,
	LoadingHandle,
} from "../../../libs/react-native-loaded/types/loadedTypes"
import { DBSavedWork, DBWork } from "../../../types/database"
import { AO3Work } from "../../ao3/types/work"
import getSavedWork from "../database/getSavedWork"
import updateSavedWork from "../database/updateSavedWork"
import useWork from "./useWork"

export default function useSavedWork(workId: number, localWork: DBWork) {
	const savedWork = useLoading(async () => getSavedWork(workId), [])

	return {
		dataHandle: {
			data: savedWork.data,
			error: savedWork.error,
			status: savedWork.status,
		} as DataHandle<DBSavedWork>,
	}
}
