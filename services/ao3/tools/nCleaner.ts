import { ChildNode } from "domhandler"

export default function nCleaner(elems: ChildNode[]) {
	return elems.filter((c) => !(c.type == "text"))
}