import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TopNav() {
	return (
		<header className="fixed top-0 left-14 right-0 h-14 border-b border-border flex items-center justify-between px-6 z-40 bg-background/90 backdrop-blur-md">
			<div className="flex items-center gap-6">
				<span className="text-[10px] tracking-[0.25em] text-muted-foreground font-mono">CRITICAL BANANAS</span>
				<span className="text-[10px] tracking-[0.15em] text-primary font-mono">LIVE</span>
			</div>
			<div className="flex items-center gap-3">
				<Button variant="ghost" size="sm" className="text-[10px] tracking-[0.15em] h-8 font-mono">
					AUDIT
				</Button>
				<Button
					size="sm"
					className="text-[10px] tracking-[0.15em] h-8 gap-2 bg-primary text-primary-foreground hover:bg-accent font-mono"
				>
					<Wallet className="w-3 h-3" />
					CONNECT
				</Button>
			</div>
		</header>
	);
}
