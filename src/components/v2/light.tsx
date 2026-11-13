import { ChevronRight, Check, Plus } from 'lucide-react';
import Reveal from '@/components/effects/reveal';
import { testimonials } from '@/lib/testimonials';
import { RiseText, ZoomScene } from '@/components/v2/scenes';
import { MockBuild, MockChat, MockLaunch, MockProposal } from '@/components/v2/mocks';
import { Magnetic, SpotCard } from '@/components/v2/interact';
import { whatsAppLink } from '@/lib/site';

const Btn = ({ children = 'Agendá una charla' }: { children?: React.ReactNode }) => (
  <Magnetic>
    <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="inline-block rounded-md bg-primary px-5 py-3 text-sm font-medium text-black shadow-[0_10px_40px_-12px_rgba(34,197,94,0.7)]">
      {children}
    </a>
  </Magnetic>
);

export function Challenge() {
  return (
    <>
      <ZoomScene />
      <section className="v2-light">
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-10 px-6 py-32 text-center">
          <RiseText text={'El próximo sistema,\nlo construimos con vos.'} className="text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.045em]" />
          <Btn />
        </div>
      </section>
    </>
  );
}

const SERVICES = [
  {
    title: 'Sistemas de gestión',
    text: 'Paneles a medida que centralizan tu operación: stock, ventas, turnos, cobros y reportes en un solo lugar.',
    links: ['Gestión y administración', 'Stock, ventas y caja', 'Turnos y reservas'],
  },
  {
    title: 'Sitios web',
    text: 'Sitios rápidos y seguros que proyectan profesionalismo y convierten visitas en oportunidades reales.',
    links: ['Landings y sitios a medida', 'Catálogos online'],
  },
  {
    title: 'SaaS y aplicaciones',
    text: 'Productos web que crecen con vos: desde la primera versión hasta las funciones que pide tu negocio.',
    links: ['Plataformas SaaS', 'Aplicaciones web'],
  },
  {
    title: 'Automatización',
    text: 'Eliminamos tareas repetitivas con flujos que trabajan solos: cobros, recordatorios, reservas y avisos.',
    links: ['Avisos por WhatsApp', 'Integraciones y cobros'],
  },
];

export function Services() {
  return (
    <section id="servicios" className="v2-light scroll-mt-20 py-28 md:py-36">
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal className="text-center">
          <RiseText
            text={'Sistemas, sitios y automatización.\nA medida, de punta a punta.'}
            accent={['A', 'medida,', 'de', 'punta', 'a', 'punta.']}
            className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-tight tracking-[-0.035em]"
          />
          <p className="mx-auto mt-5 max-w-xl text-black/55">
            Desde el primer sistema hasta los proyectos más grandes. Primero entendemos tu negocio, después te proponemos la solución.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
             <SpotCard className="v2-card-light flex h-full flex-col rounded-2xl p-7 transition-colors md:p-8">
              <div className="flex items-center gap-2.5 text-lg font-medium">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {s.title}
              </div>
              <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-black/55">{s.text}</p>
              <div className="mt-6 divide-y divide-black/5 border-t border-black/5">
                {s.links.map((l) => (
                  <a key={l} href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-3.5 text-sm text-black/75 hover:text-black">
                    {l}
                    <ChevronRight className="h-4 w-4 text-black/30 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </a>
                ))}
              </div>
             </SpotCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { title: 'Descubrimiento', text: 'Entendemos tu negocio, tus procesos y dónde se pierde tiempo o dinero.', Mock: MockChat },
  { title: 'Diseño', text: 'Prototipamos la solución y la validamos con vos antes de escribir código.', Mock: MockProposal },
  { title: 'Desarrollo', text: 'Construimos en entregas cortas para que veas avances reales cada semana.', Mock: MockBuild },
  { title: 'Lanzamiento', text: 'Ponemos el sistema en producción, capacitamos a tu equipo y lo acompañamos.', Mock: MockLaunch },
];

export function Process() {
  return (
    <section id="proceso" className="v2-light scroll-mt-20 py-28 md:py-36">
      <div className="mx-auto grid max-w-[1100px] gap-12 px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <RiseText text={'Cómo\ntrabajamos'} accent={['trabajamos']} className="text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em]" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-black/55">Un proceso claro: sabés en qué etapa estamos y qué viene después.</p>
          </div>
        </div>
        <div className="space-y-16 md:col-span-8">
          {STEPS.map(({ title, text, Mock }, i) => (
            <Reveal key={title}>
              <div className="flex items-center gap-3 text-base font-medium">
                <span className="grid h-6 w-6 place-items-center rounded-md border border-black/10 text-xs">{i + 1}</span>
                {title}
              </div>
              <p className="mt-2 text-sm text-black/55">{text}</p>
              <div className="mt-6 h-56">
                <Mock />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Voices() {
  const picks = testimonials.slice(0, 1).concat(testimonials.filter((t) => t.projectId === 'turnos-ya').slice(0, 2));
  return (
    <section className="v2-light py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="text-center">
          <RiseText text="Lo que dicen nuestros clientes" accent={['nuestros', 'clientes']} className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium tracking-[-0.035em]" />
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {picks.map((t, i) => (
            <Reveal key={t.name + i} delay={i * 0.06} className="v2-card-light flex flex-col justify-between rounded-2xl p-7">
              <p className="text-[15px] leading-relaxed">“{t.quote}”</p>
              <p className="mt-6 text-sm">
                <span className="font-medium">{t.name}</span> <span className="text-black/45">· {t.role}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  ['¿Qué tipo de proyectos hacen?', 'Sistemas de gestión, plataformas SaaS, aplicaciones web, sitios y automatizaciones. Todo a medida de cómo trabaja tu negocio.'],
  ['¿Trabajan con negocios chicos?', 'Sí. Tenemos sistemas funcionando en gimnasios, complejos deportivos, comercios y negocios que trabajan con turnos.'],
  ['¿Cómo arrancamos?', 'Nos escribís por WhatsApp, charlamos sobre tu negocio y te proponemos una solución. Sin compromiso.'],
  ['¿Cuánto cuesta un sistema a medida?', 'Depende de lo que necesites. Primero entendemos tu caso y después te pasamos un presupuesto acorde al alcance.'],
  ['¿Voy a ver avances durante el desarrollo?', 'Sí. Trabajamos en entregas cortas para que veas avances reales cada semana.'],
  ['¿Qué pasa después del lanzamiento?', 'Ponemos el sistema en producción, capacitamos a tu equipo y lo seguimos acompañando.'],
];

export function Faq() {
  return (
    <section id="faq" className="v2-light scroll-mt-20 py-28">
      <div className="mx-auto grid max-w-[1100px] gap-12 px-6 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em]">
            Tus preguntas,
            <br />
            <span className="text-primary">nuestras respuestas</span>
          </h2>
        </Reveal>
        <div className="md:col-span-8">
          {FAQ.map(([q, a]) => (
            <details key={q} className="v2-faq group border-b border-black/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[15px]">
                {q}
                <Plus className="v2-plus h-4 w-4 shrink-0 text-black/50 transition-transform" />
              </summary>
              <p className="pb-6 pr-10 text-sm leading-relaxed text-black/60">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="v2-rays">
        <div className="v2-ray d" />
        <div className="v2-ray a" />
        <div className="v2-ray b" />
        <div className="v2-ray c" />
        <div className="v2-rays-dots" />
      </div>
      <div className="relative mx-auto flex min-h-[80vh] max-w-[1200px] flex-col items-center justify-center px-6 py-32 text-center">
        <h2 className="text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          ¿Y vos, estás listo
          <br />
          para <span className="v2-grad-text">crear tu sistema?</span>
        </h2>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/70">
          {['Respuesta por WhatsApp', 'Sin compromiso', 'Hecho a medida'].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> {t}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Btn>Hablemos por WhatsApp</Btn>
        </div>
      </div>
    </section>
  );
}
