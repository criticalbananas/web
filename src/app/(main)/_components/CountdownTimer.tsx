'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer() {
	const [time, setTime] = useState(165);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((t) => (t <= 0 ? 300 : t - 1));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const mins = Math.floor(time / 60);
	const secs = time % 60;

	return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
