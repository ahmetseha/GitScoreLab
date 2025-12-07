export function EmptyState() {
	return (
		<div className="mx-auto max-w-4xl px-6 py-20 text-center">
			<div className="mb-8 flex justify-center">
				<div className="relative">
					<svg
						className="h-32 w-32 text-gray-900 dark:text-white"
						fill="none"
						viewBox="0 0 200 200"
						stroke="currentColor"
						strokeWidth={1.5}
					>
						<circle cx="100" cy="100" r="80" />
						<path d="M60 100 L90 100 M110 100 L140 100" strokeLinecap="round" />
						<circle cx="80" cy="70" r="8" />
						<circle cx="120" cy="70" r="8" />
						<path
							d="M70 130 Q100 150 130 130"
							strokeLinecap="round"
							fill="none"
						/>
					</svg>
				</div>
			</div>
			<h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
				GIT SCORE LAB
			</h1>
			<p className="mx-auto mb-12 max-w-xl text-lg font-medium text-gray-600 dark:text-gray-400">
				find the GitHub rating score of any developer
			</p>
		</div>
	)
}

