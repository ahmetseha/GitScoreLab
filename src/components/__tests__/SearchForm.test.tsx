import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { LocaleProvider } from "@/contexts/LocaleContext"
import { SearchForm } from "../SearchForm"

function renderWithLocale(component: React.ReactElement, locale: "tr" | "en" = "en") {
	localStorage.setItem("locale", locale)
	return render(<LocaleProvider>{component}</LocaleProvider>)
}

describe("SearchForm", () => {
	it("should render search input and button", () => {
		const onSearch = vi.fn()
		renderWithLocale(<SearchForm onSearch={onSearch} />, "en")

		expect(screen.getByPlaceholderText("find username")).toBeInTheDocument()
	})

	it("should call onSearch when form is submitted", () => {
		const onSearch = vi.fn()
		renderWithLocale(<SearchForm onSearch={onSearch} />, "en")

		const input = screen.getByPlaceholderText("find username")
		const form = input.closest("form")!

		fireEvent.change(input, { target: { value: "testuser" } })
		fireEvent.submit(form)

		expect(onSearch).toHaveBeenCalledWith("testuser")
	})

	it("should call onSearch when Enter is pressed", () => {
		const onSearch = vi.fn()
		renderWithLocale(<SearchForm onSearch={onSearch} />, "en")

		const input = screen.getByPlaceholderText("find username")

		fireEvent.change(input, { target: { value: "testuser" } })
		fireEvent.submit(input.closest("form")!)

		expect(onSearch).toHaveBeenCalledWith("testuser")
	})

	it("should not call onSearch with empty input", () => {
		const onSearch = vi.fn()
		renderWithLocale(<SearchForm onSearch={onSearch} />, "en")

		const input = screen.getByPlaceholderText("find username")
		const form = input.closest("form")!

		fireEvent.submit(form)

		expect(onSearch).not.toHaveBeenCalled()
	})

	it("should disable input when loading", () => {
		const onSearch = vi.fn()
		renderWithLocale(<SearchForm onSearch={onSearch} isLoading={true} />, "en")

		const input = screen.getByPlaceholderText("find username")
		expect(input).toBeDisabled()
	})
})

