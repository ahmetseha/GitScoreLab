export function Logo() {
	return (
		<div className="flex flex-col items-center gap-1">
			<svg
				width="32"
				height="32"
				viewBox="0 0 32 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="text-gray-900"
			>
				<circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
				<path
					d="M16 8 L16 12 M16 20 L16 24 M8 16 L12 16 M20 16 L24 16"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<circle cx="16" cy="16" r="4" fill="currentColor" />
			</svg>
			<span className="text-xs font-semibold tracking-tight text-gray-900">
				GIT SCORE LAB
			</span>
		</div>
	)
}

