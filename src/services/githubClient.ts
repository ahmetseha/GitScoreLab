import axios, { type AxiosInstance } from "axios"

const GITHUB_API_BASE_URL = "https://api.github.com"

export function createGithubClient(): AxiosInstance {
	const token = import.meta.env.VITE_GITHUB_TOKEN

	const client = axios.create({
		baseURL: GITHUB_API_BASE_URL,
		headers: {
			Accept: "application/vnd.github.v3+json",
			...(token && { Authorization: `Bearer ${token}` }),
		},
	})

	return client
}

export const githubClient = createGithubClient()

