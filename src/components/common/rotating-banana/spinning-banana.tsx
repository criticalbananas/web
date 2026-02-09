import { useFrame } from '@react-three/fiber';
import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { BananaModel } from '../banana-scene/banana-model';
import { playBounceSound, playSoundtrack } from './audio';
import {
	BASE_ROTATION_X,
	DRAG_LERP,
	DRAG_LIMIT_X,
	DRAG_LIMIT_Y,
	FLOAT_AMPLITUDE,
	FLOAT_SPEED,
	ROTATION_SPEED,
	SPRING_BACK_DECAY,
	TILT_LERP,
	TILT_SENSITIVITY,
} from './constants';

function randomBounceParams() {
	return {
		height: 0.2 + Math.random() * 0.2,
		speed: 2.5 + Math.random() * 1.5,
		decay: 0.9 + Math.random() * 0.04,
	};
}

function triggerBounce(bounceRef: RefObject<number>, paramsRef: RefObject<ReturnType<typeof randomBounceParams>>) {
	bounceRef.current = 1;
	paramsRef.current = randomBounceParams();
	playBounceSound();
}

interface SpinningBananaProps {
	onPositionChange: (_x: number, _y: number) => void;
	onSoundtrackStart: (_state: 'playing' | 'ended') => void;
	onBounce?: () => void;
}

export function SpinningBanana({ onPositionChange, onSoundtrackStart, onBounce }: SpinningBananaProps) {
	const ref = useRef<THREE.Group>(null!);
	const tiltRef = useRef({ x: 0, y: 0 });
	const bounceRef = useRef(0);
	const bounceParams = useRef(randomBounceParams());
	const dragRef = useRef({ active: false, x: 0, y: 0, hitLimit: false });
	const dragOffsetRef = useRef({ x: 0, y: 0 });
	const [hovered, setHovered] = useState(false);
	const [dragging, setDragging] = useState(false);
	const soundtrackStarted = useRef(false);

	const bounce = useCallback(() => {
		triggerBounce(bounceRef, bounceParams);
		onBounce?.();
	}, [onBounce]);

	// Cursor style
	useEffect(() => {
		document.body.style.cursor = dragging ? 'grabbing' : hovered ? 'grab' : 'auto';
		return () => {
			document.body.style.cursor = 'auto';
		};
	}, [hovered, dragging]);

	// Auto-bounce every ~15s, sometimes a quick double bounce
	useEffect(() => {
		const schedule = () =>
			setTimeout(
				() => {
					bounce();
					if (Math.random() < 0.4) {
						setTimeout(() => bounce(), 300 + Math.random() * 200);
					}
					timerId = schedule();
				},
				12000 + Math.random() * 6000
			);
		let timerId = schedule();
		return () => clearTimeout(timerId);
	}, [bounce]);

	// Override shared model material for this scene
	useEffect(() => {
		const clonedMaterials: THREE.MeshStandardMaterial[] = [];
		ref.current.traverse((child) => {
			if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
				child.material = child.material.clone();
				child.material.color.set('#c8a84e');
				child.material.emissive.set('#000000');
				clonedMaterials.push(child.material);
			}
		});
		return () => {
			clonedMaterials.forEach((m) => m.dispose());
		};
	}, []);

	const onPointerDown = useCallback(
		(e: { point: THREE.Vector3; stopPropagation: () => void }) => {
			dragRef.current = { active: true, x: e.point.x, y: e.point.y, hitLimit: false };
			setDragging(true);
			e.stopPropagation();

			if (!soundtrackStarted.current) {
				soundtrackStarted.current = true;
				playSoundtrack(() => onSoundtrackStart('ended'));
				onSoundtrackStart('playing');
			}
		},
		[onSoundtrackStart]
	);

	const onPointerUp = useCallback(() => {
		if (!dragRef.current.active) return;
		dragRef.current.active = false;
		setDragging(false);
		if (!dragRef.current.hitLimit) {
			bounce();
		}
	}, [bounce]);

	// Window-level pointerup fallback for touch — catches release outside canvas
	useEffect(() => {
		if (!dragging) return;
		const handleUp = () => {
			if (!dragRef.current.active) return;
			dragRef.current.active = false;
			setDragging(false);
			if (!dragRef.current.hitLimit) {
				bounce();
			}
		};
		window.addEventListener('pointerup', handleUp);
		return () => window.removeEventListener('pointerup', handleUp);
	}, [dragging, bounce]);

	const onPointerMove = useCallback(
		(e: { point: THREE.Vector3 }) => {
			tiltRef.current.x = e.point.x * TILT_SENSITIVITY;
			tiltRef.current.y = e.point.y * TILT_SENSITIVITY;

			if (!dragRef.current.active) return;

			const rawX = e.point.x - dragRef.current.x;
			const rawY = e.point.y - dragRef.current.y;
			dragOffsetRef.current.x = THREE.MathUtils.clamp(rawX, -DRAG_LIMIT_X, DRAG_LIMIT_X);
			dragOffsetRef.current.y = THREE.MathUtils.clamp(rawY, -DRAG_LIMIT_Y, DRAG_LIMIT_Y);

			if (!dragRef.current.hitLimit && (Math.abs(rawX) >= DRAG_LIMIT_X || Math.abs(rawY) >= DRAG_LIMIT_Y)) {
				dragRef.current.hitLimit = true;
				dragRef.current.active = false;
				setDragging(false);
				bounce();
			}
		},
		[bounce]
	);

	useFrame((state, delta) => {
		const g = ref.current;

		const bp = bounceParams.current;
		bounceRef.current *= bp.decay;
		const bounceY = bounceRef.current * bp.height * Math.sin(bounceRef.current * Math.PI * bp.speed);

		// Angry shake during bounce — rapid rotation wobble that decays with the bounce
		const shake = bounceRef.current * 0.6 * Math.sin(state.clock.elapsedTime * 45);
		g.rotation.z += delta * ROTATION_SPEED + shake;

		const floatY = Math.sin(state.clock.elapsedTime * FLOAT_SPEED) * FLOAT_AMPLITUDE;

		if (!dragRef.current.active) {
			dragOffsetRef.current.x *= SPRING_BACK_DECAY;
			dragOffsetRef.current.y *= SPRING_BACK_DECAY;
		}
		g.position.x = THREE.MathUtils.lerp(g.position.x, dragOffsetRef.current.x, DRAG_LERP);
		g.position.y = THREE.MathUtils.lerp(g.position.y, floatY + bounceY + dragOffsetRef.current.y, DRAG_LERP);

		// Share position with shadow
		onPositionChange(g.position.x, g.position.y);

		const target = hovered ? tiltRef.current : { x: 0, y: 0 };
		g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, BASE_ROTATION_X + target.y, TILT_LERP);
		g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, target.x, TILT_LERP);
	});

	return (
		<group
			ref={ref}
			rotation={[BASE_ROTATION_X, 0, 0]}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => {
				setHovered(false);
				if (!dragRef.current.active) {
					setDragging(false);
				}
			}}
			onPointerDown={onPointerDown}
			onPointerUp={onPointerUp}
			onPointerMove={onPointerMove}
		>
			<BananaModel scale={0.15} />
			<mesh visible={false}>
				<sphereGeometry args={[1.5, 8, 8]} />
			</mesh>
		</group>
	);
}
