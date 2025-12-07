import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { SearchForm } from "../SearchForm"

describe("SearchForm", () => {
	it("should render search input and button", () => {
		const onSearch = vi.fn()
		render(<SearchForm onSearch={onSearch} />)

		expect(screen.getByPlaceholderText("GitHub kullanıcı adı girin...")).toBeInTheDocument()
		expect(screen.getByText("Analiz Et")).toBeInTheDocument()
	})

	it("should call onSearch when form is submitted", () => {
		const onSearch = vi.fn()
		render(<SearchForm onSearch={onSearch} />)

		const input = screen.getByPlaceholderText("GitHub kullanıcı adı girin...")
		const button = screen.getByText("Analiz Et")

		fireEvent.change(input, { target: { value: "testuser" } })
		fireEvent.click(button)

		expect(onSearch).toHaveBeenCalledWith("testuser")
	})

	it("should call onSearch when Enter is pressed", () => {
		const onSearch = vi.fn()
		render(<SearchForm onSearch={onSearch} />)

		const input = screen.getByPlaceholderText("GitHub kullanıcı adı girin...")

		fireEvent.change(input, { target: { value: "testuser" } })
		fireEvent.submit(input.closest("form")!)

		expect(onSearch).toHaveBeenCalledWith("testuser")
	})

	it("should not call onSearch with empty input", () => {
		const onSearch = vi.fn()
		render(<SearchForm onSearch={onSearch} />)

		const button = screen.getByText("Analiz Et")
		fireEvent.click(button)

		expect(onSearch).not.toHaveBeenCalled()
	})

	it("should disable button when loading", () => {
		const onSearch = vi.fn()
		render(<SearchForm onSearch={onSearch} isLoading={true} />)

		const button = screen.getByText("Yükleniyor...")
		expect(button).toBeDisabled()
	})
})

