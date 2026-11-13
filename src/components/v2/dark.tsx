import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Eye, MessagesSquare, MousePointerClick } from 'lucide-react';
import Reveal from '@/components/effects/reveal';
import ShowcaseVideo from '@/components/v2/showcase-video';
import { DrawLines } from '@/components/v2/scenes';
import { BlurWords, Magnetic } from '@/components/v2/interact';
import HeroTyper from '@/components/v2/hero-typer';
import { projects } from '@/lib/projects';
import { whatsAppLink } from '@/lib/site';

const Lines = ({ widths }: { widths: number[] }) => (
  <div className="flex flex-col items-center gap-16">
    {widths.map((w, i) => (
      <div key={i} className="v2-line" style={{ width: `${w}%`, opacity: 1 - i * 0.12 }} />
    ))}
  </div>
);

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="v2-rays">
        <div className="v2-ray d" />
        <div className="v2-ray a" />
        <div className="v2-ray b" />
        <div className="v2-ray c" />
        <div className="v2-rays-dots" />
      </div>
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
        <h1 className="min-h-[3.1em] text-[clamp(2.4rem,10.5vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] md:min-h-0">
          <BlurWords lines={[['Tu', 'negocio,']]} accentFrom={[9, 0]} />
          <span className="block">
            <span className="v2-in" style={{ animationDelay: '0.33s' }}>
              en&nbsp;
            </span>
            <span className="v2-in" style={{ animationDelay: '0.42s' }}>
              <HeroTyper phrases={['piloto automático.', 'orden.', 'marcha.', 'un solo sistema.']} />
            </span>
          </span>
        </h1>
        <div className="mt-10 w-full max-w-3xl">
          <div className="v2-line v2-draw" style={{ animationDelay: '0.7s' }} />
          <p className="v2-in py-3 text-base text-white/85 md:text-lg" style={{ animationDelay: '0.85s' }}>
            Sistemas de gestión, SaaS, aplicaciones web y sitios. Todo a medida.
          </p>
          <div className="v2-line v2-draw" style={{ animationDelay: '0.8s' }} />
        </div>
        <div className="v2-in mt-8" style={{ animationDelay: '1.05s' }}>
          <Magnetic>
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-primary px-6 py-3.5 text-base font-medium text-black shadow-[0_10px_40px_-10px_rgba(34,197,94,0.7)]"
            >
              Contanos tu idea
            </a>
          </Magnetic>
        </div>
        <div className="mt-16 w-full max-w-xl">
          <DrawLines widths={[100, 60]} />
        </div>
      </div>
    </section>
  );
}

export function Showcase() {
  return (
    <section className="bg-black pb-10 text-white">
      <Reveal className="mx-auto w-[88vw] max-w-[1110px] md:w-[77vw]">
        <ShowcaseVideo />
      </Reveal>
      <div className="mx-auto mt-20 max-w-md px-6">
        <DrawLines widths={[100, 70, 45, 30]} />
      </div>
      {/* keep-scrolling cue: the page never looks like it stopped */}
      <div className="mt-14 flex flex-col items-center gap-4 pb-6 text-white/60">
        <div className="v2-mouse hidden md:block" aria-hidden="true" />
        <ChevronDown className="v2-bounce h-7 w-7 text-primary md:hidden" aria-hidden="true" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em]">Seguí bajando</span>
        <ChevronDown className="v2-bounce hidden h-5 w-5 text-primary md:block" aria-hidden="true" style={{ animationDelay: '0.2s' }} />
      </div>
    </section>
  );
}

export function Experience() {
  const icons = [
    { Icon: MousePointerClick, color: '#22c55e', label: 'Fácil de usar' },
    { Icon: Eye, color: '#2dd4bf', label: 'Todo a la vista' },
    { Icon: MessagesSquare, color: '#a3e635', label: 'Conectado con WhatsApp' },
  ];
  return (
    <section className="bg-black py-28 text-white md:py-40">
      <div className="mx-auto max-w-[1100px] px-6 text-center">
        <Reveal as="h2" className="text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
          Pensado para
          <br />
          cada negocio
        </Reveal>
        <div className="mt-20 grid grid-cols-3 gap-6">
          {icons.map(({ Icon, color, label }, i) => (
            <Reveal key={label} delay={i * 0.12} className="flex flex-col items-center gap-6">
              <Icon className="v2-neon h-20 w-20 md:h-32 md:w-32" strokeWidth={1.1} style={{ color }} />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">{label}</span>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-40 max-w-2xl space-y-8 text-lg leading-relaxed text-white/90 md:text-xl">
          <p>
            Nexary es una agencia de software argentina. Diseñamos y desarrollamos sistemas de gestión, SaaS, aplicaciones web y sitios para
            empresas y emprendedores.
          </p>
          <p>
            Ya hay <span className="text-primary">{projects.length} proyectos</span> nuestros funcionando: gimnasios, complejos deportivos,
            comercios, agendas de turnos y más. Cada uno arranca igual: entendiendo tu negocio antes de escribir una línea de código.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Statement() {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white md:py-36">
      <div className="v2-dots pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-24 px-6 md:grid-cols-2">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <div className="relative h-40 w-40">
            <div className="v2-orb-ring absolute inset-0 rounded-full" />
            <div className="absolute inset-3 rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(34,197,94,0.25),transparent_70%)]" />
            <div className="v2-dot-sphere absolute inset-4" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            Hecho
            <br />
            al detalle
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[560px]">
          <div className="v2-ring absolute -left-6 top-1/2 h-[120%] w-[55%] -translate-y-1/2 rounded-full" />
          <div className="v2-ring absolute left-[8%] top-1/2 h-[120%] w-[55%] -translate-y-1/2 rounded-full opacity-60" />
          <div className="v2-pill relative rounded-full px-8 py-10 text-center text-[clamp(1.6rem,3.4vw,2.8rem)] font-medium uppercase leading-[1.05] tracking-[-0.02em]">
            Diseñamos &amp;
            <br />
            desarrollamos
            <br />
            tu sistema
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const Cube = ({ size, delay = 0 }: { size: number; delay?: number }) => (
  <div className="v2-cube-wrap" style={{ width: size, height: size }}>
    <div className="v2-cube h-full w-full" style={{ ['--h' as string]: `${size / 2}px`, animationDelay: `${delay}s` }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  </div>
);

export function Products() {
  const names = ['NexaGym', 'Turnify', 'SportNex', 'Stock y Ventas', 'Insumos Mana'];
  return (
    <section className="overflow-hidden bg-[#070908] py-28 text-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6">
        <Cube size={56} />
        <Cube size={72} delay={-4} />
        <Cube size={96} delay={-8} />
      </div>
      <div className="relative my-14 flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-16 whitespace-nowrap pr-16 text-[clamp(2rem,4.5vw,3.6rem)] font-medium tracking-[-0.04em]">
          {[0, 1].map((k) => (
            <span key={k} className="flex items-center gap-16">
              <span className="text-white/60">Ya funcionan con Nexary</span>
              {names.map((n) => (
                <span key={n + k} className="flex items-center gap-16">
                  <span>{n}</span>
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
              ))}
              <span className="v2-grad-text">…y tu negocio</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6">
        <Cube size={64} delay={-2} />
        <Cube size={80} delay={-6} />
        <Cube size={104} delay={-10} />
      </div>
    </section>
  );
}

export function Collage() {
  const shots = projects.slice(0, 8);
  const spots = [
    'left-[2%] top-[4%] w-[30%] -rotate-[8deg]',
    'left-[36%] top-[0%] w-[26%] rotate-[4deg]',
    'right-[2%] top-[6%] w-[28%] rotate-[10deg]',
    'left-[0%] top-[44%] w-[24%] rotate-[6deg]',
    'right-[0%] top-[46%] w-[26%] -rotate-[7deg]',
    'left-[8%] bottom-[2%] w-[28%] -rotate-[4deg]',
    'left-[40%] bottom-[0%] w-[24%] rotate-[3deg]',
    'right-[6%] bottom-[4%] w-[28%] rotate-[8deg]',
  ];
  return (
    <section id="proyectos" className="relative scroll-mt-20 overflow-hidden bg-[#070908] py-20 text-white">
      <div className="relative mx-auto h-[min(110vw,880px)] max-w-[1300px]">
        {shots.map((p, i) => (
          <a
            key={p.id}
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`v2-float absolute overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-transform hover:scale-[1.04] ${spots[i]}`}
            style={{ animationDelay: `${-i * 0.9}s` }}
            title={p.title}
          >
            <Image src={p.imageUrl} alt={p.title} width={800} height={500} className="aspect-[16/10] w-full object-cover object-top" />
          </a>
        ))}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="pointer-events-auto text-center">
            <h2 className="text-[clamp(2.2rem,5.5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.045em] drop-shadow-[0_6px_30px_rgba(0,0,0,0.9)]">
              Diseños que se usan
              <br />
              todos los días.
            </h2>
            <Link href="/portfolio" className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-black">
              Ver proyectos <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
