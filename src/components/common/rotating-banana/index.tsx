'use client';

import { Preload } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import KaleidoscopeDither from '../kaleidoscope-dither';
import { playSoundtrack, stopSoundtrack } from './audio';
import { type BananaPosition, FLOAT_AMPLITUDE, FLOAT_SPEED } from './constants';
import { SpinningBanana } from './spinning-banana';
/* ------------------------------------------------------------------ Shadow */

const shadowTexture = (() => {
	if (typeof document === 'undefined') return null;
	const size = 128;
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d')!;
	const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
	gradient.addColorStop(0, 'rgba(0,0,0,0.35)');
	gradient.addColorStop(0.5, 'rgba(0,0,0,0.15)');
	gradient.addColorStop(1, 'rgba(0,0,0,0)');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, size, size);
	return new THREE.CanvasTexture(canvas);
})();

function BlobShadow({ bananaPos }: { bananaPos: React.RefObject<BananaPosition> }) {
	const ref = useRef<THREE.Mesh>(null!);

	useFrame((state) => {
		const floatY = Math.sin(state.clock.elapsedTime * FLOAT_SPEED) * FLOAT_AMPLITUDE;
		const scale = 1 - floatY * 2;
		ref.current.scale.set(scale, scale, 1);
		ref.current.position.x = bananaPos.current.x;
	});

	return (
		<mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]} raycast={() => null}>
			<planeGeometry args={[1, 1]} />
			<meshBasicMaterial map={shadowTexture} transparent depthWrite={false} />
		</mesh>
	);
}

/* ------------------------------------------------------------------ Bounce emoji */

const EMOJI_GROUPS = [
	['💛', '🍑'],
	['🍑', '💛'],
	['💛', '🐒'],
	['🍑', '🍑'],
];

interface FloatingEmoji {
	id: number;
	emoji: string;
	x: number;
	y: number;
	duration: number;
}

function useBounceEmojis() {
	const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);
	const counterRef = useRef(0);

	const spawnBurst = useCallback(() => {
		if (Math.random() > 1 / 3) return;
		const count = 1 + Math.floor(Math.random() * 3);
		const group = EMOJI_GROUPS[Math.floor(Math.random() * EMOJI_GROUPS.length)];
		const batch: FloatingEmoji[] = [];

		for (let i = 0; i < count; i++) {
			const id = ++counterRef.current;
			batch.push({
				id,
				emoji: group[i % group.length],
				x: 35 + Math.random() * 30,
				y: 25 + Math.random() * 30,
				duration: 0.6 + Math.random() * 0.6,
			});
		}

		setEmojis((prev) => [...prev, ...batch]);
		const maxDuration = Math.max(...batch.map((e) => e.duration));
		setTimeout(() => {
			const ids = new Set(batch.map((e) => e.id));
			setEmojis((prev) => prev.filter((e) => !ids.has(e.id)));
		}, maxDuration * 1000);
	}, []);

	return { emojis, spawnBurst };
}

/* ------------------------------------------------------------------ Scene */

type SoundtrackState = 'idle' | 'playing' | 'ended';

export default function RotatingBananaScene() {
	const [mounted, setMounted] = useState(false);
	const [soundtrack, setSoundtrack] = useState<SoundtrackState>('idle');
	const bananaPosRef = useRef<BananaPosition>({ x: 0, y: 0 });
	const { emojis, spawnBurst } = useBounceEmojis();

	useEffect(() => {
		const timer = setTimeout(() => setMounted(true), 100);
		return () => clearTimeout(timer);
	}, []);

	const handlePositionChange = useCallback((x: number, y: number) => {
		bananaPosRef.current.x = x;
		bananaPosRef.current.y = y;
	}, []);

	const handleSoundtrackChange = useCallback((state: 'playing' | 'ended') => {
		setSoundtrack(state);
	}, []);

	const handleReplay = useCallback(() => {
		setSoundtrack('playing');
		playSoundtrack(() => setSoundtrack('ended'));
	}, []);

	const handleStop = useCallback(() => {
		stopSoundtrack();
		setSoundtrack('ended');
	}, []);

	return (
		<div
			className={`relative h-full w-full transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
			style={{ touchAction: 'none' }}
		>
			<Canvas
				orthographic
				gl={{ alpha: true, antialias: false }}
				camera={{ position: [10, 10, 35], zoom: 100 }}
				dpr={[1, 1]}
			>
				<ambientLight intensity={1.4} />
				<spotLight position={[10, 12, 10]} angle={0.3} penumbra={0.5} intensity={3000} color="#fff5e6" />
				<directionalLight position={[-5, 6, -3]} intensity={0.3} color="#e8d8c8" />
				<Suspense fallback={null}>
					<SpinningBanana
						onPositionChange={handlePositionChange}
						onSoundtrackStart={handleSoundtrackChange}
						onBounce={spawnBurst}
					/>
					<BlobShadow bananaPos={bananaPosRef} />
				</Suspense>
				<EffectComposer multisampling={0}>
					<KaleidoscopeDither transparent opacity={1.0} gridSize={2} pixelSize={2} colorShift={0} />
				</EffectComposer>
				<Preload all />
			</Canvas>
			{emojis.map((e) => (
				<span
					key={e.id}
					className="pointer-events-none absolute text-lg"
					style={{
						left: `${e.x}%`,
						top: `${e.y}%`,
						animation: `bounce-emoji ${e.duration}s ease-out forwards`,
					}}
				>
					{e.emoji}
				</span>
			))}
			{soundtrack !== 'idle' && (
				<button
					onClick={soundtrack === 'playing' ? handleStop : handleReplay}
					className="text-muted-foreground hover:text-foreground absolute right-1 bottom-1 rounded-full p-1.5 transition-colors"
					aria-label={soundtrack === 'playing' ? 'Stop soundtrack' : 'Replay soundtrack'}
				>
					{soundtrack === 'playing' ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
				</button>
			)}
		</div>
	);
}
