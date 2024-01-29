import { AnyNode, Element } from "domhandler";
import { DomUtils } from "htmlparser2";

export default function findAllBy(attrib: string, value: string, elements: AnyNode[], customTest?: (elem: Element) => boolean) {
	return DomUtils.findAll((elem) => elem.attribs[ attrib ] == value && (customTest ? customTest(elem) : true), elements)
}