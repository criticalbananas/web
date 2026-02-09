'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
			<h2 className="text-2xl font-bold">Something went wrong</h2>
			<p className="text-muted-foreground text-sm">{error.message || 'An unexpected error occurred.'}</p>
			<button
				onClick={reset}
				className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
			>
				Try again
			</button>
		</div>
	);
}
