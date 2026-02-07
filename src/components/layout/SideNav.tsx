import Image from 'next/image';
import Link from 'next/link';

const NAV_ITEMS = ['ARENA', 'RULES', 'PROOF', 'SPECS'];

export default function SideNav() {
	return (
		<nav className="fixed left-0 top-0 h-full w-14 border-r border-border flex flex-col items-center justify-between py-8 z-50 bg-background/90 backdrop-blur-md">
			<Link href="/" className="w-8 h-8">
				<Image
					src="/public/logo.png"
					alt="Critical Bananas"
					width={32}
					height={32}
					className="w-full h-full object-contain"
				/>
			</Link>
			<div className="flex flex-col gap-8">
				{NAV_ITEMS.map((label) => (
					<Link
						key={label}
						href={`#${label.toLowerCase()}`}
						className="text-muted-foreground hover:text-primary transition-colors text-[10px] tracking-[0.2em] [writing-mode:vertical-lr] rotate-180"
					>
						{label}
					</Link>
				))}
			</div>
			<span className="text-[10px] text-muted-foreground tracking-[0.2em] [writing-mode:vertical-lr] rotate-180 font-mono">
				BNB
			</span>
		</nav>
	);
}
