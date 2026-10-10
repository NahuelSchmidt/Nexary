"use client";

import { useRef, type ReactElement, cloneElement, type MouseEvent } from 'react';

/** Makes its single child drift slightly towards the cursor while hovered. */
export default function Magnetic({ children, strength = 0.3 }: { children: ReactElement<any>; strength?: number }) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    const x = e.clientX - b.left - b.width / 2;
    const y = e.clientY - b.top - b.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength * 1.3}px)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return cloneElement(children, { ref, onMouseMove, onMouseLeave });
}
