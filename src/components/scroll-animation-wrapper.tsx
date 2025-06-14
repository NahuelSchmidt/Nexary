// src/components/scroll-animation-wrapper.tsx
"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationWrapperProps extends HTMLAttributes<HTMLDivElement> {
  animationClass: string;
  children: React.ReactNode;
}

export function ScrollAnimationWrapper({
  children,
  animationClass,
  className,
  style,
  ...props
}: ScrollAnimationWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (ref.current) { // Check if ref.current is not null
              observer.unobserve(ref.current);
            }
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (ref.current) { // Check if ref.current is not null
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) { // Check if ref.current is not null
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(className, isVisible ? animationClass : 'opacity-0')}
      style={style} // Pass style prop here
      {...props}
    >
      {children}
    </div>
  );
}
