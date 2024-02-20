import { ElementType, ReactElement, ReactNode } from "react"

export default function Foreach<T>(props: {
	list: T[]
	each: (item: T, index: number, list: T[]) => ReactElement
	separator?: (key: string) => ReactElement
}) {
	return (
		<>
			{props.list.reduce((prev, v, i, arr) => {
				prev.push(props.each(v, i, arr))
				if (i < arr.length - 1 && props.separator) {
					// const separatorElem = props.separator
					// separatorElem.key = i.toString() + "-separator"
					prev.push(props.separator(i.toString() + "-separator"))
				}
				return prev
			}, [] as ReactNode[])}
			{/* {list.map(each)} */}
		</>
	)
}
