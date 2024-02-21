export default function workUrl(workId: number, chapterId: string) {
	const url = new URL(
		chapterId === "first"
			? `https://archiveofourown.org/works/${workId}?view_adult=true`
			: `https://archiveofourown.org/works/${workId}/chapters/${chapterId}?view_adult=true`
	)

	return url
}
