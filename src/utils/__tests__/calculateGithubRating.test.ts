import { describe, it, expect } from "vitest"
import { calculateGithubRating } from "../calculateGithubRating"
import type { GithubUser, GithubRepo } from "@/types/github"

describe("calculateGithubRating", () => {
	const createMockUser = (overrides?: Partial<GithubUser>): GithubUser => ({
		login: "testuser",
		id: 1,
		node_id: "test",
		avatar_url: "https://example.com/avatar.jpg",
		gravatar_id: null,
		url: "https://api.github.com/users/testuser",
		html_url: "https://github.com/testuser",
		followers_url: "https://api.github.com/users/testuser/followers",
		following_url: "https://api.github.com/users/testuser/following{/other_user}",
		gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
		starred_url: "https://api.github.com/users/testuser/starred{/owner}{/repo}",
		subscriptions_url: "https://api.github.com/users/testuser/subscriptions",
		organizations_url: "https://api.github.com/users/testuser/orgs",
		repos_url: "https://api.github.com/users/testuser/repos",
		events_url: "https://api.github.com/users/testuser/events{/privacy}",
		received_events_url: "https://api.github.com/users/testuser/received_events",
		type: "User",
		site_admin: false,
		name: "Test User",
		company: null,
		blog: "",
		location: null,
		email: null,
		hireable: null,
		bio: null,
		twitter_username: null,
		public_repos: 10,
		public_gists: 0,
		followers: 0,
		following: 0,
		created_at: "2020-01-01T00:00:00Z",
		updated_at: "2024-01-01T00:00:00Z",
		...overrides,
	})

	const createMockRepo = (overrides?: Partial<GithubRepo>): GithubRepo => {
		const now = new Date()
		const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

		return {
			id: 1,
			node_id: "test",
			name: "test-repo",
			full_name: "testuser/test-repo",
			private: false,
			owner: {
				login: "testuser",
				id: 1,
				node_id: "test",
				avatar_url: "https://example.com/avatar.jpg",
				gravatar_id: null,
				url: "https://api.github.com/users/testuser",
				html_url: "https://github.com/testuser",
				followers_url: "https://api.github.com/users/testuser/followers",
				following_url: "https://api.github.com/users/testuser/following{/other_user}",
				gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
				starred_url: "https://api.github.com/users/testuser/starred{/owner}{/repo}",
				subscriptions_url: "https://api.github.com/users/testuser/subscriptions",
				organizations_url: "https://api.github.com/users/testuser/orgs",
				repos_url: "https://api.github.com/users/testuser/repos",
				events_url: "https://api.github.com/users/testuser/events{/privacy}",
				received_events_url: "https://api.github.com/users/testuser/received_events",
				type: "User",
				site_admin: false,
			},
			html_url: "https://github.com/testuser/test-repo",
			description: "Test repo",
			fork: false,
			url: "https://api.github.com/repos/testuser/test-repo",
			forks_url: "https://api.github.com/repos/testuser/test-repo/forks",
			keys_url: "https://api.github.com/repos/testuser/test-repo/keys{/key_id}",
			collaborators_url: "https://api.github.com/repos/testuser/test-repo/collaborators{/collaborator}",
			teams_url: "https://api.github.com/repos/testuser/test-repo/teams",
			hooks_url: "https://api.github.com/repos/testuser/test-repo/hooks",
			issue_events_url: "https://api.github.com/repos/testuser/test-repo/issues/events{/number}",
			events_url: "https://api.github.com/repos/testuser/test-repo/events",
			assignees_url: "https://api.github.com/repos/testuser/test-repo/assignees{/user}",
			branches_url: "https://api.github.com/repos/testuser/test-repo/branches{/branch}",
			tags_url: "https://api.github.com/repos/testuser/test-repo/tags",
			blobs_url: "https://api.github.com/repos/testuser/test-repo/git/blobs{/sha}",
			git_tags_url: "https://api.github.com/repos/testuser/test-repo/git/tags{/sha}",
			git_refs_url: "https://api.github.com/repos/testuser/test-repo/git/refs{/sha}",
			trees_url: "https://api.github.com/repos/testuser/test-repo/git/trees{/sha}",
			statuses_url: "https://api.github.com/repos/testuser/test-repo/statuses/{sha}",
			languages_url: "https://api.github.com/repos/testuser/test-repo/languages",
			stargazers_url: "https://api.github.com/repos/testuser/test-repo/stargazers",
			contributors_url: "https://api.github.com/repos/testuser/test-repo/contributors",
			subscribers_url: "https://api.github.com/repos/testuser/test-repo/subscribers",
			subscription_url: "https://api.github.com/repos/testuser/test-repo/subscription",
			commits_url: "https://api.github.com/repos/testuser/test-repo/commits{/sha}",
			git_commits_url: "https://api.github.com/repos/testuser/test-repo/git/commits{/sha}",
			comments_url: "https://api.github.com/repos/testuser/test-repo/comments{/number}",
			issue_comment_url: "https://api.github.com/repos/testuser/test-repo/issues/comments{/number}",
			contents_url: "https://api.github.com/repos/testuser/test-repo/contents/{+path}",
			compare_url: "https://api.github.com/repos/testuser/test-repo/compare/{base}...{head}",
			merges_url: "https://api.github.com/repos/testuser/test-repo/merges",
			archive_url: "https://api.github.com/repos/testuser/test-repo/{archive_format}{/ref}",
			downloads_url: "https://api.github.com/repos/testuser/test-repo/downloads",
			questions_url: "https://api.github.com/repos/testuser/test-repo/questions",
			notifications_url: "https://api.github.com/repos/testuser/test-repo/notifications{?since,all,participating}",
			labels_url: "https://api.github.com/repos/testuser/test-repo/labels{/name}",
			releases_url: "https://api.github.com/repos/testuser/test-repo/releases{/id}",
			deployments_url: "https://api.github.com/repos/testuser/test-repo/deployments",
			created_at: "2020-01-01T00:00:00Z",
			updated_at: "2024-01-01T00:00:00Z",
			pushed_at: thirtyDaysAgo.toISOString(),
			git_url: "git://github.com/testuser/test-repo.git",
			ssh_url: "git@github.com:testuser/test-repo.git",
			clone_url: "https://github.com/testuser/test-repo.git",
			svn_url: "https://github.com/testuser/test-repo",
			homepage: null,
			size: 100,
			stargazers_count: 0,
			watchers_count: 0,
			language: "TypeScript",
			has_issues: true,
			has_projects: true,
			has_downloads: true,
			has_wiki: true,
			has_pages: false,
			has_discussions: false,
			forks_count: 0,
			mirror_url: null,
			archived: false,
			disabled: false,
			open_issues_count: 0,
			license: null,
			allow_forking: true,
			is_template: false,
			web_commit_signoff_required: false,
			topics: [],
			visibility: "public",
			forks: 0,
			open_issues: 0,
			watchers: 0,
			default_branch: "main",
			...overrides,
		}
	}

	it("should calculate rating for a user with high followers and stars", () => {
		const user = createMockUser({
			followers: 500,
			following: 100,
		})

		const repos = Array.from({ length: 20 }, (_, i) =>
			createMockRepo({
				id: i,
				name: `repo-${i}`,
				stargazers_count: 50,
				forks_count: 10,
				description: `Description ${i}`,
			})
		)

		const result = calculateGithubRating(user, repos)

		expect(result.finalRating).toBeGreaterThan(0)
		expect(result.finalRating).toBeLessThanOrEqual(100)
		expect(result.popularityScore).toBeGreaterThan(0)
		expect(result.activityScore).toBeGreaterThanOrEqual(0)
		expect(result.codeQualityScore).toBeGreaterThanOrEqual(0)
		expect(result.communityScore).toBeGreaterThan(0)
		expect(result.diversityScore).toBeGreaterThanOrEqual(0)
	})

	it("should calculate rating for a user with no repos", () => {
		const user = createMockUser({
			followers: 10,
			following: 5,
		})

		const repos: GithubRepo[] = []

		const result = calculateGithubRating(user, repos)

		expect(result.finalRating).toBeGreaterThanOrEqual(0)
		expect(result.finalRating).toBeLessThanOrEqual(100)
		expect(result.diversityScore).toBe(0)
	})

	it("should calculate diversity score based on unique languages", () => {
		const user = createMockUser()
		const languages = ["TypeScript", "JavaScript", "Python", "Rust", "Go", "Java", "C++"]

		const repos = languages.map((lang, i) =>
			createMockRepo({
				id: i,
				name: `repo-${i}`,
				language: lang,
			})
		)

		const result = calculateGithubRating(user, repos)

		expect(result.diversityScore).toBeGreaterThan(0)
		expect(result.diversityScore).toBeLessThanOrEqual(100)
	})

	it("should handle repos with null descriptions", () => {
		const user = createMockUser()
		const repos = Array.from({ length: 10 }, (_, i) =>
			createMockRepo({
				id: i,
				name: `repo-${i}`,
				description: i % 2 === 0 ? `Description ${i}` : null,
			})
		)

		const result = calculateGithubRating(user, repos)

		expect(result.codeQualityScore).toBeGreaterThanOrEqual(0)
		expect(result.codeQualityScore).toBeLessThanOrEqual(100)
	})

	it("should clamp all scores to 0-100 range", () => {
		const user = createMockUser({
			followers: 10000,
			following: 5000,
		})

		const repos = Array.from({ length: 100 }, (_, i) =>
			createMockRepo({
				id: i,
				name: `repo-${i}`,
				stargazers_count: 1000,
				forks_count: 500,
				description: `Description ${i}`,
			})
		)

		const result = calculateGithubRating(user, repos)

		expect(result.finalRating).toBeGreaterThanOrEqual(0)
		expect(result.finalRating).toBeLessThanOrEqual(100)
		expect(result.popularityScore).toBeLessThanOrEqual(100)
		expect(result.activityScore).toBeLessThanOrEqual(100)
		expect(result.codeQualityScore).toBeLessThanOrEqual(100)
		expect(result.communityScore).toBeLessThanOrEqual(100)
		expect(result.diversityScore).toBeLessThanOrEqual(100)
	})
})

