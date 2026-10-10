"use client";

import { useEffect, useRef, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  delay?: number;
}

/** Fades, unblurs and lifts its content in the first time it scrolls into view. */
export default function Reveal({ as: Tag = 'div', delay = 0, className, style, children, ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn('reveal', className)} style={{ '--d': `${delay}s`, ...style }} {...props}>
      {children}
    </Tag>
  );
}
