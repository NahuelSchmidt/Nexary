import { Laptop, LayoutDashboard, Zap, ShieldCheck, type LucideIcon } from 'lucide-react';
import SpotlightCard from '@/components/effects/spotlight-card';
import Reveal from '@/components/effects/reveal';
import SectionHeading from '@/components/layout/section-heading';
import { cn } from '@/lib/utils';

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  className: string;
  visual?: 'browser' | 'flow' | 'scores' | 'uptime';
};

const services: Service[] = [
  {
    icon: LayoutDashboard,
    title: 'Sistemas de gestión a medida',
    description:
      'Paneles administrativos y herramientas internas que centralizan tu información y te permiten controlar toda la operación en un solo lugar.',
    tags: ['Dashboards', 'Roles y permisos', 'Reportes'],
    className: 'md:col-span-4',
    visual: 'browser',
  },
  {
    icon: Laptop,
    title: 'Plataformas web',
    description: 'Sitios rápidos y seguros que proyectan profesionalismo y convierten visitas en oportunidades reales.',
    tags: ['SEO', 'Performance'],
    className: 'md:col-span-2',
    visual: 'scores',
  },
  {
    icon: ShieldCheck,
    title: 'Software escalable',
    description: 'Arquitectura moderna que crece al mismo ritmo que tu empresa, sin límites técnicos.',
    tags: ['Cloud', 'Seguridad'],
    className: 'md:col-span-2',
    visual: 'uptime',
  },
  {
    icon: Zap,
    title: 'Automatización de procesos',
    description:
      'Eliminamos tareas manuales repetitivas con flujos inteligentes: cobros, recordatorios, reservas y notificaciones que funcionan solos.',
    tags: ['WhatsApp', 'Integraciones', 'APIs'],
    className: 'md:col-span-4',
    visual: 'flow',
  },
];

function BrowserVisual() {
  const bars = [38, 56, 44, 72, 60, 88, 76];
  return (
    <div className="mt-8 rounded-xl border border-ink/10 bg-well p-4">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-primary/80" />
        <span className="ml-3 font-mono text-[10px] text-muted-foreground">panel.tuempresa.com</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          ['Ventas del mes', '$4.8M', '+18%'],
          ['Clientes activos', '386', '+24'],
          ['Tareas automatizadas', '1.284', '+32%'],
        ].map(([label, value, delta]) => (
          <div key={label} className="rounded-lg border border-ink/[0.06] bg-ink/[0.02] p-3">
            <p className="truncate font-mono text-[10px] text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg font-semibold tracking-tight">{value}</p>
            <p className="font-mono text-[10px] text-primary">{delta}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 origin-bottom rounded-sm bg-primary/30 transition-all duration-500 group-hover:bg-primary/60"
            style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function FlowVisual() {
  const steps = ['Nuevo cliente', 'Cobro automático', 'Aviso por WhatsApp', 'Reporte diario'];
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[11px]">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span
            className={cn(
              'rounded-full border px-3 py-1.5 transition-colors duration-500',
              i === 0 ? 'border-primary/50 bg-primary/10 text-primary' : 'border-ink/10 text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground'
            )}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {step}
          </span>
          {i < steps.length - 1 && <span className="h-px w-5 bg-gradient-to-r from-primary/60 to-ink/10" />}
        </div>
      ))}
    </div>
  );
}

function ScoresVisual() {
  const scores = [
    ['Performance', 100],
    ['SEO', 100],
    ['Accesibilidad', 98],
  ] as const;
  return (
    <div className="mt-8 grid grid-cols-3 gap-2">
      {scores.map(([label, value]) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgb(var(--ink) / 0.08)" strokeWidth="2.5" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${(value / 100) * 97.4} 97.4`}
            />
            <text x="18" y="18" textAnchor="middle" dominantBaseline="central" transform="rotate(90 18 18)" className="fill-foreground font-mono text-[9px]">
              {value}
            </text>
          </svg>
          <span className="text-center font-mono text-[10px] text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}

function UptimeVisual() {
  return (
    <div className="mt-8 rounded-xl border border-ink/10 bg-well p-4">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] text-muted-foreground">Uptime 90 días</span>
        <span className="text-lg font-semibold tracking-tight">99.9%</span>
      </div>
      <div className="mt-3 flex h-6 gap-[3px]">
        {Array.from({ length: 30 }, (_, i) => (
          <span key={i} className={cn('flex-1 rounded-[2px]', i === 17 ? 'bg-primary/40' : 'bg-primary/80')} />
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="servicios" className="relative scroll-mt-24 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="Servicios"
          title={
            <>
              Tecnología que resuelve <span className="text-muted-foreground">problemas reales.</span>
            </>
          }
          description="Nos enfocamos en los cuellos de botella de tu operación con software robusto, escalable y fácil de usar."
        />

        <div className="grid gap-4 md:grid-cols-6">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 2) * 0.1} className={service.className}>
              <SpotlightCard className="group flex h-full flex-col p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60">0{i + 1}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight md:text-2xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{service.description}</p>
                {service.visual === 'browser' && <BrowserVisual />}
                {service.visual === 'flow' && <FlowVisual />}
                {service.visual === 'scores' && <ScoresVisual />}
                {service.visual === 'uptime' && <UptimeVisual />}
                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  {service.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
