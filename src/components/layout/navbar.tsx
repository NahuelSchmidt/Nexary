"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navLinks, whatsAppLink } from '@/lib/site';
import Logo from '@/components/layout/logo';
import Magnetic from '@/components/effects/magnetic';
import ThemeToggle from '@/components/layout/theme-toggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div
        className={cn(
          'mx-auto flex max-w-[1180px] items-center justify-between rounded-full border py-2.5 pl-5 pr-2.5 transition-all duration-500',
          scrolled || open ? 'border-ink/10 bg-surface/70 backdrop-blur-xl' : 'border-transparent bg-transparent'
        )}
      >
        <Logo onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Magnetic>
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary hidden px-5 py-2.5 sm:inline-flex">
              Hablemos
            </a>
          </Magnetic>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-x-4 top-[84px] rounded-3xl border border-ink/10 bg-surface/95 p-6 backdrop-blur-xl transition-all duration-300 md:hidden',
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        )}
      >
        <nav className="flex flex-col">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-ink/5 py-4 text-2xl font-medium tracking-tight"
            >
              {link.label}
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
            </Link>
          ))}
        </nav>
        <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn btn-primary mt-6 w-full py-4">
          Empezar un proyecto <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}
