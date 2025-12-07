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
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
			<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
				Repolar ({repos.length})
			</h3>
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-gray-200 dark:border-gray-700">
							<th
								className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
								onClick={() => handleSort("name")}
							>
								Repo Adı {getSortIcon("name")}
							</th>
							<th
								className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
								onClick={() => handleSort("stars")}
							>
								Stars {getSortIcon("stars")}
							</th>
							<th
								className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
								onClick={() => handleSort("forks")}
							>
								Forks {getSortIcon("forks")}
							</th>
							<th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
								Language
							</th>
							<th
								className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
								onClick={() => handleSort("updated")}
							>
								Son Güncelleme {getSortIcon("updated")}
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedRepos.map((repo) => (
							<tr
								key={repo.id}
								className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
							>
								<td className="py-3 px-4">
									<a
										href={repo.html_url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
									>
										{repo.name}
									</a>
									{repo.description && (
										<div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
											{repo.description}
										</div>
									)}
								</td>
								<td className="py-3 px-4 text-gray-900 dark:text-white">
									{repo.stargazers_count}
								</td>
								<td className="py-3 px-4 text-gray-900 dark:text-white">
									{repo.forks_count}
								</td>
								<td className="py-3 px-4">
									{repo.language ? (
										<span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
											{repo.language}
										</span>
									) : (
										<span className="text-gray-400 dark:text-gray-500 text-sm">
											-
										</span>
									)}
								</td>
								<td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
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

