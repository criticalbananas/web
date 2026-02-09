import { ImageResponse } from 'next/og';

import Logo from '@/assets/logo.svg';

// Next.js will automatically use this for /favicon.ico and related icon sizes.

export const size = {
	width: 64,
	height: 64,
};

export const contentType = 'image/png';

export default function Icon() {
	const primary = '#ff9f00';

	return new ImageResponse(
		(
			<div
				style={{
					width: size.width,
					height: size.height,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: primary,
				}}
			>
				<Logo
					width={size.width}
					height={size.height}
					style={{
						display: 'block',
						objectFit: 'contain',
					}}
				/>
			</div>
		),
		{
			...size,
		}
	);
}
