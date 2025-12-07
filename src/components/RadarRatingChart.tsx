import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
} from "recharts"
import type { GithubRatingResult } from "@/types/github"
import { useLocale } from "@/contexts/LocaleContext"

interface RadarRatingChartProps {
	rating: GithubRatingResult
}

export function RadarRatingChart({ rating }: RadarRatingChartProps) {
	const { t } = useLocale()

	const data = [
		{
			category: t.rating.categories.popularity,
			score: rating.popularityScore,
			fullMark: 100,
		},
		{
			category: t.rating.categories.activity,
			score: rating.activityScore,
			fullMark: 100,
		},
		{
			category: t.rating.categories.codeQuality,
			score: rating.codeQualityScore,
			fullMark: 100,
		},
		{
			category: t.rating.categories.community,
			score: rating.communityScore,
			fullMark: 100,
		},
		{
			category: t.rating.categories.diversity,
			score: rating.diversityScore,
			fullMark: 100,
		},
	]

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
			<h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
				{t.rating.breakdown}
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

