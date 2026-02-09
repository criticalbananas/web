import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
});

export const styreneB = localFont({
	src: [
		{
			path: '../../public/fonts/StyreneB/StyreneB-Thin.otf',
			weight: '100',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-ThinItalic.otf',
			weight: '100',
			style: 'italic',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-Light.otf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-LightItalic.otf',
			weight: '300',
			style: 'italic',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-RegularItalic.otf',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-Medium.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-MediumItalic.otf',
			weight: '500',
			style: 'italic',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-Bold.otf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-BoldItalic.otf',
			weight: '700',
			style: 'italic',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-Black.otf',
			weight: '900',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-BlackItalic.otf',
			weight: '900',
			style: 'italic',
		},
	],
	variable: '--font-heading',
	display: 'swap',
});
