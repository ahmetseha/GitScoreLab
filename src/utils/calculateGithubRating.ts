import type { GithubUser, GithubRepo, GithubRatingResult } from "@/types/github"

export function calculateGithubRating(
	user: GithubUser,
	repos: GithubRepo[],
): GithubRatingResult {
	const followers = user.followers
	const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

	const followersScore = Math.min(Math.max((followers / 100) * 100, 0), 100)
	const starsScore = Math.min(Math.max((totalStars / 500) * 100, 0), 100)
	const popularityScore = Math.round(followersScore * 0.6 + starsScore * 0.4)

	const now = new Date()
	const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
	const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)

	const recentlyActiveRepos = repos.filter((repo) => {
		const pushedAt = new Date(repo.pushed_at)
		return pushedAt >= thirtyDaysAgo
	}).length

	const activeLast90Days = repos.filter((repo) => {
		const pushedAt = new Date(repo.pushed_at)
		return pushedAt >= ninetyDaysAgo
	}).length

	const recentFactor = Math.min(recentlyActiveRepos / 10, 1) * 70
	const midTermFactor = Math.min(activeLast90Days / 20, 1) * 30
	const activityScore = Math.round(Math.min(Math.max(recentFactor + midTermFactor, 0), 100))

	const totalRepos = repos.length
	const describedRepos = repos.filter((repo) => repo.description && repo.description.trim() !== "").length
	const docRatio = totalRepos > 0 ? describedRepos / totalRepos : 0
	const docScore = docRatio * 60

	const topStarCount = repos.length > 0
		? Math.max(...repos.map((repo) => repo.stargazers_count))
		: 0
	const topRepoScore = Math.min(topStarCount / 100, 1) * 40
	const codeQualityScore = Math.round(Math.min(Math.max(docScore + topRepoScore, 0), 100))

	const following = user.following
	const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)

	const socialWeight = Math.min((followers + following) / 200, 1) * 60
	const forkWeight = Math.min(totalForks / 100, 1) * 40
	const communityScore = Math.round(Math.min(Math.max(socialWeight + forkWeight, 0), 100))

	const languages = new Set<string>()
	repos.forEach((repo) => {
		if (repo.language) {
			languages.add(repo.language)
		}
	})
	const languagesCount = languages.size

	const diversityScore = languagesCount === 0
		? 0
		: Math.round(Math.min(languagesCount / 6, 1) * 100)

	const finalRating = Math.round(
		(popularityScore * 0.3 +
			activityScore * 0.25 +
			codeQualityScore * 0.2 +
			communityScore * 0.15 +
			diversityScore * 0.1) * 10
	) / 10

	return {
		finalRating: Math.min(Math.max(finalRating, 0), 100),
		popularityScore,
		activityScore,
		codeQualityScore,
		communityScore,
		diversityScore,
	}
}

