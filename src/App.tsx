import { useState } from "react"
import { Header } from "@/components/Header"
import { SearchForm } from "@/components/SearchForm"
import { LoadingState } from "@/components/LoadingState"
import { ErrorState } from "@/components/ErrorState"
import { EmptyState } from "@/components/EmptyState"
import { UserProfileCard } from "@/components/UserProfileCard"
import { RatingSummaryCard } from "@/components/RatingSummaryCard"
import { RadarRatingChart } from "@/components/RadarRatingChart"
import { RepoStarsChart } from "@/components/RepoStarsChart"
import { RepoList } from "@/components/RepoList"
import { useGithubUser } from "@/hooks/useGithubUser"
import { useGithubRepos } from "@/hooks/useGithubRepos"
import { useGithubRating } from "@/hooks/useGithubRating"
import { useLocale } from "@/contexts/LocaleContext"

function App() {
	const { t } = useLocale()
	const [username, setUsername] = useState<string | null>(null)

	const {
		data: user,
		isLoading: isLoadingUser,
		isError: isErrorUser,
		error: userError,
		refetch: refetchUser,
	} = useGithubUser(username)

	const {
		data: repos,
		isLoading: isLoadingRepos,
		isError: isErrorRepos,
		error: reposError,
		refetch: refetchRepos,
	} = useGithubRepos(username)

	const rating = useGithubRating(user, repos)

	const isLoading = isLoadingUser || isLoadingRepos
	const isError = isErrorUser || isErrorRepos
	const error = userError || reposError

	const handleSearch = (newUsername: string) => {
		setUsername(newUsername)
	}

	const handleRetry = () => {
		refetchUser()
		refetchRepos()
	}

	const getErrorMessage = (): string => {
		if (!error) return t.errors.unknown
		if (error.message.includes("404")) {
			return t.errors.userNotFound
		}
		if (error.message.includes("rate limit") || error.message.includes("403")) {
			return t.errors.rateLimit
		}
		return error.message || t.errors.generic
	}

	return (
		<div className="min-h-screen bg-white dark:bg-gray-950">
			<Header />
			{!username && (
				<>
					<EmptyState />
					<SearchForm onSearch={handleSearch} isLoading={isLoading} />
				</>
			)}

			{username && (
				<div className="mx-auto max-w-7xl px-6 py-8">
					<SearchForm onSearch={handleSearch} isLoading={isLoading} />
				</div>
			)}

			{isLoading && username && <LoadingState />}

			{isError && username && (
				<div className="mx-auto max-w-7xl px-6 py-8">
					<ErrorState message={getErrorMessage()} onRetry={handleRetry} />
				</div>
			)}

			{user && repos && rating && !isLoading && !isError && (
				<div className="mx-auto max-w-7xl px-6 pb-16">
					<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
						<UserProfileCard user={user} repos={repos} />
						<RatingSummaryCard rating={rating} />
					</div>

					<div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
						<RadarRatingChart rating={rating} />
						<RepoStarsChart repos={repos} />
					</div>

					<RepoList repos={repos} />
				</div>
			)}
		</div>
	)
}

export default App
