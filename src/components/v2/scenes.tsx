'use client';

// Scroll scenes: pinned (sticky) sections whose animation is driven by scroll progress.
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, Eye, MessagesSquare, MousePointerClick } from 'lucide-react';
import { customProjects, saasProjects } from '@/lib/projects';
import { useEffect, useRef, useState } from 'react';
import { clamp01, easeInOut, easeOut, lerp, seg, useProgress } from './use-progress';
import { keyClick } from './keys';

/** Words rise out of a mask, one after the other, as the block scrolls into view. */
export function RiseText({ text, className, accent, as: Tag = 'h2' }: { text: string; className?: string; accent?: string[]; as?: 'h2' | 'p' | 'span' }) {
  const [ref, p] = useProgress<HTMLDivElement>('enter', { endAt: 0.45 });
  const lines = text.split('\n');
  const total = text.split(/\s+/).length;
  let k = 0;
  return (
    <div ref={ref}>
      <Tag className={className}>
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(' ').map((w, wi) => {
              const t = easeOut(seg(p, (k / total) * 0.6, (k / total) * 0.6 + 0.4));
              k++;
              return (
                <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span
                    className={`inline-block ${accent?.includes(w) ? 'text-primary' : ''}`}
                    style={{ transform: `translateY(${(1 - t) * 105}%)`, opacity: 0.2 + t * 0.8 }}
                  >
                    {w}
                    {wi < line.split(' ').length - 1 ? ' ' : ''}
                  </span>
                </span>
              );
            })}
          </span>
        ))}
      </Tag>
    </div>
  );
}

/** Lines that draw themselves from the center as they scroll in. */
export function DrawLines({ widths, dashes = false }: { widths: number[]; dashes?: boolean }) {
  const [ref, p] = useProgress<HTMLDivElement>('enter', { endAt: 0.2 });
  return (
    <div ref={ref} className="flex flex-col items-center gap-16">
      {widths.map((w, i) => (
        <div key={i} className="v2-line" style={{ width: `${w}%`, transform: `scaleX(${easeOut(seg(p, i * 0.12, 0.45 + i * 0.12))})`, opacity: 1 - i * 0.12 }} />
      ))}
      {dashes && (
        <div className="flex flex-col items-center gap-3">
          {[40, 32, 26, 20, 16, 12].map((h, i) => (
            <span key={i} className="w-px bg-primary/60" style={{ height: h, opacity: seg(p, 0.45 + i * 0.07, 0.6 + i * 0.07) * (1 - i * 0.12) }} />
          ))}
        </div>
      )}
    </div>
  );
}

/** The showcase card grows toward full width as you scroll down from the hero. */
export function Grow({ children }: { children: React.ReactNode }) {
  const [ref, p] = useProgress<HTMLDivElement>('enter', { endAt: 0.05 });
  const t = easeOut(p);
  return (
    <div ref={ref} style={{ transform: `translateY(${(1 - t) * 60}px) scale(${lerp(0.62, 1, t)})`, transformOrigin: '50% 0%' }}>
      {children}
    </div>
  );
}

const Pinned = ({ vh, children, className = '', innerRef }: { vh: number; children: React.ReactNode; className?: string; innerRef: React.Ref<HTMLDivElement> }) => (
  <section ref={innerRef} className={`relative ${className}`} style={{ height: `${vh}vh` }}>
    <div className="sticky top-0 h-[100svh] overflow-hidden">{children}</div>
  </section>
);

/** "Hecho al detalle": the text holds while the dotted orb travels around it. */
export function OrbScene() {
  const [ref, p] = useProgress<HTMLDivElement>('pinned');
  const t = easeInOut(p);
  const x = lerp(76, 26, t);
  const y = lerp(16, 80, t) - Math.sin(t * Math.PI) * 6;
  const s = lerp(0.8, 1.15, Math.sin(t * Math.PI));
  return (
    <Pinned vh={260} innerRef={ref} className="bg-black text-white">
      <div className="v2-dots absolute inset-0 opacity-[0.14]" />
      <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%,-50%) scale(${s})` }}>
        <div className="relative h-36 w-36 md:h-72 md:w-72">
          <div className="v2-orb-ring absolute inset-0 rounded-full" />
          <div className="absolute inset-3 rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(34,197,94,0.25),transparent_70%)]" />
          <div className="v2-dot-sphere absolute inset-4" style={{ backgroundPosition: `${p * 400}px 0` }} />
        </div>
      </div>
      <div className="relative grid h-full place-items-center">
        <h2 className="text-center text-[clamp(2.4rem,5.5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.045em]" style={{ opacity: seg(p, 0, 0.12) }}>
          Hecho
          <br />
          al detalle
        </h2>
      </div>
    </Pinned>
  );
}

/** "Diseñamos & desarrollamos tu sistema": typed out while the pill and its rings grow. */
export function PillScene() {
  const [ref, p] = useProgress<HTMLDivElement>('pinned');
  const lines = ['DISEÑAMOS &', 'DESARROLLAMOS', 'TU SISTEMA'];
  const total = lines.join('').length;
  // Typed by the scroll: always finished before the section moves on (silent: the key sound lives only in the hero).
  const typed = Math.floor(seg(p, 0.06, 0.55) * total);
  const active = p > 0.0;
  const done = typed >= total;
  const grow = easeOut(seg(p, 0.4, 0.85));
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);
  let used = 0;
  return (
    <Pinned vh={260} innerRef={ref} className="bg-black text-white">
      <div className="relative grid h-full place-items-center px-6">
        <div className="relative w-full max-w-[760px]" data-done={done}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="v2-ring absolute top-1/2 rounded-full"
              style={{
                left: `${lerp(30, -4 + i * 10, grow)}%`,
                width: `${lerp(22, 52, grow)}%`,
                aspectRatio: '1',
                transform: `translateY(-50%) scale(${lerp(0.6, 1, grow)})`,
                opacity: seg(p, 0.05 + i * 0.08, 0.25 + i * 0.08) * (1 - i * 0.25),
              }}
            />
          ))}
          <div
            className="v2-pill relative mx-auto rounded-full px-8 py-12 text-center text-[clamp(1.8rem,4.2vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            style={{ width: `${lerp(36, 100, grow)}%`, opacity: seg(p, 0.35, 0.55) * 0.99 + 0.01 }}
          />
          <div className="absolute inset-0 grid place-items-center text-center text-[clamp(1.8rem,4.2vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em]">
            <div>
              {lines.map((l, li) => {
                const shown = Math.max(0, Math.min(l.length, typed - used));
                used += l.length;
                const lineStart = used - l.length;
                const caret = active && (typed < total ? typed >= lineStart && typed < lineStart + l.length + (li === lines.length - 1 ? 1 : 0) && (shown < l.length || li === lines.length - 1) : li === lines.length - 1 && blink);
                return (
                  <div key={li} className="whitespace-pre">
                    {l.slice(0, shown)}
                    {caret && <span className="ml-1 inline-block h-[0.9em] w-[0.08em] translate-y-[0.1em] bg-lime-300" style={{ opacity: (typed > 0 && typed < total) || blink ? 1 : 0 }} />}
                    <span className="opacity-0">{l.slice(shown)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Pinned>
  );
}

/** "Pensado para cada negocio": the title rises and the neon icons come up one by one. */
export function ExperienceScene() {
  const [ref, p] = useProgress<HTMLDivElement>('pinned');
  const lift = easeInOut(seg(p, 0.15, 0.5));
  const icons = [
    { Icon: MousePointerClick, color: '#22c55e', label: 'Fácil de usar' },
    { Icon: Eye, color: '#2dd4bf', label: 'Todo a la vista' },
    { Icon: MessagesSquare, color: '#a3e635', label: 'Conectado con WhatsApp' },
  ];
  return (
    <Pinned vh={200} innerRef={ref} className="bg-black text-white">
      <div className="relative h-full">
        <h2
          className="absolute inset-x-0 top-1/2 text-center text-[clamp(2.4rem,5.5vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.04em]"
          style={{ transform: `translateY(calc(-50% - ${lift * 26}vh)) scale(${lerp(1.15, 1, lift)})`, opacity: seg(p, 0, 0.1) }}
        >
          Pensado para
          <br />
          cada negocio
        </h2>
        <div className="absolute inset-x-0 top-[52%] mx-auto grid max-w-[1000px] grid-cols-3 gap-6 px-6">
          {icons.map(({ Icon, color, label }, i) => {
            const t = easeOut(seg(p, 0.4 + i * 0.1, 0.62 + i * 0.1));
            return (
              // each one flips in like a card turning over (back face hidden until it faces us)
              <div
                key={label}
                className="flex flex-col items-center gap-6 [backface-visibility:hidden]"
                style={{ transform: `perspective(900px) translateY(${(1 - t) * 60}px) rotateY(${(1 - t) * -180}deg) scale(${0.85 + 0.15 * t})`, opacity: t > 0.02 ? 1 : 0 }}
              >
                <Icon className="v2-neon h-14 w-14 md:h-32 md:w-32" strokeWidth={1.1} style={{ color }} />
                <span className="max-w-[9rem] text-center font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-white/50 md:text-xs md:tracking-[0.2em]">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Pinned>
  );
}


/** Paints the figure ("+100 usuarios", "+10 proyectos"…) in the brand green. */
const Highlight = ({ text }: { text: string }) => {
  const parts = text.split(/(\+?\d+ (?:usuarios|proyectos))/);
  return (
    <>
      {parts.map((t, i) => (i % 2 ? <span key={i} className="text-primary">{t}</span> : <span key={i}>{t}</span>))}
    </>
  );
};

/**
 * The agency paragraph types itself at a human pace once you reach it. Scrolling on pushes it
 * forward (letter by letter, never all at once), so it always finishes before the section ends.
 * The key sound keeps its own natural rhythm while letters are appearing.
 */
export function WordScene({ paragraphs }: { paragraphs: string[] }) {
  const [ref, p] = useProgress<HTMLDivElement>('pinned');
  const total = paragraphs.reduce((n, t) => n + t.length, 0);
  const flat = paragraphs.join('');
  const started = p > 0.02;
  // by time: ~40 letters a second from the moment you arrive
  const [timed, setTimed] = useState(0);
  useEffect(() => {
    if (!started) {
      setTimed(0);
      return;
    }
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      i = Math.min(total, i + 2);
      setTimed(i);
      if (i >= total) return;
      const ch = flat[i - 1];
      t = setTimeout(step, ch === '.' || ch === ':' ? 300 : ch === ',' ? 150 : 42 + Math.random() * 16);
    };
    t = setTimeout(step, 250);
    return () => clearTimeout(t);
  }, [started, total, flat]);
  // by scroll: a floor that reaches the end at 80% of the section
  const scrolled = Math.floor(seg(p, 0.08, 0.8) * total);
  const typed = Math.max(timed, scrolled);
  // the sound: its own steady rhythm (~10 keys/s) while the text is still growing
  const typedRef = useRef(typed);
  typedRef.current = typed;
  useEffect(() => {
    if (!started) return;
    let last = typedRef.current;
    let t: ReturnType<typeof setTimeout>;
    const beat = () => {
      const now = typedRef.current;
      if (now > last && now < total + 1) keyClick(flat[now - 1] === ' ');
      last = now;
      if (now < total) t = setTimeout(beat, 85 + Math.random() * 35);
    };
    t = setTimeout(beat, 250);
    return () => clearTimeout(t);
  }, [started, total, flat]);
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);
  let used = 0;
  return (
    <Pinned vh={220} innerRef={ref} className="bg-black text-white">
      <div className="mx-auto grid h-full max-w-[44rem] place-items-center px-6">
        <div className="space-y-8 text-[1.3rem] leading-relaxed md:text-[1.7rem]">
          {paragraphs.map((t, pi) => {
            const start = used;
            used += t.length;
            const shown = Math.max(0, Math.min(t.length, typed - start));
            const here = typed >= start && (typed < start + t.length || (pi === paragraphs.length - 1 && typed >= total));
            const caret = p > 0.01 && (here || (pi === 0 && typed === 0));
            return (
              <p key={pi}>
                {/* the not-yet-typed rest stays in place, invisible, so nothing reflows while typing */}
                <Highlight text={t.slice(0, shown)} />
                {caret && (
                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block h-[1em] w-[0.08em] translate-y-[0.15em] bg-primary"
                    style={{ opacity: typed < total || blink ? 1 : 0 }}
                  />
                )}
                <span className="opacity-0">
                  <Highlight text={t.slice(shown)} />
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </Pinned>
  );
}

const Cube = ({ size, spin }: { size: number; spin: number }) => (
  <div className="v2-cube-wrap" style={{ width: size, height: size }}>
    <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d', transform: `rotateX(-24deg) rotateY(${spin}deg)` }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="absolute inset-0 border-[1.5px] border-[rgba(134,239,172,0.55)] shadow-[inset_0_0_18px_rgba(34,197,94,0.15)]"
          style={{
            transform: ['translateZ', 'rotateY(180deg) translateZ', 'rotateY(90deg) translateZ', 'rotateY(-90deg) translateZ', 'rotateX(90deg) translateZ', 'rotateX(-90deg) translateZ'][i] + `(${size / 2}px)`,
          }}
        />
      ))}
    </div>
  </div>
);

/** "Ya funcionan con ___": the name changes with the scroll while the cubes turn. */
export function ProductsScene() {
  const [ref, p] = useProgress<HTMLDivElement>('pinned');
  const names = ['NexaGym', 'Turnify', 'SportNex', 'Folium', 'Insumos Mana', 'tu negocio'];
  const idx = Math.min(names.length - 1, Math.floor(seg(p, 0.05, 0.9) * names.length));
  const local = (seg(p, 0.05, 0.9) * names.length) % 1;
  const last = idx === names.length - 1;
  const spin = p * 540;
  return (
    <Pinned vh={280} innerRef={ref} className="text-white" >
      <div className="absolute inset-0 transition-colors duration-700" style={{ background: last ? '#0b120e' : '#070908' }} />
      <div className="relative flex h-full flex-col justify-between py-16">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6">
          <Cube size={56} spin={spin} />
          <Cube size={72} spin={-spin * 0.8} />
          <Cube size={100} spin={spin * 0.6} />
        </div>
        <div className="mx-auto w-full max-w-[1200px] px-6 text-[clamp(2.2rem,5.5vw,4.6rem)] font-medium tracking-[-0.045em]">
          <span className="text-white/60">Ya funcionan con </span>
          <span className="relative inline-block overflow-hidden align-bottom">
            <span
              key={idx}
              className={`inline-block ${last ? 'v2-grad-text' : 'text-primary'}`}
              style={{ transform: `translateY(${(1 - easeOut(Math.min(1, local * 4))) * 100}%)` }}
            >
              {names[idx]}
              {last ? '.' : ''}
            </span>
          </span>
        </div>
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6">
          <Cube size={64} spin={-spin} />
          <Cube size={84} spin={spin * 0.7} />
          <Cube size={108} spin={-spin * 0.5} />
        </div>
      </div>
    </Pinned>
  );
}

/**
 * Subscription products: the list of names stays on the left and one fixed screen on the
 * right; scrolling lights up the next name and the screen slides to that product.
 */
export function SaasScene() {
  const [ref, p] = useProgress<HTMLDivElement>('pinned');
  const items = saasProjects;
  const n = items.length;
  // continuous position 0 → n-1, holding still on each product for the first part of every step
  const raw = seg(p, 0.06, 0.94) * (n - 1);
  const step = Math.min(n - 2, Math.floor(raw));
  const pos = raw >= n - 1 ? n - 1 : step + easeInOut(seg(raw - step, 0.35, 1));
  const current = Math.min(n - 1, Math.round(pos));
  const active = items[current];
  const intro = easeOut(seg(p, 0, 0.06));
  return (
    <Pinned vh={100 + n * 70} innerRef={ref} className="bg-[#070908] text-white">
      <div id="proyectos" className="absolute -top-20" />
      <div
        className="mx-auto grid h-full max-w-[1200px] grid-rows-[auto_auto_1fr] gap-5 px-5 pb-6 pt-20 md:grid-cols-12 md:grid-rows-1 md:items-center md:gap-12 md:px-6 md:pb-10 md:pt-24"
        style={{ opacity: 0.4 + intro * 0.6 }}
      >
        {/* left: heading + product list + details of the active one */}
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Sistemas por suscripción</p>
          <h2 className="mt-2 text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            Productos propios, listos para usar.
          </h2>
          <p className="mt-3 hidden text-sm leading-relaxed text-white/55 md:block">
            Los desarrollamos y mantenemos nosotros. El negocio paga una cuota mensual y los usa desde el primer día, con
            mejoras y soporte incluidos.
          </p>

          <ol className="mt-5 flex gap-2 overflow-x-auto md:mt-8 md:flex-col md:gap-0 md:overflow-visible">
            {items.map((pr, i) => {
              const on = i === current;
              // how far this item's bar has filled while it is the active one
              const fill = i < current ? 1 : on ? (i === n - 1 ? 1 : clamp01(raw - i + 0.0001)) : 0;
              return (
                <li key={pr.id} className="shrink-0 md:border-t md:border-white/10">
                  <div className="relative isolate flex items-baseline gap-3 rounded-full px-3 py-1.5 md:rounded-none md:px-0 md:py-3.5">
                    <span className={`hidden font-mono text-[11px] md:inline ${on ? 'text-primary' : 'text-white/30'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-sm font-medium tracking-[-0.02em] transition-colors duration-500 md:text-[clamp(1.4rem,2.4vw,2rem)] ${
                        on ? 'text-white' : 'text-white/30'
                      }`}
                    >
                      {pr.title}
                    </span>
                    <span className="ml-auto hidden font-mono text-[11px] text-white/35 md:inline">{pr.category.replace('SaaS · ', '')}</span>
                    {/* progress line: a filled pill on phones, a bar under the row on desktop */}
                    <span className={`absolute inset-0 -z-10 rounded-full md:hidden ${on ? 'bg-white/10' : ''}`} />
                    <span className="absolute -top-px left-0 hidden h-px bg-primary md:block" style={{ width: `${fill * 100}%` }} />
                  </div>
                </li>
              );
            })}
          </ol>

          <div key={active.id} className="v2-fade-in mt-4 md:mt-6">
            <p className="text-sm leading-relaxed text-white/65 md:text-base">{active.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={active.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-black"
              >
                Ver demo <ArrowUpRight className="h-4 w-4" />
              </a>
              <ul className="hidden flex-wrap gap-x-4 gap-y-1.5 lg:flex">
                {active.highlights.slice(0, 2).map((h) => (
                  <li key={h} className="flex items-center gap-1.5 text-xs text-white/60">
                    <Check className="h-3.5 w-3.5 text-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* right: one fixed screen whose content slides to the active product */}
        <div className="row-start-2 md:col-span-7 md:row-start-1">
          <div className="overflow-hidden rounded-2xl bg-[#0d1310] shadow-[0_40px_120px_-30px_rgba(34,197,94,0.25)] ring-1 ring-white/10">
            <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-3 truncate rounded-md bg-white/[0.05] px-3 py-0.5 font-mono text-[10px] text-white/50">
                {new URL(active.liveUrl).host.replace('www.', '')}
              </span>
            </div>
            <a href={active.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${active.title}`} className="relative block aspect-[16/10] overflow-hidden">
              {items.map((pr, i) => {
                const d = i - pos; // 0 on screen, 1 the next one waiting below
                if (d < -1 || d > 1) return null;
                return (
                  <div
                    key={pr.id}
                    className="absolute inset-0"
                    style={{
                      transform: `translateY(${d * 100}%) scale(${1 - Math.abs(d) * 0.06})`,
                      filter: `brightness(${1 - Math.min(1, Math.abs(d)) * 0.5})`,
                    }}
                  >
                    <Image src={pr.imageUrl} alt={pr.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover object-top" />
                  </div>
                );
              })}
            </a>
          </div>
        </div>
      </div>
    </Pinned>
  );
}

/** Custom work: the shots fly out from the center to their places around the headline. */
const PHONE_SPOTS = [
  { x: 3, y: 12, w: 46, r: -6 },
  { x: 51, y: 16, w: 46, r: 6 },
  { x: 3, y: 70, w: 46, r: 5 },
  { x: 51, y: 75, w: 46, r: -6 },
];

export function CollageScene() {
  const [ref, p] = useProgress<HTMLDivElement>('pinned');
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const on = () => setPhone(window.innerWidth < 768);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  const shots = customProjects.slice(0, 4);
  const desk = [
    { x: 3, y: 14, w: 29, r: -7 },
    { x: 68, y: 12, w: 29, r: 8 },
    { x: 5, y: 60, w: 28, r: 5 },
    { x: 67, y: 62, w: 29, r: -6 },
  ];
  const spots = phone ? PHONE_SPOTS : desk;
  return (
    <Pinned vh={210} innerRef={ref} className="bg-[#070908] text-white">
      <div className="relative mx-auto h-full max-w-[1400px]">
        {shots.map((pr, i) => {
          const s = spots[i];
          const t = easeOut(seg(p, 0.02 + i * 0.07, 0.45 + i * 0.07));
          const cx = lerp(50 - s.w / 2, s.x, t);
          const cy = lerp(40, s.y, t);
          return (
            <a
              key={pr.id}
              href={pr.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${pr.title}`}
              className="group absolute hover:z-30"
              style={{ left: `${cx}%`, top: `${cy}%`, width: `${s.w}%`, transform: `scale(${lerp(0.5, 1, t)})`, opacity: t }}
            >
              {/* idle float (its own rhythm per card) */}
              <div className="v2-float" style={{ animationDelay: `${-i * 1.3}s`, animationDuration: `${6 + (i % 3)}s` }}>
                {/* the tilt straightens, lifts and grows on hover */}
                <div
                  className="relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-out [transform:rotate(var(--rot))] group-hover:shadow-[0_40px_100px_-20px_rgba(34,197,94,0.45)] group-hover:ring-2 group-hover:ring-primary/70 group-hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.07)]"
                  style={{ ['--rot' as string]: `${s.r * t}deg` }}
                >
                  <Image src={pr.imageUrl} alt={pr.title} width={800} height={500} className="aspect-[16/10] w-full object-cover object-top" />
                  <span className="pointer-events-none absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition-colors duration-500 group-hover:bg-primary group-hover:text-black">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </a>
          );
        })}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="pointer-events-auto text-center" style={{ opacity: seg(p, 0.35, 0.55), transform: `scale(${lerp(0.9, 1, seg(p, 0.35, 0.6))})` }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Trabajos a medida</p>
            <h2 className="mt-3 text-[clamp(2.2rem,5.5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.045em] drop-shadow-[0_6px_30px_rgba(0,0,0,0.9)]">
              Hechos para
              <br />
              cada cliente.
            </h2>
            <p className="mx-auto mt-4 max-w-sm px-6 text-sm leading-relaxed text-white/60 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] md:max-w-md md:text-base">
              Páginas web, landings y sistemas diseñados desde cero según la marca, los procesos y los objetivos de cada negocio.
            </p>
            <Link href="/portfolio" className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-black">
              Ver proyectos <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Pinned>
  );
}

/** The headline zooms toward the camera until the page turns white: the dark half hands off to the light one. */
export function ZoomScene() {
  const [ref, p] = useProgress<HTMLDivElement>('pinned', { ease: 0.18 });
  const z = seg(p, 0.2, 0.9);
  const scale = 1 + Math.pow(z, 3) * 70;
  const white = seg(p, 0.78, 0.95);
  return (
    <Pinned vh={270} innerRef={ref} className="bg-black">
      <div className="v2-rays" style={{ opacity: 1 - seg(p, 0.1, 0.4) }}>
        <div className="v2-ray d" />
        <div className="v2-ray a" />
        <div className="v2-ray b" />
      </div>
      <div className="relative grid h-full place-items-center px-6">
        <h2
          className="text-center text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.045em] text-white will-change-transform"
          style={{ transform: `scale(${scale})`, transformOrigin: '62% 72%', opacity: seg(p, 0, 0.12) }}
        >
          Hecho para los desafíos
          <br />
          de tu negocio
        </h2>
      </div>
      <div className="absolute inset-0 bg-white" style={{ opacity: white }} />
    </Pinned>
  );
}

/** A green wave that rises at the very bottom of the page. */
export function FooterWave() {
  const [ref, p] = useProgress<HTMLDivElement>('enter', { endAt: 0.6 });
  const t = easeOut(p);
  return (
    <div ref={ref} className="relative h-48 overflow-hidden bg-white md:h-64">
      <div
        className="absolute inset-x-[-10%] bottom-0 h-full"
        style={{
          transform: `translateY(${(1 - t) * 70}%)`,
          background:
            'radial-gradient(40% 60% at 20% 100%, rgba(34,197,94,0.95), transparent 70%), radial-gradient(35% 70% at 55% 100%, rgba(20,184,166,0.85), transparent 70%), radial-gradient(40% 60% at 85% 100%, rgba(163,230,53,0.8), transparent 70%)',
          filter: 'blur(18px)',
        }}
      />
    </div>
  );
}

/*
 * "Diseñamos & desarrollamos tu sistema", told as it happens. Left: the three lines light up one by one.
 * Right: a generic business dashboard, built in code (no screenshot): first as a dashed green blueprint
 * (we design), then every piece fills in — numbers count up, bars grow, rows arrive (we build) — and it
 * goes live.
 */
const fmt = (n: number) => Math.round(n).toLocaleString('es-AR');

function Piece({ d, b, className = '', children }: { d: number; b: number; className?: string; children?: React.ReactNode }) {
  // d: blueprint progress (outline appears) · b: build progress (fills in)
  return (
    <div
      className={`relative rounded-xl ${className}`}
      style={{
        opacity: 0.15 + 0.85 * easeOut(d),
        transform: `scale(${lerp(0.97, 1, easeOut(d))})`,
        background: `rgba(255,255,255,${0.045 * b})`,
        border: `1.5px ${b > 0.5 ? 'solid' : 'dashed'} rgba(${b > 0.5 ? '255,255,255' : '34,197,94'},${b > 0.5 ? 0.08 : 0.75 * easeOut(d)})`,
      }}
    >
      {children}
    </div>
  );
}

/** A skeleton bar that becomes real content as `b` goes 0 → 1. */
const Swap = ({ b, w, children, className = '' }: { b: number; w: string; children: React.ReactNode; className?: string }) => (
  <span className={`relative block ${className}`}>
    <span className="absolute inset-y-[18%] left-0 rounded bg-primary/25" style={{ width: w, opacity: 1 - b }} />
    <span className="block" style={{ opacity: b, transform: `translateY(${(1 - b) * 4}px)` }}>{children}</span>
  </span>
);

export function BuildScene() {
  const [ref, p] = useProgress<HTMLDivElement>('pinned');
  const design = seg(p, 0.03, 0.36);
  const build = seg(p, 0.38, 0.8);
  const live = easeOut(seg(p, 0.82, 0.9));
  // the flip happens while the panel rises into view (not after the section pins), so you see it turn
  const [panelRef, enter] = useProgress<HTMLDivElement>('enter', { endAt: 0.25 });
  const flipIn = easeInOut(enter);
  const leave = easeInOut(seg(p, 0.92, 1));
  const D = (at: number) => clamp01((design - at) / 0.25); // blueprint stagger
  const Bd = (at: number) => easeOut(clamp01((build - at) / 0.22)); // build stagger
  const stage = p < 0.37 ? 0 : p < 0.81 ? 1 : 2;
  const lines = [
    { n: '01', t: 'DISEÑAMOS', sub: 'Planificamos cada pantalla con vos.' },
    { n: '02', t: '& DESARROLLAMOS', sub: 'Lo construimos pieza por pieza.' },
    { n: '03', t: 'TU SISTEMA.', sub: 'Funcionando para tu negocio.', accent: true },
  ];
  const bars = [32, 45, 38, 52, 48, 60, 57, 66, 62, 74, 70, 86];
  const rows = [
    { t: 'Nuevo pedido #1042', s: 'Confirmado' },
    { t: 'Cliente registrado', s: 'Nuevo' },
    { t: 'Pago recibido', s: 'Acreditado' },
    { t: 'Reporte mensual enviado', s: 'Listo' },
  ];
  return (
    <Pinned vh={260} innerRef={ref} className="bg-black text-white">
      <div className="v2-dots absolute inset-0 opacity-[0.08]" />
      <div className="relative mx-auto grid h-full max-w-[1300px] items-center gap-8 px-5 pt-20 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:px-10 md:pt-0">
        {/* the three lines */}
        <div className="space-y-4 md:space-y-7">
          {lines.map((l, i) => {
            const on = stage === i;
            const done = stage > i;
            return (
              <div key={l.n} className="transition-all duration-500" style={{ opacity: on ? 1 : done ? 0.55 : 0.22 }}>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-primary">{l.n}</span>
                  <span className={`whitespace-nowrap text-[clamp(1.7rem,3.6vw,3.4rem)] font-semibold leading-none tracking-[-0.035em] ${l.accent && (on || done) ? 'v2-grad-text' : ''}`}>{l.t}</span>
                </div>
                <p className="ml-7 mt-2 hidden text-sm text-white/55 transition-opacity duration-500 md:block" style={{ opacity: on ? 1 : 0 }}>
                  {l.sub}
                </p>
              </div>
            );
          })}
        </div>
        {/* the dashboard being built */}
        <div ref={panelRef}>
        <div
          className="relative [backface-visibility:hidden]"
          style={{
            // enters flipping like a card (already as a blueprint) · leaves moving forward, past the camera
            transform: `perspective(1400px) rotateY(${(1 - flipIn) * -88}deg) rotateX(${(1 - flipIn) * 10 - leave * 10}deg) translateY(${leave * -90}px) scale(${lerp(0.82, 1, flipIn) * lerp(0.98, 1, live) * lerp(1, 1.08, leave)})`,
            transformOrigin: '50% 50%',
            opacity: 1 - 0.7 * leave,
          }}
        >
          <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[radial-gradient(closest-side,rgba(34,197,94,0.3),transparent)] blur-2xl" style={{ opacity: 0.15 + 0.85 * live }} />
          <div className="relative overflow-hidden rounded-2xl bg-[#0b0f0d] ring-1 ring-white/10">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="ml-3 rounded-md bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-white/45">tu-sistema.com/panel</span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-medium text-primary" style={{ opacity: live, transform: `translateX(${(1 - live) * 10}px)` }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> En producción
              </span>
            </div>
            <div className="grid grid-cols-[44px_1fr] gap-2.5 p-2.5 md:grid-cols-[60px_1fr] md:gap-3 md:p-3">
              {/* sidebar */}
              <Piece d={D(0)} b={Bd(0)} className="flex flex-col items-center gap-2.5 py-3">
                {[0, 1, 2, 3, 4].map((k) => (
                  <span key={k} className="h-5 w-5 rounded-md md:h-6 md:w-6" style={{ background: k === 0 ? `rgba(34,197,94,${0.15 + 0.6 * Bd(0)})` : `rgba(255,255,255,${0.04 + 0.08 * Bd(0)})` }} />
                ))}
              </Piece>
              <div className="grid gap-2.5 md:gap-3">
                {/* header */}
                <Piece d={D(0.05)} b={Bd(0.04)} className="flex items-center justify-between px-3 py-2">
                  <Swap b={Bd(0.04)} w="40%">
                    <span className="text-xs font-semibold md:text-sm">Resumen del negocio</span>
                  </Swap>
                  <Swap b={Bd(0.06)} w="70%">
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/55">Este mes</span>
                  </Swap>
                </Piece>
                {/* KPIs */}
                <div className="grid grid-cols-3 gap-2.5 md:gap-3">
                  {[
                    { k: 'Facturación', v: 4.8, pre: '$ ', post: ' M', dec: 1, d: '+18%' },
                    { k: 'Clientes activos', v: 1248, pre: '', post: '', dec: 0, d: '+9%' },
                    { k: 'Pedidos', v: 3560, pre: '', post: '', dec: 0, d: '+24%' },
                  ].map((c, i) => {
                    const b = Bd(0.1 + i * 0.06);
                    return (
                      <Piece key={c.k} d={D(0.12 + i * 0.05)} b={b} className="px-2.5 py-2 md:px-3 md:py-3">
                        <Swap b={b} w="60%">
                          <span className="block truncate text-[9px] text-white/50 md:text-[11px]">{c.k}</span>
                        </Swap>
                        <Swap b={b} w="85%" className="mt-1">
                          <span className="block truncate text-sm font-semibold tabular-nums md:text-xl">
                            {c.pre}
                            {c.dec ? (c.v * b).toLocaleString('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : fmt(c.v * b)}
                            {c.post}
                          </span>
                        </Swap>
                        <Swap b={b} w="35%" className="mt-0.5">
                          <span className="text-[9px] text-primary md:text-[11px]">{c.d}</span>
                        </Swap>
                      </Piece>
                    );
                  })}
                </div>
                {/* chart + activity */}
                <div className="grid gap-2.5 md:grid-cols-[1.4fr_1fr] md:gap-3">
                  <Piece d={D(0.3)} b={Bd(0.3)} className="px-3 py-2.5">
                    <Swap b={Bd(0.3)} w="45%">
                      <span className="text-[10px] text-white/60 md:text-xs">Ingresos · últimos 12 meses</span>
                    </Swap>
                    <div className="mt-2 flex h-16 items-end gap-1 md:h-24">
                      {bars.map((h, k) => {
                        const g = easeOut(clamp01((build - 0.32 - k * 0.012) / 0.2));
                        return (
                          <span
                            key={k}
                            className="flex-1 rounded-t-sm"
                            style={{
                              height: `${h * (0.12 + 0.88 * g)}%`,
                              background: g > 0.05 ? `rgba(34,197,94,${0.35 + 0.5 * (k / bars.length)})` : 'transparent',
                              outline: g > 0.05 ? 'none' : `1px dashed rgba(34,197,94,${0.5 * D(0.3)})`,
                            }}
                          />
                        );
                      })}
                    </div>
                  </Piece>
                  <Piece d={D(0.42)} b={Bd(0.45)} className="hidden px-3 py-2.5 md:block">
                    <Swap b={Bd(0.45)} w="50%">
                      <span className="text-xs text-white/60">Actividad reciente</span>
                    </Swap>
                    <div className="mt-2 space-y-1.5">
                      {rows.map((r, k) => {
                        const t = Bd(0.5 + k * 0.08);
                        return (
                          <div key={r.t} className="flex items-center justify-between gap-2 text-[11px]" style={{ opacity: 0.25 + 0.75 * t, transform: `translateX(${(1 - t) * 10}px)` }}>
                            <Swap b={t} w="70%" className="min-w-0 flex-1">
                              <span className="block truncate">{r.t}</span>
                            </Swap>
                            <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[9px] text-primary" style={{ opacity: t }}>
                              {r.s}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </Piece>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </Pinned>
  );
}
