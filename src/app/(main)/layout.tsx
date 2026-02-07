import type { ReactNode } from 'react';

import Footer from '../../components/layout/footer';
import SideNav from '../../components/layout/side-navigation';
import TopNav from '../../components/layout/top-navigation';

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<main className="bg-background text-foreground min-h-screen overflow-x-hidden">
			<SideNav />
			<TopNav />
			{children}
			<Footer />
		</main>
	);
}
