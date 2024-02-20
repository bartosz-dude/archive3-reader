export default function htmlPruner(htmlStr: string): string {
	const a = htmlStr.split("</head>")[1]
	const b = a.split("<script")[0]
	return b
}
