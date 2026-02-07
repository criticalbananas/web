import type { ReactNode } from 'react';
import SideNav from '../../components/layout/SideNav';
import TopNav from '../../components/layout/TopNav';
import Footer from '../../components/layout/Footer';

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<main className="min-h-screen bg-background text-foreground overflow-x-hidden">
			<SideNav />
			<TopNav />
			{children}
			<Footer />
		</main>
	);
}
