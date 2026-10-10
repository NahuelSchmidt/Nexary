import { Rocket, ShieldCheck, Users, Zap } from 'lucide-react';
import SectionHeading from '@/components/layout/section-heading';
import SpotlightCard from '@/components/effects/spotlight-card';
import Reveal from '@/components/effects/reveal';

const results = [
  { value: '+55%', label: 'consultas comerciales online', client: 'Insumos Mana' },
  { value: '50+', label: 'negocios con turnos automatizados', client: 'Turnify' },
  { value: '+65%', label: 'oportunidades de proyectos', client: 'Portfolio Dev' },
];

const values = [
  { icon: Zap, title: 'Eficiencia', description: 'Eliminamos fricciones operativas. Software que ahorra tiempo real a tu equipo.' },
  { icon: ShieldCheck, title: 'Confiabilidad', description: 'Sistemas robustos y seguros, con tecnología moderna y estable.' },
  { icon: Rocket, title: 'Escalabilidad', description: 'Soluciones que crecen con tu volumen de negocio, sin techo técnico.' },
  { icon: Users, title: 'Enfoque de negocio', description: 'No solo escribimos código: entendemos tus metas y construimos para ellas.' },
];

export default function ValuesSection() {
  return (
    <section id="nosotros" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Por qué Nexary"
          title={
            <>
              Resultados que se <span className="text-primary">miden.</span>
            </>
          }
          description="Creemos en la tecnología como motor de eficiencia. Cada proyecto se diseña alrededor de un objetivo de negocio concreto."
        />

        <div className="grid border-y border-ink/[0.07] md:grid-cols-3">
          {results.map((r, i) => (
            <Reveal
              key={r.label}
              delay={i * 0.1}
              className="border-ink/[0.07] py-10 md:px-8 md:py-14 [&:not(:first-child)]:border-t md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-t-0 md:first:pl-0"
            >
              <p className="text-6xl font-semibold tracking-[-0.05em] text-foreground md:text-7xl">{r.value}</p>
              <p className="mt-4 text-muted-foreground">{r.label}</p>
              <p className="mt-2 font-mono text-xs text-primary">{r.client}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <SpotlightCard className="h-full p-6">
                <v.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
