'use client';

import { BlendFunction, Effect } from 'postprocessing';
import { useEffect, useMemo } from 'react';
import { Color, DataTexture, NearestFilter, RedFormat, RepeatWrapping, Uniform, UnsignedByteType } from 'three';

/* ------------------------------------------------------------------ Bayer texture */
// Original values from the if/else Bayer matrix (values 0-63, divided by 64 in shader)
const BAYER_MATRIX = new Uint8Array([
	0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54,
	22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29,
	53, 21,
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
uniform bool  uTransparent;
uniform sampler2D uBayerTexture;
uniform float uLumaGamma;
uniform float uLumaSmoothMin;
uniform float uLumaSmoothMax;
uniform float uDitherStrength;
uniform float uColorBands;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 pixelUV = floor(uv * resolution / uPixelSize) * uPixelSize / resolution;
  vec4 color = texture2D(inputBuffer, pixelUV);

  if (uTransparent && color.a < 0.01) {
    outputColor = vec4(0.0);
    return;
  }

  float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  luma = pow(luma, uLumaGamma);
  luma = smoothstep(uLumaSmoothMin, uLumaSmoothMax, luma);

  float shift = uColorShift * sin(uTime * 0.5);
  luma = fract(luma + shift * 0.3);

  vec2 coord = mod(floor(uv * resolution / uGridSize), 8.0) / 8.0;
  float threshold = texture2D(uBayerTexture, coord).r;
  threshold = mix(0.5, threshold, uDitherStrength);

  vec3 result;
  float level = luma * uColorBands;
  int band = int(floor(level));
  float fractional = fract(level);

  if (band >= 2) {
    result = (fractional > threshold) ? uColor1 : uColor2;
  } else if (band == 1) {
    result = (fractional > threshold) ? uColor2 : uColor3;
  } else {
    result = (fractional > threshold) ? uColor3 : uBgColor;
  }

  if (uTransparent) {
    float ditherAlpha = step(threshold, color.a * 3.0) * color.a;
    outputColor = vec4(result, ditherAlpha);
  } else {
    outputColor = vec4(result, 1.0);
  }
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
	transparent?: boolean;
	lumaGamma?: number;
	lumaSmoothMin?: number;
	lumaSmoothMax?: number;
	ditherStrength?: number;
	colorBands?: number;
}

/* --------------------------------------------------------------- defaults */
const DEFAULT_COLORS: DitherColors = {
	background: '#5e3200', // Lifted from deep brown to a rich coffee
	accent: '#f08c00', // Brighter, pure orange
	secondary: '#ffca59', // Lighter gold
	primary: '#fff0b3', // Pale cream
};

/* --------------------------------------------------------------- Effect class */
class KaleidoscopeDitherEffect extends Effect {
	constructor({
		gridSize = 8,
		pixelSize = 6,
		colorShift = 0.4,
		colors = DEFAULT_COLORS,
		opacity = 0.6,
		transparent = false,
		lumaGamma = 0.7,
		lumaSmoothMin = 0.1,
		lumaSmoothMax = 0.9,
		ditherStrength = 1.0,
		colorBands = 3.0,
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
			['uTransparent', new Uniform(transparent)],
			['uBayerTexture', new Uniform(bayerTexture)],
			['uLumaGamma', new Uniform(lumaGamma)],
			['uLumaSmoothMin', new Uniform(lumaSmoothMin)],
			['uLumaSmoothMax', new Uniform(lumaSmoothMax)],
			['uDitherStrength', new Uniform(ditherStrength)],
			['uColorBands', new Uniform(colorBands)],
		]);

		super('KaleidoscopeDitherEffect', FRAGMENT, {
			blendFunction: BlendFunction.NORMAL,
			uniforms,
		});

		this.blendMode.opacity.value = opacity;
	}

	update(_renderer: unknown, _inputBuffer: unknown, deltaTime: number) {
		const time = this.uniforms.get('uTime');
		if (time) time.value += deltaTime;
	}
}

/* --------------------------------------------------------------- React component */
export default function KaleidoscopeDither({
	gridSize = 8,
	pixelSize = 6,
	colorShift = 0.4,
	colors = DEFAULT_COLORS,
	opacity = 0.6,
	transparent = false,
	lumaGamma = 0.7,
	lumaSmoothMin = 0.1,
	lumaSmoothMax = 0.9,
	ditherStrength = 1.0,
	colorBands = 3.0,
}: KaleidoscopeDitherProps) {
	const effect = useMemo(
		() =>
			new KaleidoscopeDitherEffect({
				gridSize,
				pixelSize,
				colorShift,
				colors,
				opacity,
				transparent,
				lumaGamma,
				lumaSmoothMin,
				lumaSmoothMax,
				ditherStrength,
				colorBands,
			}),
		[
			gridSize,
			pixelSize,
			colorShift,
			colors,
			opacity,
			transparent,
			lumaGamma,
			lumaSmoothMin,
			lumaSmoothMax,
			ditherStrength,
			colorBands,
		]
	);

	useEffect(() => {
		return () => effect.dispose();
	}, [effect]);

	return <primitive object={effect} dispose={null} />;
}
