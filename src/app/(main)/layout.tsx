export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-foreground flex min-h-screen flex-col p-4">
			<div className="squircle-background squircle squircle-[60px] flex flex-1 flex-col justify-between p-6">
				{children}
			</div>
		</div>
	);
}
