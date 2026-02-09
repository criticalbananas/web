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
		<div className="mx-auto flex w-full max-w-lg flex-1 flex-col text-center">
			<div className="flex flex-1 flex-col items-center justify-center gap-8">
				{/* Hero */}
				<div className="flex flex-col items-center justify-center gap-4">
					<div className="relative h-[120px] w-full overflow-visible">
						<RotatingBananaScene />
					</div>
					<h1 className="tracking-tighter">Ready to Go Bananas?</h1>
					<p className="text-muted-foreground px-4 sm:px-0">
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
