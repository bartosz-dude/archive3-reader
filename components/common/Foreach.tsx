import { ElementType, ReactElement, ReactNode } from "react"

export default function Foreach<T>({
	list,
	each,
	separator: Separator,
}: {
	list: T[]
	each: (item: T, index: number, list: T[]) => ReactElement
	separator?: ReactElement
}) {
	return (
		<>
			{list.reduce((prev, v, i, arr) => {
				prev.push(each(v, i, arr))
				if (i < arr.length - 1 && Separator) {
					const separatorElem = Separator
					separatorElem.key = i.toString() + "-separator"
					prev.push(separatorElem)
				}
				return prev
			}, [] as ReactNode[])}
			{/* {list.map(each)} */}
		</>
	)
}
