import { useState, useMemo, useEffect } from "react"
import type { GithubRepo } from "@/types/github"
import { formatDate } from "@/utils/date"
import { useLocale } from "@/contexts/LocaleContext"

interface RepoListProps {
	repos: GithubRepo[]
}

const REPOS_PER_PAGE = 10

export function RepoList({ repos }: RepoListProps) {
	const { t, locale } = useLocale()
	const [searchQuery, setSearchQuery] = useState("")
	const [currentPage, setCurrentPage] = useState(1)

	const filteredAndSortedRepos = useMemo(() => {
		const sorted = [...repos].sort((a, b) => {
			return b.stargazers_count - a.stargazers_count
		})

		if (!searchQuery.trim()) {
			return sorted
		}

		const query = searchQuery.toLowerCase().trim()
		return sorted.filter(
			(repo) =>
				repo.name.toLowerCase().includes(query) ||
				(repo.description && repo.description.toLowerCase().includes(query)) ||
				(repo.language && repo.language.toLowerCase().includes(query))
		)
	}, [repos, searchQuery])

	const totalPages = Math.ceil(filteredAndSortedRepos.length / REPOS_PER_PAGE)
	const startIndex = (currentPage - 1) * REPOS_PER_PAGE
	const endIndex = startIndex + REPOS_PER_PAGE
	const paginatedRepos = filteredAndSortedRepos.slice(startIndex, endIndex)

	useEffect(() => {
		setCurrentPage(1)
	}, [searchQuery])

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const getPageNumbers = (isMobile: boolean = false) => {
		const pages: (number | string)[] = []

		if (isMobile) {
			pages.push(currentPage)
			return pages
		}

		const maxVisible = 5

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) {
					pages.push(i)
				}
				pages.push("...")
				pages.push(totalPages)
			} else if (currentPage >= totalPages - 2) {
				pages.push(1)
				pages.push("...")
				for (let i = totalPages - 3; i <= totalPages; i++) {
					pages.push(i)
				}
			} else {
				pages.push(1)
				pages.push("...")
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i)
				}
				pages.push("...")
				pages.push(totalPages)
			}
		}

		return pages
	}

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
					{t.repositories.title} ({repos.length})
				</h3>
				<div className="relative w-64">
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder={t.repositories.searchPlaceholder}
						className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 pl-9 text-xs text-gray-900 placeholder-gray-400 transition-colors focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-600 dark:focus:ring-gray-600"
					/>
					<svg
						className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
							<th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
								{t.repositories.name}
							</th>
							<th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
								{t.repositories.stars}
							</th>
							<th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
								{t.repositories.forks}
							</th>
							<th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
								{t.repositories.language}
							</th>
							<th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
								{t.repositories.updated}
							</th>
						</tr>
					</thead>
					<tbody>
						{paginatedRepos.map((repo) => (
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
								<td className="py-3 px-4 text-right text-sm text-gray-900 dark:text-white">
									{repo.stargazers_count}
								</td>
								<td className="py-3 px-4 text-right text-sm text-gray-900 dark:text-white">
									{repo.forks_count}
								</td>
								<td className="py-3 px-4 text-right">
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
								<td className="py-3 px-4 text-right text-xs text-gray-500 dark:text-gray-500">
									{formatDate(repo.pushed_at, locale)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{totalPages > 1 && (
				<div className="mt-6 border-t border-gray-200 pt-6">
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
						<div className="text-xs text-gray-600 sm:hidden">
							{t.repositories.showing} {startIndex + 1}-{Math.min(endIndex, filteredAndSortedRepos.length)} {t.repositories.of}{" "}
							{filteredAndSortedRepos.length}
						</div>
						<div className="hidden text-xs text-gray-600 sm:block">
							{t.repositories.showing} {startIndex + 1}-{Math.min(endIndex, filteredAndSortedRepos.length)} {t.repositories.of}{" "}
							{filteredAndSortedRepos.length}
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{t.repositories.previous}
							</button>
							<div className="hidden items-center gap-1 sm:flex">
								{getPageNumbers(false).map((page, index) => {
									if (page === "...") {
										return (
											<span
												key={`ellipsis-${index}`}
												className="px-2 text-xs text-gray-400"
											>
												...
											</span>
										)
									}
									return (
										<button
											key={page}
											onClick={() => handlePageChange(page as number)}
											className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
												currentPage === page
													? "bg-gray-900 text-white"
													: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
											}`}
										>
											{page}
										</button>
									)
								})}
							</div>
							<div className="flex items-center gap-1 sm:hidden">
								<span className="rounded-md border border-gray-200 bg-gray-900 px-3 py-1.5 text-xs font-medium text-white">
									{currentPage} / {totalPages}
								</span>
							</div>
							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
								className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{t.repositories.next}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

