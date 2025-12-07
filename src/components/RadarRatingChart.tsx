import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
} from "recharts"
import type { GithubRatingResult } from "@/types/github"

interface RadarRatingChartProps {
	rating: GithubRatingResult
}

export function RadarRatingChart({ rating }: RadarRatingChartProps) {
	const data = [
		{
			category: "Popularity",
			score: rating.popularityScore,
			fullMark: 100,
		},
		{
			category: "Activity",
			score: rating.activityScore,
			fullMark: 100,
		},
		{
			category: "Code Quality",
			score: rating.codeQualityScore,
			fullMark: 100,
		},
		{
			category: "Community",
			score: rating.communityScore,
			fullMark: 100,
		},
		{
			category: "Diversity",
			score: rating.diversityScore,
			fullMark: 100,
		},
	]

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
			<h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
				Rating Breakdown
			</h3>
			<ResponsiveContainer width="100%" height={280}>
				<RadarChart data={data}>
					<PolarGrid stroke="#E5E7EB" />
					<PolarAngleAxis
						dataKey="category"
						tick={{ fill: "#6B7280", fontSize: 11, fontWeight: 500 }}
					/>
					<PolarRadiusAxis
						angle={90}
						domain={[0, 100]}
						tick={{ fill: "#9CA3AF", fontSize: 9 }}
					/>
					<Radar
						name="Score"
						dataKey="score"
						stroke="#111827"
						fill="#111827"
						fillOpacity={0.3}
						strokeWidth={1.5}
					/>
				</RadarChart>
			</ResponsiveContainer>
		</div>
	)
}

