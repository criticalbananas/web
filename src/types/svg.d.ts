declare module '*.svg' {
	import type { ComponentPropsWithoutRef } from 'react';
	const content: React.FC<ComponentPropsWithoutRef<'svg'>>;
	export default content;
}
