export function EmptyState() {
	return (
		<div className="max-w-5xl mx-auto px-4 py-12 text-center">
			<svg
				className="w-24 h-24 text-gray-400 dark:text-gray-600 mx-auto mb-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
			<p className="text-gray-600 dark:text-gray-400 text-lg">
				Başlamak için bir GitHub kullanıcı adı girin
			</p>
		</div>
	)
}

