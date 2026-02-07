import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="ml-14 flex items-center justify-between px-10 py-6">
			<div className="flex items-center gap-6">
				<Image src="/logo.png" alt="Critical Bananas" width={24} height={24} />
				<span className="text-muted-foreground font-mono text-[10px] tracking-[0.25em]">CRITICAL BANANAS</span>
			</div>
			<div className="text-muted-foreground flex items-center gap-6 font-mono text-[10px] tracking-[0.2em]">
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
