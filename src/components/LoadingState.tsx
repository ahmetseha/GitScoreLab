export function LoadingState() {
	return (
		<div className="max-w-5xl mx-auto px-4 py-12 text-center">
			<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-500"></div>
			<p className="mt-4 text-gray-600 dark:text-gray-400">
				Veriler yükleniyor...
			</p>
		</div>
	)
}

