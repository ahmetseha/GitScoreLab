import { useQuery } from "@tanstack/react-query"
import { fetchGithubRepos } from "@/services/githubApi"
import type { GithubRepo } from "@/types/github"

export function useGithubRepos(username: string | null) {
	return useQuery<GithubRepo[], Error>({
		queryKey: ["githubRepos", username],
		queryFn: () => fetchGithubRepos(username!),
		enabled: !!username && username.trim() !== "",
		staleTime: 60 * 1000,
		retry: 1,
	})
}

