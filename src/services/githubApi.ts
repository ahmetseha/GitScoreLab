import { githubClient } from "./githubClient"
import type { GithubUser, GithubRepo } from "@/types/github"

export async function fetchGithubUser(username: string): Promise<GithubUser> {
	const response = await githubClient.get<GithubUser>(`/users/${username}`)
	return response.data
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
	const repos: GithubRepo[] = []
	let page = 1
	const perPage = 100

	while (true) {
		const response = await githubClient.get<GithubRepo[]>(
			`/users/${username}/repos`,
			{
				params: {
					per_page: perPage,
					page,
					sort: "updated",
				},
			}
		)

		const pageRepos = response.data
		repos.push(...pageRepos)

		if (pageRepos.length < perPage) {
			break
		}

		page++
	}

	return repos
}

