import { useState, type FormEvent } from "react"

interface SearchFormProps {
	onSearch: (username: string) => void
	isLoading?: boolean
}

export function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
	const [username, setUsername] = useState("")

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const trimmedUsername = username.trim()
		if (trimmedUsername) {
			onSearch(trimmedUsername)
		}
	}

	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			<form onSubmit={handleSubmit} className="flex gap-4">
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="GitHub kullanıcı adı girin..."
					className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					disabled={isLoading}
				/>
				<button
					type="submit"
					disabled={isLoading || !username.trim()}
					className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
				>
					{isLoading ? "Yükleniyor..." : "Analiz Et"}
				</button>
			</form>
		</div>
	)
}

