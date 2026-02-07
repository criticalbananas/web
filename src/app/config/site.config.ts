export type SiteConfig = {
	name: string;
	description: string;
	developer: string;
	author: string;
	url: string;
	ogImage: string;
	keywords: string[];
};

export const siteConfig: SiteConfig = {
	name: 'Critical Bananas',
	description: 'A social volatility game powered by vibes and AI',
	developer: 'Critical Bananas',
	author: 'Critical Bananas',
	url: process.env.NEXT_PUBLIC_SITE_URL as string,
	ogImage: '#',
	keywords: ['game', 'crypto', 'gambling', 'vibes', 'ai'],
};
