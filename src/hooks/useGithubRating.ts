import { useMemo } from "react"
import { calculateGithubRating } from "@/utils/calculateGithubRating"
import type { GithubUser, GithubRepo, GithubRatingResult } from "@/types/github"

export function useGithubRating(
	user: GithubUser | undefined,
	repos: GithubRepo[] | undefined
): GithubRatingResult | null {
	return useMemo(() => {
		if (!user || !repos) {
			return null
		}

		return calculateGithubRating(user, repos)
	}, [user, repos])
}

