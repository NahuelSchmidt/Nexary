'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { LogoMark } from '@/components/layout/logo';
import { whatsAppLink } from '@/lib/site';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#proceso', label: 'Cómo trabajamos' },
  { href: '/#faq', label: 'Preguntas' },
];

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'bg-black/70 backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-white">
            <LogoMark className="h-7 w-7" />
            Nexary<span className="text-primary">.</span>
          </Link>
          <div className="flex items-center gap-5">
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/90 transition-colors hover:text-primary">
              <WhatsAppIcon className="h-6 w-6" />
            </a>
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5 sm:inline-block"
            >
              Tengo una idea
            </a>
            <button aria-label="Abrir menú" onClick={() => setOpen(true)} className="flex h-10 w-10 flex-col items-center justify-center gap-[7px]">
              <span className="block h-[2px] w-7 bg-white" />
              <span className="block h-[2px] w-7 bg-white" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-[60] flex flex-col bg-black text-white transition-opacity duration-500',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="v2-corner-glow pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-60" />
        <div className="relative mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-6 md:px-10">
          <span className="flex items-center gap-2.5 text-lg font-semibold">
            <LogoMark className="h-7 w-7" />
            Nexary<span className="text-primary">.</span>
          </span>
          <button aria-label="Cerrar menú" onClick={() => setOpen(false)}>
            <X className="h-8 w-8" />
          </button>
        </div>
        <nav className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center gap-4 px-6 md:px-10">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-5 text-5xl font-semibold tracking-[-0.04em] md:text-7xl"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <span className="transition-colors group-hover:text-primary">{l.label}</span>
            </Link>
          ))}
          <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex w-fit items-center gap-3 rounded-md bg-primary px-6 py-4 text-base font-medium text-black">
            <WhatsAppIcon className="h-5 w-5" /> Hablemos por WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
}
