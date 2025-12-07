interface ErrorStateProps {
	message: string
	onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
	return (
		<div className="max-w-5xl mx-auto px-4 py-12 text-center">
			<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
				<svg
					className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<p className="text-red-800 dark:text-red-300 font-semibold mb-2">
					Hata
				</p>
				<p className="text-red-600 dark:text-red-400 mb-4">{message}</p>
				{onRetry && (
					<button
						onClick={onRetry}
						className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
					>
						Tekrar Dene
					</button>
				)}
			</div>
		</div>
	)
}

