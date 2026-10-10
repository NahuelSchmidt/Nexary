"use client";

import { useEffect, useRef } from 'react';
import SectionHeading from '@/components/layout/section-heading';
import Reveal from '@/components/effects/reveal';

const steps = [
  {
    title: 'Descubrimiento',
    description: 'Entendemos tu negocio, tus procesos y dónde se pierde tiempo o dinero.',
    meta: 'Semana 1',
  },
  {
    title: 'Diseño',
    description: 'Prototipamos la solución y la validamos con vos antes de escribir código.',
    meta: 'Semana 2',
  },
  {
    title: 'Desarrollo',
    description: 'Construimos en entregas cortas para que veas avances reales cada semana.',
    meta: 'Semanas 3 a 6',
  },
  {
    title: 'Lanzamiento y soporte',
    description: 'Ponemos el sistema en producción, capacitamos a tu equipo y lo acompañamos.',
    meta: 'Continuo',
  },
];

export default function ProcessSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  // Grow the vertical line as the list scrolls through the viewport
  useEffect(() => {
    const onScroll = () => {
      const list = listRef.current;
      const line = lineRef.current;
      if (!list || !line) return;
      const b = list.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - b.top) / b.height));
      line.style.transform = `scaleY(${progress})`;
      list.querySelectorAll<HTMLElement>('[data-step]').forEach((el) => {
        const top = el.getBoundingClientRect().top;
        el.dataset.active = top < window.innerHeight * 0.6 ? 'true' : 'false';
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="proceso" className="relative scroll-mt-24 py-24 md:py-36">
      <div className="container-x grid gap-4 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <SectionHeading
              index="03"
              label="Proceso"
              title={
                <>
                  De la idea al sistema <span className="text-muted-foreground">en semanas.</span>
                </>
              }
              description="Un proceso claro y transparente. Sabés en qué etapa estamos y qué viene después."
              className="md:mb-0"
            />
          </div>
        </div>

        <ol ref={listRef} className="relative md:col-span-6 md:col-start-7">
          <span className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-ink/10" />
          <span
            ref={lineRef}
            className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px origin-top scale-y-0 bg-gradient-to-b from-primary via-primary to-primary/0 transition-transform duration-150"
          />
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={0.05} className="group relative pb-14 pl-16 last:pb-0">
              <div data-step data-active="false" className="peer">
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-background font-mono text-xs text-muted-foreground transition-all duration-500 [[data-active=true]_&]:border-primary [[data-active=true]_&]:text-primary [[data-active=true]_&]:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.7)]">
                  0{i + 1}
                </span>
                <p className="font-mono text-xs text-muted-foreground">{step.meta}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
