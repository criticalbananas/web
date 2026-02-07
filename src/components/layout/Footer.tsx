import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="ml-14 py-6 px-10 flex items-center justify-between">
			<div className="flex items-center gap-6">
				<Image src="/logo.png" alt="Critical Bananas" width={24} height={24} />
				<span className="text-[10px] tracking-[0.25em] text-muted-foreground font-mono">CRITICAL BANANAS</span>
			</div>
			<div className="flex items-center gap-6 text-[10px] tracking-[0.2em] text-muted-foreground font-mono">
				<Link href="#" className="hover:text-foreground transition-colors">
					TERMS
				</Link>
				<Link href="#" className="hover:text-foreground transition-colors">
					PRIVACY
				</Link>
				<Link href="#" className="hover:text-foreground transition-colors">
					AUDIT
				</Link>
				<span>2025</span>
			</div>
		</footer>
	);
}
