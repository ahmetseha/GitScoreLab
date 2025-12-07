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
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
			<div className="text-center">
				<div className={`text-6xl font-bold ${colorClass} mb-2`}>
					{rating.finalRating.toFixed(1)}
				</div>
				<div className="text-2xl text-gray-600 dark:text-gray-400 mb-1">
					/ 100
				</div>
				<div className={`text-xl font-semibold ${colorClass} mt-4`}>
					{label}
				</div>
			</div>
			<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
				<div className="space-y-3">
					<div>
						<div className="flex justify-between text-sm mb-1">
							<span className="text-gray-600 dark:text-gray-400">
								Popularity
							</span>
							<span className="font-semibold text-gray-900 dark:text-white">
								{rating.popularityScore}
							</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
							<div
								className="bg-blue-600 h-2 rounded-full transition-all"
								style={{ width: `${rating.popularityScore}%` }}
							></div>
						</div>
					</div>
					<div>
						<div className="flex justify-between text-sm mb-1">
							<span className="text-gray-600 dark:text-gray-400">
								Activity
							</span>
							<span className="font-semibold text-gray-900 dark:text-white">
								{rating.activityScore}
							</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
							<div
								className="bg-green-600 h-2 rounded-full transition-all"
								style={{ width: `${rating.activityScore}%` }}
							></div>
						</div>
					</div>
					<div>
						<div className="flex justify-between text-sm mb-1">
							<span className="text-gray-600 dark:text-gray-400">
								Code Quality
							</span>
							<span className="font-semibold text-gray-900 dark:text-white">
								{rating.codeQualityScore}
							</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
							<div
								className="bg-purple-600 h-2 rounded-full transition-all"
								style={{ width: `${rating.codeQualityScore}%` }}
							></div>
						</div>
					</div>
					<div>
						<div className="flex justify-between text-sm mb-1">
							<span className="text-gray-600 dark:text-gray-400">
								Community
							</span>
							<span className="font-semibold text-gray-900 dark:text-white">
								{rating.communityScore}
							</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
							<div
								className="bg-orange-600 h-2 rounded-full transition-all"
								style={{ width: `${rating.communityScore}%` }}
							></div>
						</div>
					</div>
					<div>
						<div className="flex justify-between text-sm mb-1">
							<span className="text-gray-600 dark:text-gray-400">
								Diversity
							</span>
							<span className="font-semibold text-gray-900 dark:text-white">
								{rating.diversityScore}
							</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
							<div
								className="bg-pink-600 h-2 rounded-full transition-all"
								style={{ width: `${rating.diversityScore}%` }}
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

