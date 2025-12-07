import { tr } from "./tr"
import { en } from "./en"

export type Locale = "tr" | "en"
export type Translations = typeof tr

export const translations: Record<Locale, Translations> = {
	tr,
	en,
}

export function getTranslations(locale: Locale): Translations {
	return translations[locale]
}

