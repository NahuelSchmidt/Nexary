'use client';

import { useRef } from 'react';
import Magnetic from '@/components/effects/magnetic';

/** A card with a green light that follows the pointer. */
export function SpotCard({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`v2-spot ${className}`}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`);
        ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}

export { Magnetic };

/** Headline words that come out of a blur on load, one after the other. */
export function BlurWords({ lines, accentFrom, start = 0.15, step = 0.09 }: { lines: string[][]; accentFrom: [number, number]; start?: number; step?: number }) {
  let k = 0;
  return (
    <>
      {lines.map((words, li) => (
        <span key={li} className="block">
          {words.map((w, wi) => {
            const accent = li > accentFrom[0] || (li === accentFrom[0] && wi >= accentFrom[1]);
            const d = start + k++ * step;
            return (
              <span key={wi} className={`v2-in ${accent ? 'v2-grad-text' : ''}`} style={{ animationDelay: `${d}s` }}>
                {w}
                {wi < words.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}
