"use client";

import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

/** Green dot + trailing ring. Only enabled on devices with a fine pointer. */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reducedMotion) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const show = (on: boolean) => {
      dot.style.opacity = on ? '1' : '0';
      ring.style.opacity = on ? '1' : '0';
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      show(true);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      ring.dataset.hover = target?.closest(INTERACTIVE) ? 'true' : 'false';
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) show(false);
    };
    const onDown = () => (ring.dataset.down = 'true');
    const onUp = () => (ring.dataset.down = 'false');

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-primary opacity-0 transition-opacity duration-300"
      />
      <div ref={ringRef} className="absolute left-0 top-0 opacity-0 transition-opacity duration-300">
        <div className="cursor-ring -ml-[19px] -mt-[19px] h-[38px] w-[38px] rounded-full border border-primary/60" />
      </div>
      <style>{`
        .cursor-ring { transition: transform .35s cubic-bezier(.2,.8,.2,1), background-color .3s, border-color .3s; }
        [data-hover="true"] > .cursor-ring { transform: scale(1.7); background: hsl(var(--primary) / .08); border-color: hsl(var(--primary) / .9); }
        [data-down="true"] > .cursor-ring { transform: scale(.8); }
      `}</style>
    </div>
  );
}
