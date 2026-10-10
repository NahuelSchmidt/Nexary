"use client";

import { type HTMLAttributes, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

/** Card whose background and border light up around the cursor. */
export default function SpotlightCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const b = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - b.left}px`);
    el.style.setProperty('--my', `${e.clientY - b.top}px`);
  };

  return (
    <div
      className={cn('spotlight', className)}
      onMouseMove={onMouseMove}
      onMouseEnter={(e) => e.currentTarget.style.setProperty('--spot', '1')}
      onMouseLeave={(e) => e.currentTarget.style.setProperty('--spot', '0')}
      {...props}
    >
      {children}
    </div>
  );
}
