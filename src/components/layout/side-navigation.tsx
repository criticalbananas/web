import Image from 'next/image';
import Link from 'next/link';

const NAV_ITEMS = ['ARENA', 'RULES', 'PROOF', 'SPECS'];

export default function SideNav() {
	return (
		<nav className="border-border bg-background/90 fixed top-0 left-0 z-50 flex h-full w-14 flex-col items-center justify-between border-r py-8 backdrop-blur-md">
			<Link href="/" className="h-8 w-8">
				<Image src="/logo.png" alt="Critical Bananas" width={32} height={32} className="h-full w-full object-contain" />
			</Link>
			<div className="flex flex-col gap-8">
				{NAV_ITEMS.map((label) => (
					<Link
						key={label}
						href={`#${label.toLowerCase()}`}
						className="text-muted-foreground hover:text-primary rotate-180 text-[10px] tracking-[0.2em] transition-colors [writing-mode:vertical-lr]"
					>
						{label}
					</Link>
				))}
			</div>
			<span className="text-muted-foreground rotate-180 font-mono text-[10px] tracking-[0.2em] [writing-mode:vertical-lr]">
				BNB
			</span>
		</nav>
	);
}
