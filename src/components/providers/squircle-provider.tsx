'use client';

import { init } from '@squircle/core';
import { type PropsWithChildren, useLayoutEffect } from 'react';

export function SquircleProvider({ children }: PropsWithChildren) {
	useLayoutEffect(() => {
		init();
	}, []);
	return children;
}
