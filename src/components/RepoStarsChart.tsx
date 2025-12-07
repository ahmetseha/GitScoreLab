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

interface RepoStarsChartProps {
	repos: GithubRepo[]
}

export function RepoStarsChart({ repos }: RepoStarsChartProps) {
	const topRepos = [...repos]
		.sort((a, b) => b.stargazers_count - a.stargazers_count)
		.slice(0, 10)
		.map((repo) => ({
			name: repo.name.length > 15 ? `${repo.name.substring(0, 15)}...` : repo.name,
			stars: repo.stargazers_count,
			fullName: repo.name,
		}))

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
			<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
				En Popüler Repolar (Top 10)
			</h3>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={topRepos}>
					<CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
					<XAxis
						dataKey="name"
						angle={-45}
						textAnchor="end"
						height={100}
						tick={{ fill: "#6B7280", fontSize: 12 }}
					/>
					<YAxis tick={{ fill: "#6B7280", fontSize: 12 }} />
					<Tooltip
						contentStyle={{
							backgroundColor: "#F9FAFB",
							border: "1px solid #E5E7EB",
							borderRadius: "8px",
						}}
					/>
					<Bar dataKey="stars" fill="#3B82F6" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

