import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { LocaleProvider } from "@/contexts/LocaleContext"
import "./index.css"
import App from "./App.tsx"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			retry: 1,
		},
	},
})

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<LocaleProvider>
				<App />
			</LocaleProvider>
		</QueryClientProvider>
	</StrictMode>
)
