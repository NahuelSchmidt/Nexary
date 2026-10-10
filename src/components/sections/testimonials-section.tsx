"use client";

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { testimonials } from '@/lib/testimonials';
import { projects } from '@/lib/projects';
import SectionHeading from '@/components/layout/section-heading';
import SpotlightCard from '@/components/effects/spotlight-card';
import Reveal from '@/components/effects/reveal';
import { cn } from '@/lib/utils';

const AUTOPLAY_MS = 8000;

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, total]);

  if (total === 0) return null;

  const current = testimonials[active];
  const project = projects.find((p) => p.id === current.projectId);
  const go = (delta: number) => setActive((i) => (i + delta + total) % total);

  return (
    <section id="testimonios" className="relative scroll-mt-24 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Testimonios"
          title={
            <>
              Lo que dicen <span className="text-muted-foreground">quienes ya lo usan.</span>
            </>
          }
          description="Gimnasios y negocios reales que automatizaron su día a día con software que desarrollamos."
        />

        <Reveal>
          <SpotlightCard
            className="rounded-[2rem] p-8 md:p-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span aria-hidden="true" className="pointer-events-none absolute -top-8 right-8 select-none text-[16rem] font-semibold leading-none text-primary/[0.07] md:right-14">
              ”
            </span>

            <figure className="relative min-h-[260px] md:min-h-[230px]">
              <blockquote key={active} className="max-w-4xl animate-fade-in-up text-2xl font-medium leading-snug tracking-[-0.02em] md:text-[2.1rem]">
                “{current.quote}”
              </blockquote>
              <figcaption key={`cap-${active}`} className="mt-10 flex animate-fade-in-up flex-wrap items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-sm text-primary">
                  {initials(current.name)}
                </span>
                <div>
                  <p className="font-semibold">{current.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {current.role}
                    {project && <> · usa {project.title}</>}
                  </p>
                </div>
                {project && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group ml-auto inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    Ver {project.title} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </figcaption>
            </figure>

            {total > 1 && (
              <div className="relative mt-12 border-t border-ink/[0.07] pt-8">
                <span className="absolute -top-px left-0 h-px w-full overflow-hidden">
                  <span
                    key={`bar-${active}`}
                    className="absolute inset-y-0 left-0 bg-primary"
                    style={{ animation: `testimonial-progress ${AUTOPLAY_MS}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                  />
                </span>
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-wrap gap-2" role="tablist" aria-label="Testimonios">
                    {testimonials.map((t, i) => (
                      <button
                        key={i}
                        role="tab"
                        aria-selected={i === active}
                        aria-label={`${t.name}, ${t.role}`}
                        title={`${t.name} · ${t.role}`}
                        onClick={() => setActive(i)}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs transition-all duration-300',
                          i === active
                            ? 'border-primary bg-primary/15 text-primary shadow-[0_0_20px_-4px_hsl(var(--primary)/0.7)]'
                            : 'border-ink/10 text-muted-foreground hover:border-ink/30 hover:text-foreground'
                        )}
                      >
                        {initials(t.name)}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                    <button onClick={() => go(-1)} aria-label="Testimonio anterior" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 transition-colors hover:border-primary hover:text-primary">
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => go(1)} aria-label="Testimonio siguiente" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 transition-colors hover:border-primary hover:text-primary">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </SpotlightCard>
        </Reveal>
      </div>
      <style>{`@keyframes testimonial-progress { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  );
}
