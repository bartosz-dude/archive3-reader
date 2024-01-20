import { ReactNode } from "react";

export default function Foreach<T>({ list, each }: { list: T[], each: (item: T, index: number, list: T[]) => ReactNode }) {
	return (
		<>
			{list.map(each)}
		</>
	)
}