import { useQuery } from "@tanstack/react-query"
import { fetchGithubUser } from "@/services/githubApi"
import type { GithubUser } from "@/types/github"

export function useGithubUser(username: string | null) {
	return useQuery<GithubUser, Error>({
		queryKey: ["githubUser", username],
		queryFn: () => fetchGithubUser(username!),
		enabled: !!username && username.trim() !== "",
		staleTime: 60 * 1000,
		retry: 1,
	})
}

