'use client';

import dynamic from 'next/dynamic';

const BananaScene = dynamic(() => import('./index'), {
	ssr: false,
	loading: () => <div className="bg-primary h-full w-full" />,
});

export default BananaScene;
