type Locale = "tr" | "en"

export function formatDate(dateString: string, locale: Locale = "en"): string {
	const date = new Date(dateString)
	const now = new Date()
	const diffInMs = now.getTime() - date.getTime()
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

	if (locale === "tr") {
		if (diffInDays === 0) {
			return "Bugün"
		} else if (diffInDays === 1) {
			return "Dün"
		} else if (diffInDays < 7) {
			return `${diffInDays} gün önce`
		} else if (diffInDays < 30) {
			const weeks = Math.floor(diffInDays / 7)
			return `${weeks} hafta önce`
		} else if (diffInDays < 365) {
			const months = Math.floor(diffInDays / 30)
			return `${months} ay önce`
		} else {
			const years = Math.floor(diffInDays / 365)
			return `${years} yıl önce`
		}
	} else {
		if (diffInDays === 0) {
			return "Today"
		} else if (diffInDays === 1) {
			return "Yesterday"
		} else if (diffInDays < 7) {
			return `${diffInDays} days ago`
		} else if (diffInDays < 30) {
			const weeks = Math.floor(diffInDays / 7)
			return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
		} else if (diffInDays < 365) {
			const months = Math.floor(diffInDays / 30)
			return `${months} ${months === 1 ? "month" : "months"} ago`
		} else {
			const years = Math.floor(diffInDays / 365)
			return `${years} ${years === 1 ? "year" : "years"} ago`
		}
	}
}

export function getLastActiveDate(
	repos: Array<{ pushed_at: string }>,
	locale: Locale = "en"
): string {
	if (repos.length === 0) {
		return locale === "tr" ? "Hiç aktivite yok" : "No activity"
	}

	const sortedRepos = [...repos].sort((a, b) => {
		return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
	})

	return formatDate(sortedRepos[0].pushed_at, locale)
}

