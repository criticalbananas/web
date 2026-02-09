'use client';

import { init } from '@squircle/core';
import { type PropsWithChildren, useEffect } from 'react';

export function SquircleProvider({ children }: PropsWithChildren) {
	useEffect(() => {
		init();
	}, []);
	return children;
}
