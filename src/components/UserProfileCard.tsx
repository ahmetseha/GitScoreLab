import type { GithubUser, GithubRepo } from "@/types/github"
import { getLastActiveDate } from "@/utils/date"

interface UserProfileCardProps {
	user: GithubUser
	repos: GithubRepo[]
}

export function UserProfileCard({ user, repos }: UserProfileCardProps) {
	const lastActive = getLastActiveDate(repos)

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
			<div className="flex items-start gap-4">
				<img
					src={user.avatar_url}
					alt={user.login}
					className="w-20 h-20 rounded-full border-2 border-gray-200 dark:border-gray-700"
				/>
				<div className="flex-1">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
						{user.name || user.login}
					</h2>
					<a
						href={user.html_url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-600 dark:text-blue-400 hover:underline mb-2 block"
					>
						@{user.login}
					</a>
					{user.bio && (
						<p className="text-gray-600 dark:text-gray-400 mb-4">
							{user.bio}
						</p>
					)}
					<div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
						{user.location && (
							<div className="flex items-center gap-1">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								{user.location}
							</div>
						)}
						{user.company && (
							<div className="flex items-center gap-1">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
									/>
								</svg>
								{user.company}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
				<div>
					<div className="text-2xl font-bold text-gray-900 dark:text-white">
						{user.followers}
					</div>
					<div className="text-sm text-gray-600 dark:text-gray-400">
						Takipçi
					</div>
				</div>
				<div>
					<div className="text-2xl font-bold text-gray-900 dark:text-white">
						{user.following}
					</div>
					<div className="text-sm text-gray-600 dark:text-gray-400">
						Takip Edilen
					</div>
				</div>
				<div>
					<div className="text-2xl font-bold text-gray-900 dark:text-white">
						{user.public_repos}
					</div>
					<div className="text-sm text-gray-600 dark:text-gray-400">
						Public Repo
					</div>
				</div>
				<div>
					<div className="text-2xl font-bold text-gray-900 dark:text-white">
						{user.public_gists}
					</div>
					<div className="text-sm text-gray-600 dark:text-gray-400">
						Public Gist
					</div>
				</div>
			</div>
			<div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
				<span className="font-semibold">Son aktivite:</span> {lastActive}
			</div>
		</div>
	)
}

