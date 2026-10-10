"use client";

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { THEME_STORAGE_KEY } from '@/lib/theme';

export default function ThemeToggle({ className }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !light;
    root.classList.add('theme-transition');
    root.classList.toggle('light', next);
    window.setTimeout(() => root.classList.remove('theme-transition'), 450);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? 'light' : 'dark');
    } catch {}
    setLight(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={light ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      title={light ? 'Modo oscuro' : 'Modo claro'}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-ink/10 text-foreground transition-colors hover:border-primary/60 hover:text-primary',
        className
      )}
    >
      <Sun className={cn('absolute h-[18px] w-[18px] transition-all duration-500', light ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100')} />
      <Moon className={cn('absolute h-[18px] w-[18px] transition-all duration-500', light ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0')} />
    </button>
  );
}
