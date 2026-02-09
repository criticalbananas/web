import type { Metadata } from 'next';

import LogoFull from '@/assets/logo_full.svg';
import RotatingBananaScene from '@/components/common/rotating-banana/lazy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
	title: 'Waitlist',
	description: 'Join the Critical Bananas waitlist for early access before everyone else slips in.',
};

export default function Waitlist() {
	return (
		<div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-2 text-center sm:px-0">
			<div className="flex flex-1 flex-col items-center justify-center gap-6 sm:gap-8">
				{/* Hero */}
				<div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
					<div className="relative h-[140px] w-full overflow-visible sm:h-[120px]">
						<RotatingBananaScene />
					</div>
					<h1 className="text-3xl tracking-tighter sm:text-4xl md:text-5xl" style={{ textWrap: 'balance' }}>
						Ready to Go Bananas?
					</h1>
					<p className="text-muted-foreground max-w-md" style={{ textWrap: 'pretty' }}>
						Something appealing is ripening. Join our exclusive waitlist to our launch and get early access before
						everyone else slips in.
					</p>
				</div>

				{/* Form */}
				<div className="flex w-full max-w-sm flex-col items-center justify-center gap-2">
					<form className="flex w-full flex-col items-center gap-3 sm:flex-row">
						<Input type="email" placeholder="Enter your email" className="h-11 flex-1" required />
						<Button type="submit" size="lg" className="h-11 w-full sm:w-auto">
							Join Waitlist
						</Button>
					</form>

					<p className="text-muted-foreground text-xs">We respect your inbox. No spam, just the ripest updates.</p>
				</div>
			</div>

			<div className="text-primary mt-auto flex items-end justify-center">
				<LogoFull className="h-4 w-full max-w-sm" />
			</div>
		</div>
	);
}
