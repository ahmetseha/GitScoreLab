import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts"
import type { GithubRepo } from "@/types/github"
import { useLocale } from "@/contexts/LocaleContext"

interface RepoStarsChartProps {
	repos: GithubRepo[]
}

export function RepoStarsChart({ repos }: RepoStarsChartProps) {
	const { t } = useLocale()

	const topRepos = [...repos]
		.sort((a, b) => b.stargazers_count - a.stargazers_count)
		.slice(0, 10)
		.map((repo) => ({
			name: repo.name.length > 15 ? `${repo.name.substring(0, 15)}...` : repo.name,
			stars: repo.stargazers_count,
			fullName: repo.name,
		}))

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
			<h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
				{t.charts.topRepositories}
			</h3>
			<ResponsiveContainer width="100%" height={280}>
				<BarChart data={topRepos}>
					<CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
					<XAxis
						dataKey="name"
						angle={-45}
						textAnchor="end"
						height={100}
						tick={{ fill: "#6B7280", fontSize: 11 }}
					/>
					<YAxis tick={{ fill: "#6B7280", fontSize: 11 }} />
					<Tooltip
						contentStyle={{
							backgroundColor: "#FFFFFF",
							border: "1px solid #E5E7EB",
							borderRadius: "6px",
							fontSize: "12px",
						}}
					/>
					<Bar dataKey="stars" fill="#111827" radius={[4, 4, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

