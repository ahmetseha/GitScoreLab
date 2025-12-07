import { useState, type FormEvent } from "react"
import { useLocale } from "@/contexts/LocaleContext"

interface SearchFormProps {
	onSearch: (username: string) => void
	isLoading?: boolean
}

export function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
	const { t } = useLocale()
	const [username, setUsername] = useState("")

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const trimmedUsername = username.trim()
		if (trimmedUsername) {
			onSearch(trimmedUsername)
		}
	}

	return (
		<div className="relative mx-auto max-w-2xl px-6">
			<form onSubmit={handleSubmit} className="relative">
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder={t.common.searchPlaceholder}
					className="w-full rounded-lg border border-gray-200 bg-white px-5 py-4 pr-12 text-base text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-gray-400 focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-600"
					disabled={isLoading}
				/>
				<button
					type="submit"
					disabled={isLoading || !username.trim()}
					className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
					aria-label="Search"
				>
					<svg
						className="h-5 w-5"
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
				</button>
			</form>
		</div>
	)
}

