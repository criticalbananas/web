export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-foreground flex min-h-screen flex-col p-2 lg:p-4">
			<div className="bg-background squircle-background squircle squircle-[40px] lg:squircle-[60px] flex flex-1 flex-col justify-between overflow-hidden rounded-[40px] p-4 lg:rounded-[60px] lg:p-6">
				{children}
			</div>
		</div>
	);
}
