'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Scroll progress of an element, 0 → 1, eased toward the target every frame so motion stays smooth.
 * - pinned: progress through a tall section whose inner content is `position: sticky` (0 when its top
 *   hits the top of the viewport, 1 when its bottom reaches the bottom of the viewport).
 * - enter: progress while the element travels from the bottom of the viewport to `endAt` (fraction of vh).
 */
export function useProgress<T extends HTMLElement>(
  mode: 'pinned' | 'enter' = 'pinned',
  { endAt = 0.35, ease = 0.3 }: { endAt?: number; ease?: number } = {},
): [RefObject<T>, number] {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = -1;
    let raf = 0;
    const target = () => {
      const el = ref.current;
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = mode === 'pinned' ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / Math.max(1, vh * (1 - endAt));
      return Math.min(1, Math.max(0, t));
    };
    const loop = () => {
      const t = target();
      const next = cur < 0 || reduce ? t : cur + (t - cur) * ease;
      if (Math.abs(next - cur) > 0.0005) {
        cur = next;
        setP(next);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mode, endAt, ease]);
  return [ref, p];
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** progress of a sub-range [a, b] inside p */
export const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
