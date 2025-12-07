import { useLocale } from "@/contexts/LocaleContext"

export function LoadingState() {
	const { t } = useLocale()

	return (
		<div className="mx-auto max-w-7xl px-6 py-20 text-center">
			<div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white"></div>
			<p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
				{t.common.analyzing}
			</p>
		</div>
	)
}

