import type { GithubUser, GithubRepo } from "@/types/github"
import { getLastActiveDate } from "@/utils/date"
import { useLocale } from "@/contexts/LocaleContext"

interface UserProfileCardProps {
	user: GithubUser
	repos: GithubRepo[]
}

export function UserProfileCard({ user, repos }: UserProfileCardProps) {
	const { t, locale } = useLocale()
	const lastActive = getLastActiveDate(repos, locale)

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
			<div className="mb-6 flex items-start gap-4">
				<img
					src={user.avatar_url}
					alt={user.login}
					className="h-16 w-16 rounded-full border border-gray-200 dark:border-gray-800"
				/>
				<div className="flex-1">
					<h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
						{user.name || user.login}
					</h2>
					<a
						href={user.html_url}
						target="_blank"
						rel="noopener noreferrer"
						className="mb-3 block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
					>
						@{user.login}
					</a>
					{user.bio && (
						<p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
							{user.bio}
						</p>
					)}
					<div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-500">
						{user.location && (
							<div className="flex items-center gap-1.5">
								<svg
									className="h-3.5 w-3.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								{user.location}
							</div>
						)}
						{user.company && (
							<div className="flex items-center gap-1.5">
								<svg
									className="h-3.5 w-3.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
									/>
								</svg>
								{user.company}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 dark:border-gray-800 md:grid-cols-4">
				<div>
					<div className="text-lg font-semibold text-gray-900 dark:text-white">
						{user.followers}
					</div>
					<div className="text-xs text-gray-500 dark:text-gray-500">
						{t.profile.followers}
					</div>
				</div>
				<div>
					<div className="text-lg font-semibold text-gray-900 dark:text-white">
						{user.following}
					</div>
					<div className="text-xs text-gray-500 dark:text-gray-500">
						{t.profile.following}
					</div>
				</div>
				<div>
					<div className="text-lg font-semibold text-gray-900 dark:text-white">
						{user.public_repos}
					</div>
					<div className="text-xs text-gray-500 dark:text-gray-500">
						{t.profile.repositories}
					</div>
				</div>
				<div>
					<div className="text-lg font-semibold text-gray-900 dark:text-white">
						{user.public_gists}
					</div>
					<div className="text-xs text-gray-500 dark:text-gray-500">
						{t.profile.gists}
					</div>
				</div>
			</div>
			<div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
				{t.common.lastActive}: {lastActive}
			</div>
		</div>
	)
}

