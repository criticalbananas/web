import type { Metadata } from 'next';

import RotatingBananaScene from '@/components/common/rotating-banana/lazy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
	title: 'Waitlist',
	description: 'Join the Critical Bananas waitlist for early access before everyone else slips in.',
};

export default function Waitlist() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-8 text-center">
			<div className="flex w-full max-w-lg flex-col items-center gap-4">
				<div className="relative h-[120px] w-full overflow-visible">
					<RotatingBananaScene />
				</div>
				<h1 className="text-4xl font-medium tracking-tighter sm:text-5xl">Ready to Go Bananas?</h1>
				<p className="text-muted-foreground px-4 text-sm leading-6 sm:px-0">
					Something appealing is ripening. Join our exclusive waitlist to be critical to our launch and get early access
					before everyone else slips in.
				</p>
			</div>

			<form className="flex w-full max-w-sm flex-col items-center gap-3 sm:flex-row">
				<Input type="email" placeholder="Enter your email" className="h-11 flex-1" required />
				<Button type="submit" size="lg" className="h-11 w-full sm:w-auto">
					Join Waitlist
				</Button>
			</form>

			<p className="text-muted-foreground text-xs">We respect your inbox. No spam, just the ripest updates.</p>
		</div>
	);
}
