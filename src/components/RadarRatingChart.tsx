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
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
			<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
				Rating Analizi
			</h3>
			<ResponsiveContainer width="100%" height={300}>
				<RadarChart data={data}>
					<PolarGrid />
					<PolarAngleAxis
						dataKey="category"
						tick={{ fill: "#6B7280", fontSize: 12 }}
					/>
					<PolarRadiusAxis
						angle={90}
						domain={[0, 100]}
						tick={{ fill: "#6B7280", fontSize: 10 }}
					/>
					<Radar
						name="Score"
						dataKey="score"
						stroke="#3B82F6"
						fill="#3B82F6"
						fillOpacity={0.6}
					/>
				</RadarChart>
			</ResponsiveContainer>
		</div>
	)
}

