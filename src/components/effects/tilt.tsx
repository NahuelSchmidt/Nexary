"use client";

import { useRef, type HTMLAttributes, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

/** Tilts its content in 3D following the cursor. */
export default function Tilt({ className, children, max = 7, ...props }: HTMLAttributes<HTMLDivElement> & { max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-py * max}deg) rotateY(${px * max}deg) scale(1.015)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('transition-transform duration-500 ease-out will-change-transform', className)}
      {...props}
    >
      {children}
    </div>
  );
}
