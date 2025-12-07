export function formatDate(dateString: string): string {
	const date = new Date(dateString)
	const now = new Date()
	const diffInMs = now.getTime() - date.getTime()
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

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
}

export function getLastActiveDate(repos: Array<{ pushed_at: string }>): string {
	if (repos.length === 0) {
		return "Hiç aktivite yok"
	}

	const sortedRepos = [...repos].sort((a, b) => {
		return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
	})

	return formatDate(sortedRepos[0].pushed_at)
}

