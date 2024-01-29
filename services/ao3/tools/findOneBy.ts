import { AnyNode, Element } from "domhandler";
import { DomUtils } from "htmlparser2";

export default function findOneBy(attrib: string, value: string, elements: AnyNode[], customTest?: (elem: Element) => boolean) {
	return DomUtils.findOne((elem) => elem.attribs[ attrib ] == value && (customTest ? customTest(elem) : true), elements)
}