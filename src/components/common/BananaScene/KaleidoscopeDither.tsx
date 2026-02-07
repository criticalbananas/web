'use client';

import { Effect, BlendFunction } from 'postprocessing';
import { useMemo, useEffect } from 'react';
import {
	Color,
	Uniform,
	DataTexture,
	RedFormat,
	UnsignedByteType,
	NearestFilter,
	RepeatWrapping,
} from 'three';

/* ------------------------------------------------------------------ Bayer texture */
// Original values from the if/else Bayer matrix (values 0-63, divided by 64 in shader)
const BAYER_MATRIX = new Uint8Array([
	0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60,
	28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47,
	7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
]);

// Scale to match original: value/64 -> stored as 0-255, read as 0-1 in shader
const bayerData = new Uint8Array(64);
for (let i = 0; i < 64; i++) {
	bayerData[i] = Math.round((BAYER_MATRIX[i] / 64) * 255);
}

const bayerTexture = new DataTexture(bayerData, 8, 8, RedFormat, UnsignedByteType);
bayerTexture.minFilter = NearestFilter;
bayerTexture.magFilter = NearestFilter;
bayerTexture.wrapS = RepeatWrapping;
bayerTexture.wrapT = RepeatWrapping;
bayerTexture.needsUpdate = true;

/* ------------------------------------------------------------------ shader */
const FRAGMENT = `
uniform float uGridSize;
uniform float uPixelSize;
uniform float uTime;
uniform float uColorShift;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uBgColor;
uniform sampler2D uBayerTexture;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 pixelUV = floor(uv * resolution / uPixelSize) * uPixelSize / resolution;
  vec4 color = texture2D(inputBuffer, pixelUV);

  float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  luma = pow(luma, 0.7);
  luma = smoothstep(0.1, 0.9, luma);

  float shift = uColorShift * sin(uTime * 0.5);
  luma = fract(luma + shift * 0.3);

  vec2 coord = mod(floor(uv * resolution / uGridSize), 8.0) / 8.0;
  float threshold = texture2D(uBayerTexture, coord).r;

  vec3 result;
  float level = luma * 3.0;
  int band = int(floor(level));
  float fractional = fract(level);

  if (band >= 2) {
    result = (fractional > threshold) ? uColor1 : uColor2;
  } else if (band == 1) {
    result = (fractional > threshold) ? uColor2 : uColor3;
  } else {
    result = (fractional > threshold) ? uColor3 : uBgColor;
  }

  outputColor = vec4(result, 1.0);
}
`;

/* --------------------------------------------------------------- types */
export interface DitherColors {
	background: string;
	primary: string;
	secondary: string;
	accent: string;
}

export interface KaleidoscopeDitherProps {
	gridSize?: number;
	pixelSize?: number;
	colorShift?: number;
	colors?: DitherColors;
	opacity?: number;
}

/* --------------------------------------------------------------- defaults */
const DEFAULT_COLORS: DitherColors = {
    background: '#5e3200', // Lifted from deep brown to a rich coffee
    accent: '#f08c00',     // Brighter, pure orange
    secondary: '#ffca59',  // Lighter gold
    primary: '#fff0b3',    // Pale cream
};

/* --------------------------------------------------------------- Effect class */
class KaleidoscopeDitherEffect extends Effect {
	constructor({
		gridSize = 8,
		pixelSize = 6,
		colorShift = 0.4,
		colors = DEFAULT_COLORS,
		opacity = 0.6,
	}: KaleidoscopeDitherProps = {}) {
		const uniforms = new Map<string, Uniform>([
			['uGridSize', new Uniform(gridSize)],
			['uPixelSize', new Uniform(pixelSize)],
			['uTime', new Uniform(0)],
			['uColorShift', new Uniform(colorShift)],
			['uColor1', new Uniform(new Color(colors.primary))],
			['uColor2', new Uniform(new Color(colors.secondary))],
			['uColor3', new Uniform(new Color(colors.accent))],
			['uBgColor', new Uniform(new Color(colors.background))],
			['uBayerTexture', new Uniform(bayerTexture)],
		]);

		super('KaleidoscopeDitherEffect', FRAGMENT, {
			blendFunction: BlendFunction.NORMAL,
			uniforms,
		});

		this.blendMode.opacity.value = opacity;
	}

	update(_renderer: unknown, _inputBuffer: unknown, deltaTime: number) {
		(this.uniforms.get('uTime') as Uniform<number>).value += deltaTime;
	}
}

/* --------------------------------------------------------------- React component */
export default function KaleidoscopeDither({
	gridSize = 8,
	pixelSize = 6,
	colorShift = 0.4,
	colors = DEFAULT_COLORS,
	opacity = 0.6,
}: KaleidoscopeDitherProps) {
	const effect = useMemo(
		() => new KaleidoscopeDitherEffect({ gridSize, pixelSize, colorShift, colors, opacity }),
		[gridSize, pixelSize, colorShift, colors, opacity]
	);

	useEffect(() => {
		return () => effect.dispose();
	}, [effect]);

	return <primitive object={effect} dispose={null} />;
}
