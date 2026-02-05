import { Effect, BlendFunction } from 'postprocessing';
import { useMemo } from 'react';
import { Color, Uniform } from 'three';

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

// 8×8 Bayer ordered-dither matrix
float bayer8(vec2 p) {
  vec2 P = mod(floor(p), 8.0);
  int x = int(P.x);
  int y = int(P.y);

  if (y == 0) {
    if (x == 0) return  0.0/64.0; if (x == 1) return 32.0/64.0;
    if (x == 2) return  8.0/64.0; if (x == 3) return 40.0/64.0;
    if (x == 4) return  2.0/64.0; if (x == 5) return 34.0/64.0;
    if (x == 6) return 10.0/64.0; return                42.0/64.0;
  }
  if (y == 1) {
    if (x == 0) return 48.0/64.0; if (x == 1) return 16.0/64.0;
    if (x == 2) return 56.0/64.0; if (x == 3) return 24.0/64.0;
    if (x == 4) return 50.0/64.0; if (x == 5) return 18.0/64.0;
    if (x == 6) return 58.0/64.0; return                26.0/64.0;
  }
  if (y == 2) {
    if (x == 0) return 12.0/64.0; if (x == 1) return 44.0/64.0;
    if (x == 2) return  4.0/64.0; if (x == 3) return 36.0/64.0;
    if (x == 4) return 14.0/64.0; if (x == 5) return 46.0/64.0;
    if (x == 6) return  6.0/64.0; return                38.0/64.0;
  }
  if (y == 3) {
    if (x == 0) return 60.0/64.0; if (x == 1) return 28.0/64.0;
    if (x == 2) return 52.0/64.0; if (x == 3) return 20.0/64.0;
    if (x == 4) return 62.0/64.0; if (x == 5) return 30.0/64.0;
    if (x == 6) return 54.0/64.0; return                22.0/64.0;
  }
  if (y == 4) {
    if (x == 0) return  3.0/64.0; if (x == 1) return 35.0/64.0;
    if (x == 2) return 11.0/64.0; if (x == 3) return 43.0/64.0;
    if (x == 4) return  1.0/64.0; if (x == 5) return 33.0/64.0;
    if (x == 6) return  9.0/64.0; return                41.0/64.0;
  }
  if (y == 5) {
    if (x == 0) return 51.0/64.0; if (x == 1) return 19.0/64.0;
    if (x == 2) return 59.0/64.0; if (x == 3) return 27.0/64.0;
    if (x == 4) return 49.0/64.0; if (x == 5) return 17.0/64.0;
    if (x == 6) return 57.0/64.0; return                25.0/64.0;
  }
  if (y == 6) {
    if (x == 0) return 15.0/64.0; if (x == 1) return 47.0/64.0;
    if (x == 2) return  7.0/64.0; if (x == 3) return 39.0/64.0;
    if (x == 4) return 13.0/64.0; if (x == 5) return 45.0/64.0;
    if (x == 6) return  5.0/64.0; return                37.0/64.0;
  }
  // y == 7
  if (x == 0) return 63.0/64.0; if (x == 1) return 31.0/64.0;
  if (x == 2) return 55.0/64.0; if (x == 3) return 23.0/64.0;
  if (x == 4) return 61.0/64.0; if (x == 5) return 29.0/64.0;
  if (x == 6) return 53.0/64.0; return                  21.0/64.0;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // Pixelate the source
  vec2 pixelUV = floor(uv * resolution / uPixelSize) * uPixelSize / resolution;
  vec4 color   = texture2D(inputBuffer, pixelUV);

  // Luminance → gamma-corrected & remapped
  float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  luma = pow(luma, 0.7);
  luma = smoothstep(0.1, 0.9, luma);

  // Animated colour-shift drives the "grow / shrink" wave
  float shift = uColorShift * sin(uTime * 0.5);
  luma = fract(luma + shift * 0.3);

  // Bayer threshold at the dither-grid scale
  vec2  coord    = floor(uv * resolution / uGridSize);
  float threshold = bayer8(coord);

  // 4-level posterisation with ordered dithering
  vec3  result;
  float level      = luma * 3.0;
  int   band       = int(floor(level));
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

/* --------------------------------------------------------------- helpers */
function hexToColor(hex: string) {
	return new Color(
		parseInt(hex.slice(1, 3), 16) / 255,
		parseInt(hex.slice(3, 5), 16) / 255,
		parseInt(hex.slice(5, 7), 16) / 255
	);
}

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
	background: '#3d2000',
	accent: '#d47a00',
	secondary: '#ffb830',
	primary: '#ffe088',
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
			['uColor1', new Uniform(hexToColor(colors.primary))],
			['uColor2', new Uniform(hexToColor(colors.secondary))],
			['uColor3', new Uniform(hexToColor(colors.accent))],
			['uBgColor', new Uniform(hexToColor(colors.background))],
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

	return <primitive object={effect} dispose={null} />;
}
