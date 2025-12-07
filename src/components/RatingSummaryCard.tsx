import type { GithubRatingResult } from "@/types/github"

interface RatingSummaryCardProps {
	rating: GithubRatingResult
}

function getRatingLabel(rating: number): string {
	if (rating >= 80) return "Elite"
	if (rating >= 60) return "Strong"
	if (rating >= 40) return "Growing"
	return "Beginner"
}

function getRatingColor(rating: number): string {
	if (rating >= 80) return "text-green-600 dark:text-green-400"
	if (rating >= 60) return "text-blue-600 dark:text-blue-400"
	if (rating >= 40) return "text-yellow-600 dark:text-yellow-400"
	return "text-gray-600 dark:text-gray-400"
}

export function RatingSummaryCard({ rating }: RatingSummaryCardProps) {
	const label = getRatingLabel(rating.finalRating)
	const colorClass = getRatingColor(rating.finalRating)

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
			<div className="text-center">
				<div className={`mb-1 text-5xl font-bold tracking-tight ${colorClass}`}>
					{rating.finalRating.toFixed(1)}
				</div>
				<div className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-500">
					/ 100
				</div>
				<div className={`text-sm font-semibold uppercase tracking-wide ${colorClass}`}>
					{label}
				</div>
			</div>
			<div className="mt-6 space-y-4 border-t border-gray-100 pt-6 dark:border-gray-800">
				<div>
					<div className="mb-1.5 flex justify-between text-xs">
						<span className="font-medium text-gray-600 dark:text-gray-400">
							Popularity
						</span>
						<span className="font-semibold text-gray-900 dark:text-white">
							{rating.popularityScore}
						</span>
					</div>
					<div className="h-1 w-full rounded-full bg-gray-100 dark:bg-gray-800">
						<div
							className="h-1 rounded-full bg-gray-900 transition-all dark:bg-white"
							style={{ width: `${rating.popularityScore}%` }}
						></div>
					</div>
				</div>
				<div>
					<div className="mb-1.5 flex justify-between text-xs">
						<span className="font-medium text-gray-600 dark:text-gray-400">
							Activity
						</span>
						<span className="font-semibold text-gray-900 dark:text-white">
							{rating.activityScore}
						</span>
					</div>
					<div className="h-1 w-full rounded-full bg-gray-100 dark:bg-gray-800">
						<div
							className="h-1 rounded-full bg-gray-900 transition-all dark:bg-white"
							style={{ width: `${rating.activityScore}%` }}
						></div>
					</div>
				</div>
				<div>
					<div className="mb-1.5 flex justify-between text-xs">
						<span className="font-medium text-gray-600 dark:text-gray-400">
							Code Quality
						</span>
						<span className="font-semibold text-gray-900 dark:text-white">
							{rating.codeQualityScore}
						</span>
					</div>
					<div className="h-1 w-full rounded-full bg-gray-100 dark:bg-gray-800">
						<div
							className="h-1 rounded-full bg-gray-900 transition-all dark:bg-white"
							style={{ width: `${rating.codeQualityScore}%` }}
						></div>
					</div>
				</div>
				<div>
					<div className="mb-1.5 flex justify-between text-xs">
						<span className="font-medium text-gray-600 dark:text-gray-400">
							Community
						</span>
						<span className="font-semibold text-gray-900 dark:text-white">
							{rating.communityScore}
						</span>
					</div>
					<div className="h-1 w-full rounded-full bg-gray-100 dark:bg-gray-800">
						<div
							className="h-1 rounded-full bg-gray-900 transition-all dark:bg-white"
							style={{ width: `${rating.communityScore}%` }}
						></div>
					</div>
				</div>
				<div>
					<div className="mb-1.5 flex justify-between text-xs">
						<span className="font-medium text-gray-600 dark:text-gray-400">
							Diversity
						</span>
						<span className="font-semibold text-gray-900 dark:text-white">
							{rating.diversityScore}
						</span>
					</div>
					<div className="h-1 w-full rounded-full bg-gray-100 dark:bg-gray-800">
						<div
							className="h-1 rounded-full bg-gray-900 transition-all dark:bg-white"
							style={{ width: `${rating.diversityScore}%` }}
						></div>
					</div>
				</div>
			</div>
		</div>
	)
}

