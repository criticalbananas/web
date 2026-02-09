'use client';

import dynamic from 'next/dynamic';

const RotatingBananaScene = dynamic(() => import('./index'), {
	ssr: false,
	loading: () => <div className="h-[120px] w-full" />,
});

export default RotatingBananaScene;
