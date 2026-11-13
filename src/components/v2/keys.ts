'use client';

// Real keyboard sounds: single keystrokes cut from royalty-free Mixkit recordings
// (laptop typing #2531 — closest match to the reference: bright, dry, short — and backspace #2539), packed in /sounds/keys.mp3 with their offsets in
// /sounds/keys.json. One random keystroke per letter, so the sound always matches the typing.
// Browsers only allow sound after the visitor has clicked, tapped or pressed a key; before that
// this stays silent.
let ctx: AudioContext | null = null;
let sprite: AudioBuffer | null = null;
let offsets: { k: number[][]; s: number[][]; b: number[][] } | null = null;
let loading: Promise<void> | null = null;
let last = 0;
let lastPick = -1;

function load() {
  if (loading || typeof window === 'undefined') return loading;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  loading = Promise.all([
    fetch('/sounds/keys.json').then((r) => r.json()),
    fetch('/sounds/keys.mp3').then((r) => r.arrayBuffer()).then((b) => ctx!.decodeAudioData(b)),
  ])
    .then(([o, buf]) => {
      offsets = o;
      sprite = buf;
    })
    .catch(() => {});
  return loading;
}

if (typeof window !== 'undefined') {
  const unlock = () => {
    load();
    ctx?.resume().catch(() => {});
  };
  ['pointerdown', 'keydown', 'touchstart'].forEach((e) => window.addEventListener(e, unlock, { passive: true }));
}

function play(kind: 'k' | 's' | 'b', gain: number) {
  if (!ctx || !sprite || !offsets || ctx.state !== 'running') return;
  const now = ctx.currentTime;
  if (now - last < 0.025) return;
  last = now;
  const list = offsets[kind];
  let i = Math.floor(Math.random() * list.length);
  if (list.length > 1 && i === lastPick) i = (i + 1) % list.length; // never the same key twice in a row
  lastPick = i;
  const [at, dur] = list[i];
  const src = ctx.createBufferSource();
  src.buffer = sprite;
  src.playbackRate.value = 0.94 + Math.random() * 0.12;
  const g = ctx.createGain();
  g.gain.value = gain * (0.85 + Math.random() * 0.3);
  src.connect(g).connect(ctx.destination);
  src.start(now, at, dur);
}

/** One key press; `space` plays the space bar. */
export function keyClick(space = false) {
  play(space ? 's' : 'k', 0.22);
}

/** One backspace while erasing. */
export function keyBack() {
  play('b', 0.19);
}
