export default function htmlPruner(htmlStr: string): string {
	return htmlStr.split("</head>")[ 1 ].split("<script")[ 0 ]
}