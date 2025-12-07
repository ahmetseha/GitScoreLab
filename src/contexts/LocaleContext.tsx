import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Locale } from "@/locales"
import { getTranslations } from "@/locales"

interface LocaleContextType {
	locale: Locale
	setLocale: (locale: Locale) => void
	t: ReturnType<typeof getTranslations>
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("locale") as Locale
			return saved === "tr" || saved === "en" ? saved : "en"
		}
		return "en"
	})

	useEffect(() => {
		localStorage.setItem("locale", locale)
	}, [locale])

	const setLocale = (newLocale: Locale) => {
		setLocaleState(newLocale)
	}

	const t = getTranslations(locale)

	return (
		<LocaleContext.Provider value={{ locale, setLocale, t }}>
			{children}
		</LocaleContext.Provider>
	)
}

export function useLocale() {
	const context = useContext(LocaleContext)
	if (context === undefined) {
		throw new Error("useLocale must be used within a LocaleProvider")
	}
	return context
}

