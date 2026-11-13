'use client';

import { useEffect, useRef, useState } from 'react';
import { keyBack, keyClick } from './keys';

/**
 * The end of the hero headline erases itself and types the next phrase, in a loop,
 * with a block caret and a key sound per letter (deleting clicks too).
 */
export default function HeroTyper({ phrases, startDelay = 2600 }: { phrases: string[]; startDelay?: number }) {
  const [text, setText] = useState(phrases[0]);
  const [busy, setBusy] = useState(false);
  const [blink, setBlink] = useState(true);
  // only types (and only makes noise) while the hero is on screen
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useRef(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    const wait = (ms: number) => new Promise<void>((r) => (timer = setTimeout(r, ms)));
    (async () => {
      let i = 0;
      let cur = phrases[0];
      await wait(startDelay);
      while (alive) {
        while (alive && !visible.current) await wait(250); // paused while scrolled away
        const next = phrases[(i + 1) % phrases.length];
        setBusy(true);
        // erase back to nothing
        while (alive && cur.length) {
          cur = cur.slice(0, -1);
          setText(cur);
          keyBack();
          await wait(70 + Math.random() * 30);
        }
        await wait(320);
        // type the next phrase, a little human rhythm
        for (let k = 1; alive && k <= next.length; k++) {
          cur = next.slice(0, k);
          setText(cur);
          keyClick(next[k - 1] === ' ');
          await wait(next[k - 1] === ' ' ? 170 : 95 + Math.random() * 70);
        }
        setBusy(false);
        i = (i + 1) % phrases.length;
        await wait(2600);
      }
    })();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [phrases, startDelay]);

  return (
    <span ref={ref} className="relative whitespace-nowrap">
      <span className="v2-grad-text">{text}</span>
      <span
        aria-hidden="true"
        className="ml-[0.06em] inline-block h-[0.82em] w-[0.42em] translate-y-[0.1em] rounded-[3px] bg-primary/25 ring-1 ring-primary/40"
        style={{ opacity: busy || blink ? 1 : 0 }}
      />
      <span className="sr-only">{phrases[0]}</span>
    </span>
  );
}
