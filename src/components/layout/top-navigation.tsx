import { Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function TopNav() {
	return (
		<header className="border-border bg-background/90 fixed top-0 right-0 left-14 z-40 flex h-14 items-center justify-between border-b px-6 backdrop-blur-md">
			<div className="flex items-center gap-6">
				<span className="text-muted-foreground font-mono text-[10px] tracking-[0.25em]">CRITICAL BANANAS</span>
				<span className="text-primary font-mono text-[10px] tracking-[0.15em]">LIVE</span>
			</div>
			<div className="flex items-center gap-3">
				<Button variant="ghost" size="sm" className="h-8 font-mono text-[10px] tracking-[0.15em]">
					AUDIT
				</Button>
				<Button
					size="sm"
					className="bg-primary text-primary-foreground hover:bg-accent h-8 gap-2 font-mono text-[10px] tracking-[0.15em]"
				>
					<Wallet className="h-3 w-3" />
					CONNECT
				</Button>
			</div>
		</header>
	);
}
