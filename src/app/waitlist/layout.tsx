export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-foreground flex min-h-screen flex-col p-2">
			<div className="bg-background flex flex-1 flex-col justify-center rounded-2xl p-6">{children}</div>
		</div>
	);
}
