import { ImageResponse } from 'next/og';

import Logo from '@/assets/logo.svg';

// Next.js will automatically use this for /favicon.ico and related icon sizes.

export const size = {
	width: 64,
	height: 64,
};

export const contentType = 'image/png';

export default function Icon() {
	// Keep the favicon color in sync with the primary OKLCH color from globals.css
	const primary = 'oklch(0.843 0.154 80.38)';

	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: 999,
					background: 'transparent',
				}}
			>
				<Logo
					width={48}
					height={48}
					style={{
						display: 'block',
						fill: primary,
					}}
				/>
			</div>
		),
		{
			...size,
		}
	);
}
