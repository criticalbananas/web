/**
 * Audio manager for the rotating banana scene.
 * Handles bounce SFX (randomized file + pitch) and background soundtrack (play once, replay).
 */

const FX_COUNT = 3;
const FX_PATHS = Array.from({ length: FX_COUNT }, (_, i) => `/audio/fx/fx_${i + 1}.mp3`);
const SOUNDTRACK_PATH = '/audio/background_audio/soundtrack.mp3';

const SOUNDTRACK_VOLUME = 0.15;
const FADE_IN_DURATION = 1.5;
const FADE_OUT_DURATION = 0.3;

let audioCtx: AudioContext | null = null;
const bufferCache = new Map<string, AudioBuffer>();

function getAudioContext(): AudioContext {
	if (!audioCtx || audioCtx.state === 'closed') {
		audioCtx = new AudioContext();
	}
	return audioCtx;
}

async function loadBuffer(ctx: AudioContext, path: string): Promise<AudioBuffer> {
	const cached = bufferCache.get(path);
	if (cached) return cached;

	const response = await fetch(path);
	const arrayBuffer = await response.arrayBuffer();
	const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
	bufferCache.set(path, audioBuffer);
	return audioBuffer;
}

let preloaded = false;
function preloadAll(ctx: AudioContext) {
	if (preloaded) return;
	preloaded = true;
	for (const path of FX_PATHS) {
		loadBuffer(ctx, path);
	}
}

/* ------------------------------------------------------------------ Bounce FX */

export function playBounceSound() {
	const ctx = getAudioContext();
	if (ctx.state === 'suspended') ctx.resume();

	preloadAll(ctx);

	const path = FX_PATHS[Math.floor(Math.random() * FX_COUNT)];

	loadBuffer(ctx, path).then((buffer) => {
		const source = ctx.createBufferSource();
		source.buffer = buffer;
		source.playbackRate.value = 0.9 + Math.random() * 0.2;

		const gain = ctx.createGain();
		gain.gain.value = 0.3 + Math.random() * 0.2;

		source.connect(gain);
		gain.connect(ctx.destination);
		source.start();
	});
}

/* ------------------------------------------------------------------ Soundtrack */

let soundtrackSource: AudioBufferSourceNode | null = null;
let soundtrackGain: GainNode | null = null;
let soundtrackPlaying = false;
let onEndedCallback: (() => void) | null = null;

/** Play the soundtrack once from the beginning. Calls onEnded when it finishes naturally. */
export function playSoundtrack(onEnded?: () => void) {
	const ctx = getAudioContext();
	if (ctx.state === 'suspended') ctx.resume();

	if (soundtrackPlaying) return;

	onEndedCallback = onEnded ?? null;

	loadBuffer(ctx, SOUNDTRACK_PATH).then((buffer) => {
		const source = ctx.createBufferSource();
		source.buffer = buffer;
		source.loop = false;

		const gain = ctx.createGain();
		gain.gain.setValueAtTime(0, ctx.currentTime);
		gain.gain.linearRampToValueAtTime(SOUNDTRACK_VOLUME, ctx.currentTime + FADE_IN_DURATION);

		source.connect(gain);
		gain.connect(ctx.destination);
		source.start();

		source.onended = () => {
			soundtrackPlaying = false;
			soundtrackSource = null;
			soundtrackGain = null;
			onEndedCallback?.();
		};

		soundtrackSource = source;
		soundtrackGain = gain;
	});

	soundtrackPlaying = true;
}

/** Stop the soundtrack with a quick fade-out. */
export function stopSoundtrack() {
	const ctx = getAudioContext();
	if (!soundtrackPlaying || !soundtrackGain || !soundtrackSource) return;

	soundtrackGain.gain.setValueAtTime(soundtrackGain.gain.value, ctx.currentTime);
	soundtrackGain.gain.linearRampToValueAtTime(0, ctx.currentTime + FADE_OUT_DURATION);
	const src = soundtrackSource;
	setTimeout(() => src.stop(), FADE_OUT_DURATION * 1000);

	soundtrackPlaying = false;
	soundtrackSource = null;
	soundtrackGain = null;
}

export function isSoundtrackPlaying(): boolean {
	return soundtrackPlaying;
}
