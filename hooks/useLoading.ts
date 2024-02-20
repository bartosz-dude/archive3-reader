import { useEffect, useMemo, useReducer, useState } from "react"
import { LoadingHandle, DataHandle, LoadingStatusText } from "../types/common"

function loadingReducer<T extends unknown>(
	state: DataHandle<T>,
	action: DataHandle<T>
) {}

type LoadingReducerState<T extends unknown, E extends any> =
	| {
			data: null
			error: null
			status: "loading"
	  }
	| {
			data: T
			error: null
			status: "success"
	  }
	| {
			data: null
			error: E
			status: "failed"
	  }

type LoadingReducerAction<T extends unknown, E extends any> =
	| {
			type: "loading"
	  }
	| {
			type: "success"
			payload: {
				data: T
			}
	  }
	| {
			type: "failed"
			payload: {
				error: E
			}
	  }

function reducer<T extends unknown, E extends any>(
	state: LoadingReducerState<T, E>,
	action: LoadingReducerAction<T, E>
): LoadingReducerState<T, E> {
	switch (action.type) {
		case "loading": {
			return {
				data: null,
				error: null,
				status: "loading",
			}
		}
		case "success": {
			return {
				data: action.payload.data,
				error: null,
				status: "success",
			}
		}
		case "failed": {
			return {
				data: null,
				error: action.payload.error,
				status: "failed",
			}
		}
		default: {
			return state
		}
	}
}

/**
 * React hook for managing async data fetching
 */
export default function useLoading<T extends unknown, E extends any>(
	loader: () => Promise<T>,
	deps?: React.DependencyList
): LoadingHandle<T> {
	const [state, dispatch] = useReducer(reducer<T, E>, {
		data: null,
		error: null,
		status: "loading",
	})
	const [updater, setUpdater] = useState(false)

	useMemo(() => {
		dispatch({ type: "loading" })

		loader()
			.then((v) => {
				dispatch({
					type: "success",
					payload: {
						data: v,
					},
				})
			})
			.catch((v) => {
				dispatch({
					type: "failed",
					payload: {
						error: v,
					},
				})
			})
	}, [...(deps ?? []), updater])

	function reload() {
		dispatch({
			type: "loading",
		})
		setUpdater((prev) => !prev)
	}

	return { ...state, reload }
}
