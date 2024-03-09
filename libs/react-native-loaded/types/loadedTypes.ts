export type LoadingStatusText = "loading" | "failed" | "success"

export type LoadingStatus =
	| boolean
	| LoadingStatusText
	| boolean[]
	| LoadingStatusText[]

export type NormalizedLoadingStatus<T extends LoadingStatus> = T extends boolean
	? boolean
	: T extends boolean[]
	? boolean
	: LoadingStatusText

export type DataHandle<T> =
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
			error: any
			status: "failed"
	  }

export type LoadingHandle<T> = DataHandle<T> & {
	reload: () => void
}

export type Handle<T> = LoadingHandle<T> | DataHandle<T>

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>
	  }
	: T
