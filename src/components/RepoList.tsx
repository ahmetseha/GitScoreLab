import { useState } from "react"
import type { GithubRepo } from "@/types/github"
import { formatDate } from "@/utils/date"

interface RepoListProps {
	repos: GithubRepo[]
}

type SortField = "stars" | "forks" | "updated" | "name"
type SortOrder = "asc" | "desc"

export function RepoList({ repos }: RepoListProps) {
	const [sortField, setSortField] = useState<SortField>("stars")
	const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

	const sortedRepos = [...repos].sort((a, b) => {
		let comparison = 0

		switch (sortField) {
			case "stars":
				comparison = a.stargazers_count - b.stargazers_count
				break
			case "forks":
				comparison = a.forks_count - b.forks_count
				break
			case "updated":
				comparison =
					new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime()
				break
			case "name":
				comparison = a.name.localeCompare(b.name)
				break
		}

		return sortOrder === "asc" ? comparison : -comparison
	})

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc")
		} else {
			setSortField(field)
			setSortOrder("desc")
		}
	}

	const getSortIcon = (field: SortField) => {
		if (sortField !== field) return null
		return sortOrder === "asc" ? "↑" : "↓"
	}

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
			<h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
				Repositories ({repos.length})
			</h3>
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-gray-100 dark:border-gray-800">
							<th
								className="cursor-pointer py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
								onClick={() => handleSort("name")}
							>
								Name {getSortIcon("name")}
							</th>
							<th
								className="cursor-pointer py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
								onClick={() => handleSort("stars")}
							>
								Stars {getSortIcon("stars")}
							</th>
							<th
								className="cursor-pointer py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
								onClick={() => handleSort("forks")}
							>
								Forks {getSortIcon("forks")}
							</th>
							<th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
								Language
							</th>
							<th
								className="cursor-pointer py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
								onClick={() => handleSort("updated")}
							>
								Updated {getSortIcon("updated")}
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedRepos.map((repo) => (
							<tr
								key={repo.id}
								className="border-b border-gray-50 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
							>
								<td className="py-3 px-4">
									<a
										href={repo.html_url}
										target="_blank"
										rel="noopener noreferrer"
										className="font-medium text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
									>
										{repo.name}
									</a>
									{repo.description && (
										<div className="mt-1 text-xs text-gray-500 dark:text-gray-500">
											{repo.description}
										</div>
									)}
								</td>
								<td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
									{repo.stargazers_count}
								</td>
								<td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
									{repo.forks_count}
								</td>
								<td className="py-3 px-4">
									{repo.language ? (
										<span className="rounded border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
											{repo.language}
										</span>
									) : (
										<span className="text-xs text-gray-400 dark:text-gray-600">
											-
										</span>
									)}
								</td>
								<td className="py-3 px-4 text-xs text-gray-500 dark:text-gray-500">
									{formatDate(repo.pushed_at)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

