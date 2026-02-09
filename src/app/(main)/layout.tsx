export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-foreground flex min-h-screen flex-col p-2 lg:p-4">
			<div className="squircle-background squircle lg:squircle-[60px] squircle-[40px] flex flex-1 flex-col justify-between p-4 lg:p-6">
				{children}
			</div>
		</div>
	);
}
