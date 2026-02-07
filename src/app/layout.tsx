import '@/styles/globals.css';

import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import { TailwindIndicator } from '@/components/helpers/tailwind-indicator';
import { siteConfig } from '@/config/site.config';
import { jetbrainsMono } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: siteConfig.keywords,

	authors: [
		{
			name: siteConfig.author,
			url: siteConfig.url,
		},
	],
	creator: siteConfig.author,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
			<body className={cn('bg-background text-foreground min-h-screen font-sans antialiased', jetbrainsMono.variable)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{children}
					<TailwindIndicator />
				</ThemeProvider>
			</body>
		</html>
	);
}
