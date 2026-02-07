export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col p-4">
			<div className="squircle squircle-2xl bg-foreground flex-1 p-6">{children}</div>
		</div>
	);
}
