interface ErrorStateProps {
	message: string
	onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
	return (
		<div className="mx-auto max-w-7xl px-6 py-12 text-center">
			<div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
				<svg
					className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
					Error
				</p>
				<p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
					{message}
				</p>
				{onRetry && (
					<button
						onClick={onRetry}
						className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
					>
						Try again
					</button>
				)}
			</div>
		</div>
	)
}
