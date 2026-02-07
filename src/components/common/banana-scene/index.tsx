'use client';

import { Detailed, Environment, Preload, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { DepthOfField, EffectComposer, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

import KaleidoscopeDither from './kaleidoscope-dither';
import styles from './scene.module.css';

const MODEL_URL = '/landing/banana_v1.glb';

useGLTF.preload(MODEL_URL);

/* ------------------------------------------------------------------ Shared mouse state */

const mouse = { x: 0, y: 0, vx: 0, vy: 0 };
const _v = new THREE.Vector3();

/* ------------------------------------------------------------------ Banana */

interface BananaProps {
	index: number;
	z: number;
	speed: number;
}

function Banana({ index, z, speed }: BananaProps) {
	const ref = useRef<THREE.LOD>(null!);
	const { viewport, camera } = useThree();
	const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
	const { nodes, materials } = useGLTF(MODEL_URL);

	const data = useRef({
		y: THREE.MathUtils.randFloatSpread(height * 2),
		x: (((index * 1.618033988749895) % 1) - 0.5) * 3 + THREE.MathUtils.randFloatSpread(0.4),
		spin: THREE.MathUtils.randFloat(8, 12),
		rX: THREE.MathUtils.randFloat(0, Math.PI),
		rZ: THREE.MathUtils.randFloat(0, Math.PI),
		scale: THREE.MathUtils.randFloat(0.25, 0.75),
		drift: THREE.MathUtils.randFloat(0.4, 1.6),
		// interaction offsets
		gx: 0,
		gy: 0, // gravity well
		wx: 0, // wind
		sx: 0, // depth swim
		lean: 0, // wind lean
	});

	useFrame((state, dt) => {
		if (dt >= 0.1) return;
		const d = data.current;
		const ease = Math.pow(Math.max(0, 1 - state.clock.elapsedTime / 10), 4);
		d.y += dt * speed * d.drift * (1 + 10 * ease);

		const bx = index === 0 ? 0 : d.x * width;

		// Mouse in world space at this banana's depth
		const mx = mouse.x * width * 0.5;
		const my = mouse.y * height * 0.5;
		const dx = bx + d.gx - mx;
		const dy = d.y + d.gy - my;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const proximity = Math.max(0, 1 - dist / 8);

		// 1. Gravity well — gentle pull toward cursor
		if (dist > 0.01 && proximity > 0) {
			d.gx += (-dx / dist) * proximity * dt * 2;
			d.gy += (-dy / dist) * proximity * dt * 2;
		}
		d.gx *= 0.97;
		d.gy *= 0.97;

		// 2. Wind — mouse horizontal velocity pushes bananas sideways
		d.wx += (mouse.vx * 0.02 - d.wx) * 0.03;

		// 3. Depth swim — layers shift at different rates
		const depthFactor = 1 - z / 80;
		d.sx += (mouse.x * depthFactor * 0.3 - d.sx) * 0.02;

		// 4. Wind lean — bananas tilt in wind direction
		d.lean += (mouse.vx * 0.003 - d.lean) * 0.05;

		// Combine all offsets
		let fx = bx + d.gx + d.wx + d.sx;
		let fy = d.y + d.gy;

		// Logo exclusion — push bananas around the center
		const exclusionR = 1.8 * Math.max(0, 1 - z / 40);
		if (exclusionR > 0) {
			const cd = Math.sqrt(fx * fx + fy * fy) + 0.001;
			if (cd < exclusionR) {
				fx += (fx / cd) * (exclusionR - cd);
				fy += (fy / cd) * (exclusionR - cd);
			}
		}

		ref.current.position.set(fx, fy, -z);

		// Magnetic spin — proximity boosts spin speed
		const spinBoost = 1 + proximity * 4;
		ref.current.rotation.set(
			(d.rX += (dt / d.spin) * spinBoost),
			Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI + d.lean,
			(d.rZ += (dt / d.spin) * spinBoost)
		);
		ref.current.scale.setScalar(d.scale);

		const bound = height * (index === 0 ? 4 : 1);
		if (d.y > bound) {
			d.y = -(bound + Math.random() * height);
			d.gx = 0;
			d.gy = 0;
		}
	});

	return (
		<Detailed ref={ref} distances={[0, 65, 80]}>
			<mesh
				geometry={(nodes.banana_high as THREE.Mesh).geometry}
				material={materials.skin}
				material-emissive="#ff9f00"
			/>
			<mesh
				geometry={(nodes.banana_mid as THREE.Mesh).geometry}
				material={materials.skin}
				material-emissive="#ff9f00"
			/>
			<mesh
				geometry={(nodes.banana_low as THREE.Mesh).geometry}
				material={materials.skin}
				material-emissive="#ff9f00"
			/>
		</Detailed>
	);
}

/* ------------------------------------------------------------------ CenterLogo */

function CenterLogo() {
	const ref = useRef<THREE.Group>(null!);
	const { viewport, camera } = useThree();
	const { width } = viewport.getCurrentViewport(camera, [0, 0, -1]);
	const svg = useLoader(SVGLoader, '/logo.svg');

	const shapes = useMemo(() => {
		return svg.paths.flatMap((path) => SVGLoader.createShapes(path).map((shape) => ({ shape })));
	}, [svg]);

	useFrame((state) => {
		const t = state.clock.elapsedTime;
		ref.current.rotation.z = Math.sin(t * 0.8) * 0.02;
		ref.current.position.y = Math.sin(t * 0.5) * 0.05;
	});

	// Logo = 20% of viewport width, SVG viewBox width is 50.8
	const s = (width * 0.2) / 20.8;

	return (
		<group ref={ref} position={[0, 0, 1]}>
			<group scale={[s, -s, s]}>
				<group position={[-25.4, -15.815, 0]}>
					{shapes.map(({ shape }, i) => (
						<mesh key={i}>
							<shapeGeometry args={[shape]} />
							<meshBasicMaterial color="#5e3200" transparent opacity={0.5} side={THREE.DoubleSide} />
						</mesh>
					))}
				</group>
			</group>
		</group>
	);
}

/* ------------------------------------------------------------------ Rig (mouse tracking + subtle camera) */

function Rig() {
	const prev = useRef({ x: 0, y: 0 });
	useFrame((state, dt) => {
		// Track mouse velocity for wind effect
		if (dt > 0.001) {
			mouse.vx += ((state.pointer.x - prev.current.x) / dt - mouse.vx) * 0.1;
			mouse.vy += ((state.pointer.y - prev.current.y) / dt - mouse.vy) * 0.1;
		}
		mouse.x = state.pointer.x;
		mouse.y = state.pointer.y;
		prev.current.x = state.pointer.x;
		prev.current.y = state.pointer.y;

		// Subtle camera shift — just enough for the logo to feel alive
		state.camera.position.lerp(_v.set(state.pointer.x * 0.1, state.pointer.y * 0.07, 10), 0.02);
		state.camera.lookAt(0, 0, 0);
	});
	return null;
}

/* ------------------------------------------------------------------ Scene */

interface BananaSceneProps {
	speed?: number;
	count?: number;
	depth?: number;
	easing?: (_x: number) => number;
}

export default function BananaScene({
	speed = 1,
	count = 160,
	depth = 80,
	easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}: BananaSceneProps) {
	const [flashKey, setFlashKey] = useState(0);

	useEffect(() => {
		setFlashKey((key) => key + 1);
	}, []);

	return (
		<div className={styles.container}>
			<div className="absolute inset-0">
				<Canvas
					flat
					gl={{ antialias: false }}
					dpr={[1, 1.5]}
					camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}
				>
					<color attach="background" args={['#ffbf40']} />
					<spotLight position={[10, 20, 10]} penumbra={1} decay={0} intensity={3} color="orange" />
					<Suspense fallback={null}>
						{Array.from(
							{ length: count },
							(_, i) => <Banana key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */
						)}
						<CenterLogo />
						<Environment preset="sunset" />
					</Suspense>
					<Rig />
					<EffectComposer enableNormalPass={false} multisampling={0}>
						<DepthOfField target={[0, 0, 0]} focusRange={10} bokehScale={14} resolutionY={700} />
						<ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
						<KaleidoscopeDither />
					</EffectComposer>
					<Preload all />
				</Canvas>
			</div>

			<div key={flashKey} className={styles.flash} />
		</div>
	);
}
