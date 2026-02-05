import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Critical Bananas | The Vibe Check Game',
	description: 'A social volatility game powered by vibes and AI',
	keywords: ['game', 'crypto', 'gambling', 'vibes', 'ai'],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen">
				{children}
			</body>
		</html>
	);
}
