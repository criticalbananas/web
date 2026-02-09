import '@/styles/globals.css';

import type { Metadata } from 'next';

import { TailwindIndicator } from '@/components/helpers/tailwind-indicator';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { siteConfig } from '@/config/site.config';
import { fontHeading, fontMono, fontSans } from '@/lib/fonts';
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
		<html lang="en" suppressHydrationWarning className="scroll-smooth">
			<body
				className={cn(
					'bg-background text-foreground min-h-screen font-sans antialiased',
					fontSans.variable,
					fontMono.variable,
					fontHeading.variable
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
					{children}
					{process.env.NODE_ENV !== 'production' && <TailwindIndicator />}
				</ThemeProvider>
			</body>
		</html>
	);
}
