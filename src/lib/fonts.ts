import localFont from 'next/font/local';

export const fontSans = localFont({
	src: [
		{
			path: '../../public/fonts/Apercu/ApercuPro-Light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Apercu/ApercuPro-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Apercu/ApercuPro-Italic.woff2',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../public/fonts/Apercu/ApercuPro-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Apercu/ApercuPro-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-sans',
	display: 'swap',
});

export const fontMono = localFont({
	src: [
		{
			path: '../../public/fonts/Apercu/ApercuPro-Mono.woff2',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-mono',
	display: 'swap',
});

export const fontHeading = localFont({
	src: [
		{
			path: '../../public/fonts/StyreneB/StyreneB-Thin.woff2',
			weight: '100',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-ThinItalic.woff2',
			weight: '100',
			style: 'italic',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-Light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-LightItalic.woff2',
			weight: '300',
			style: 'italic',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-RegularItalic.woff2',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-MediumItalic.woff2',
			weight: '500',
			style: 'italic',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-BoldItalic.woff2',
			weight: '700',
			style: 'italic',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-Black.woff2',
			weight: '900',
			style: 'normal',
		},
		{
			path: '../../public/fonts/StyreneB/StyreneB-BlackItalic.woff2',
			weight: '900',
			style: 'italic',
		},
	],
	variable: '--font-heading',
	display: 'swap',
});
