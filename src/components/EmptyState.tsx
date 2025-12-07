import { useLocale } from "@/contexts/LocaleContext"

export function EmptyState() {
	const { t } = useLocale()

	return (
		<div className="mx-auto max-w-4xl px-6 pb-1 pt-20 text-center">
			<div className="mb-8 flex justify-center">
				<div className="relative">
					<svg
						className="h-32 w-32 text-gray-900 dark:text-white"
						fill="none"
						viewBox="0 0 200 200"
						stroke="currentColor"
						strokeWidth={1.5}
					>
						<path d="M100 20 L100 40 M100 160 L100 180" strokeLinecap="round" />
						<path d="M20 100 L40 100 M160 100 L180 100" strokeLinecap="round" />
						<circle cx="100" cy="100" r="60" strokeDasharray="4 4" />
						<circle cx="100" cy="100" r="40" />
						<path
							d="M70 70 L85 85 M130 70 L115 85 M70 130 L85 115 M130 130 L115 115"
							strokeLinecap="round"
						/>
						<circle cx="100" cy="100" r="8" fill="currentColor" />
					</svg>
				</div>
			</div>
			<h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
				{t.hero.title}
			</h1>
			<p className="mx-auto mb-12 max-w-xl text-lg font-medium text-gray-600 dark:text-gray-400">
				{t.hero.subtitle}
			</p>
		</div>
	)
}
