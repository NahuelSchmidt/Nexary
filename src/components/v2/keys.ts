'use client';

// Keyboard clicks synthesized with Web Audio (no audio file). Browsers only allow sound after the
// visitor has clicked/tapped/pressed a key somewhere, so before that this stays silent.
let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let unlocked = false;
let last = 0;

function ensure() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.05), ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
  }
  return ctx;
}

if (typeof window !== 'undefined') {
  const unlock = () => {
    const c = ensure();
    c?.resume().then(() => (unlocked = true)).catch(() => {});
  };
  ['pointerdown', 'keydown', 'touchstart'].forEach((e) => window.addEventListener(e, unlock, { passive: true }));
}

/** One key press. `space` gives the deeper, longer thock of the space bar. */
export function keyClick(space = false) {
  const c = ctx;
  if (!c || !unlocked || !noise || c.state !== 'running') return;
  const now = c.currentTime;
  if (now - last < 0.028) return; // never a buzz, even when scrolling fast
  last = now;
  const out = c.createGain();
  out.gain.value = space ? 0.22 : 0.16 + Math.random() * 0.05;
  out.connect(c.destination);
  // the click: a short filtered noise burst
  const src = c.createBufferSource();
  src.buffer = noise;
  src.playbackRate.value = 0.85 + Math.random() * 0.4;
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = space ? 900 : 2200 + Math.random() * 1600;
  bp.Q.value = 1.2;
  const env = c.createGain();
  env.gain.setValueAtTime(1, now);
  env.gain.exponentialRampToValueAtTime(0.001, now + (space ? 0.07 : 0.04));
  src.connect(bp).connect(env).connect(out);
  src.start(now);
  // the body of the key bottoming out
  const osc = c.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(space ? 120 : 180 + Math.random() * 60, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.05);
  const g = c.createGain();
  g.gain.setValueAtTime(space ? 0.5 : 0.28, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + (space ? 0.08 : 0.05));
  osc.connect(g).connect(out);
  osc.start(now);
  osc.stop(now + 0.1);
}
