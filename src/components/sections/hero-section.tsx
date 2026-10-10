import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ParticleSphere from '@/components/effects/particle-sphere';
import Magnetic from '@/components/effects/magnetic';
import Reveal from '@/components/effects/reveal';
import { whatsAppLink } from '@/lib/site';
import { projects } from '@/lib/projects';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(ellipse_60%_50%_at_50%_110%,hsl(var(--primary)/0.14),transparent_70%)]" />
      <ParticleSphere className="absolute inset-0 h-full w-full" />

      <div className="container-x relative z-10 pb-[360px] pt-32 md:pb-24 md:pt-28">
        <div className="max-w-[580px]">
          <Reveal as="p" className="eyebrow">
            {'// Nexary studio — software a medida'}
          </Reveal>
          <Reveal
            as="h1"
            delay={0.12}
            className="mt-6 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[4.4rem]"
          >
            Construimos el sistema que tu empresa <span className="text-primary">necesita.</span>
          </Reveal>
          <Reveal as="p" delay={0.24} className="mt-6 max-w-[470px] text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            Plataformas web, paneles de gestión y automatización de procesos. Del Excel a un software que trabaja por vos.
          </Reveal>
          <Reveal delay={0.36} className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Empezar proyecto <ArrowRight className="arrow h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <Link href="#proyectos" className="btn btn-ghost">
                Ver proyectos
              </Link>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.5} className="mt-14 flex flex-wrap gap-x-7 gap-y-2 font-mono text-xs text-muted-foreground/70">
            <span>
              <b className="font-medium text-foreground">{projects.length}+</b> sistemas
            </span>
            <span>
              <b className="font-medium text-foreground">Next.js</b> · React · Node
            </span>
            <span>
              <b className="font-medium text-foreground">La Plata</b>, AR
            </span>
          </Reveal>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-8 hidden flex-col gap-3 font-mono text-[11px] text-muted-foreground/60 md:flex">
        <span>SCROLL</span>
        <span className="h-9 w-px origin-top animate-[scroll-line_2s_ease-in-out_infinite] bg-gradient-to-b from-primary to-transparent" />
      </div>
      <style>{`@keyframes scroll-line { 0% { transform: scaleY(0) } 50% { transform: scaleY(1) } 100% { transform: scaleY(1); opacity: 0 } }`}</style>
    </section>
  );
}
