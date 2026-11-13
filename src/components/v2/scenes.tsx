'use client';

// Scroll scenes: pinned (sticky) sections whose animation is driven by scroll progress.
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Eye, MessagesSquare, MousePointerClick } from 'lucide-react';
import { projects } from '@/lib/projects';
import { useEffect, useRef, useState } from 'react';
import { easeInOut, easeOut, lerp, seg, useProgress } from './use-progress';

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
  const x = lerp(78, 24, t);
  const y = lerp(10, 82, t) - Math.sin(t * Math.PI) * 6;
  const s = lerp(0.8, 1.15, Math.sin(t * Math.PI));
  return (
    <Pinned vh={260} innerRef={ref} className="bg-black text-white">
      <div className="v2-dots absolute inset-0 opacity-[0.14]" />
      <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%,-50%) scale(${s})` }}>
        <div className="relative h-56 w-56 md:h-72 md:w-72">
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
  // Types itself once the section is on screen, at a human pace (silent: the key sound lives only in the hero).
  const flat = lines.join('');
  const [typed, setTyped] = useState(0);
  const active = p > 0.04;
  useEffect(() => {
    if (!active) {
      setTyped(0);
      return;
    }
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const next = () => {
      i++;
      setTyped(i);
      if (i < flat.length) {
        const ch = flat[i - 1];
        // a little human rhythm: quicker inside words, a beat after spaces and line ends
        const lineEnd = lines.some((_, li) => lines.slice(0, li + 1).join('').length === i);
        t = setTimeout(next, lineEnd ? 260 : ch === ' ' ? 140 : 55 + Math.random() * 55);
      }
    };
    t = setTimeout(next, 350);
    return () => clearTimeout(t);
  }, [active, flat]);
  const done = typed >= total;
  const grow = easeOut(seg(p, 0.4, 0.85));
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);
  let used = 0;
  return (
    <Pinned vh={300} innerRef={ref} className="bg-black text-white">
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
                    {caret && <span className="ml-1 inline-block h-[0.9em] w-[0.08em] translate-y-[0.1em] bg-lime-300" style={{ opacity: typed < total || blink ? 1 : 0 }} />}
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
    <Pinned vh={230} innerRef={ref} className="bg-black text-white">
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
              <div key={label} className="flex flex-col items-center gap-6" style={{ transform: `translateY(${(1 - t) * 120}px)`, opacity: t }}>
                <Icon className="v2-neon h-20 w-20 md:h-32 md:w-32" strokeWidth={1.1} style={{ color }} />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Pinned>
  );
}

/** The studio paragraph lights up word by word while it is pinned. */
export function WordScene({ paragraphs }: { paragraphs: string[] }) {
  const [ref, p] = useProgress<HTMLDivElement>('pinned');
  const words = paragraphs.map((t) => t.split(' '));
  const total = words.flat().length;
  let k = 0;
  return (
    <Pinned vh={200} innerRef={ref} className="bg-black text-white">
      <div className="mx-auto grid h-full max-w-2xl place-items-center px-6">
        <div className="space-y-8 text-xl leading-relaxed md:text-2xl">
          {words.map((ws, pi) => (
            <p key={pi}>
              {ws.map((w, wi) => {
                const t = seg(p, (k / total) * 0.85, (k / total) * 0.85 + 0.06);
                k++;
                const hot = /^\d|proyectos/.test(w);
                return (
                  <span key={wi} style={{ color: hot && t > 0.5 ? '#22c55e' : undefined, opacity: 0.18 + t * 0.82 }}>
                    {w}{' '}
                  </span>
                );
              })}
            </p>
          ))}
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
  const names = ['NexaGym', 'Turnify', 'SportNex', 'Stock y Ventas', 'Insumos Mana', 'tu negocio'];
  const idx = Math.min(names.length - 1, Math.floor(seg(p, 0.05, 0.9) * names.length));
  const local = (seg(p, 0.05, 0.9) * names.length) % 1;
  const last = idx === names.length - 1;
  const spin = p * 540;
  return (
    <Pinned vh={320} innerRef={ref} className="text-white" >
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

/** The project shots fly out from the center to their places around the headline. */
export function CollageScene() {
  const [ref, p] = useProgress<HTMLDivElement>('pinned');
  const shots = projects.slice(0, 8);
  const spots = [
    { x: 4, y: 6, w: 28, r: -8 },
    { x: 37, y: 2, w: 25, r: 4 },
    { x: 70, y: 7, w: 27, r: 10 },
    { x: 1, y: 42, w: 23, r: 6 },
    { x: 75, y: 44, w: 24, r: -7 },
    { x: 8, y: 72, w: 27, r: -4 },
    { x: 40, y: 76, w: 23, r: 3 },
    { x: 68, y: 72, w: 27, r: 8 },
  ];
  return (
    <Pinned vh={230} innerRef={ref} className="bg-[#070908] text-white">
      <div id="proyectos" className="absolute -top-20" />
      <div className="relative mx-auto h-full max-w-[1400px]">
        {shots.map((pr, i) => {
          const s = spots[i];
          const t = easeOut(seg(p, 0.02 + i * 0.04, 0.45 + i * 0.04));
          const cx = lerp(50 - s.w / 2, s.x, t);
          const cy = lerp(40, s.y, t);
          return (
            <a
              key={pr.id}
              href={pr.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={pr.title}
              className="absolute overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
              style={{ left: `${cx}%`, top: `${cy}%`, width: `${s.w}%`, transform: `rotate(${s.r * t}deg) scale(${lerp(0.5, 1, t)})`, opacity: t }}
            >
              <Image src={pr.imageUrl} alt={pr.title} width={800} height={500} className="aspect-[16/10] w-full object-cover object-top" />
            </a>
          );
        })}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="pointer-events-auto text-center" style={{ opacity: seg(p, 0.35, 0.55), transform: `scale(${lerp(0.9, 1, seg(p, 0.35, 0.6))})` }}>
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
    <Pinned vh={300} innerRef={ref} className="bg-black">
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
