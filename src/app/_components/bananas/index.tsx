import * as THREE from 'three';
import { Suspense, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, Detailed, Environment, Preload } from '@react-three/drei';
import { EffectComposer, DepthOfField, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import KaleidoscopeDither from '../KaleidoscopeDither';

const MODEL_URL = '/landing/banana-v1-transformed.glb';

useGLTF.preload(MODEL_URL);

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
		x: THREE.MathUtils.randFloatSpread(2),
		spin: THREE.MathUtils.randFloat(8, 12),
		rX: THREE.MathUtils.randFloat(0, Math.PI),
		rZ: THREE.MathUtils.randFloat(0, Math.PI),
	});

	useFrame((state, dt) => {
		if (dt >= 0.1) return;
		const d = data.current;
		ref.current.position.set(index === 0 ? 0 : d.x * width, (d.y += dt * speed), -z);
		ref.current.rotation.set(
			(d.rX += dt / d.spin),
			Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
			(d.rZ += dt / d.spin)
		);
		if (d.y > height * (index === 0 ? 4 : 1)) d.y = -(height * (index === 0 ? 4 : 1));
	});

	return (
		<Detailed ref={ref} distances={[0, 65, 80]}>
			<mesh geometry={(nodes.banana_high as THREE.Mesh).geometry} material={materials.skin} material-emissive="#ff9f00" />
			<mesh geometry={(nodes.banana_mid as THREE.Mesh).geometry} material={materials.skin} material-emissive="#ff9f00" />
			<mesh geometry={(nodes.banana_low as THREE.Mesh).geometry} material={materials.skin} material-emissive="#ff9f00" />
		</Detailed>
	);
}

interface BananaSceneProps {
	speed?: number;
	count?: number;
	depth?: number;
	easing?: (_x: number) => number;
}

export default function Bananas({
	speed = 1,
	count = 80,
	depth = 80,
	easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}: BananaSceneProps) {
	return (
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
				<Environment preset="sunset" />
			</Suspense>
			<EffectComposer enableNormalPass={false} multisampling={0}>
				<DepthOfField target={[0, 0, 0]} focusRange={10} bokehScale={14} resolutionY={700} />
				<ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
				<KaleidoscopeDither />
			</EffectComposer>
			<Preload all />
		</Canvas>
	);
}
