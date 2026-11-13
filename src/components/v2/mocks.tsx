'use client';

// The little UIs next to each step; they play their story as they scroll into view.
import { Check, MessageCircle } from 'lucide-react';
import { easeOut, seg, useProgress } from './use-progress';

const Box: React.FC<{ children: React.ReactNode; innerRef: React.Ref<HTMLDivElement>; center?: boolean }> = ({ children, innerRef, center }) => (
  <div ref={innerRef} className={`v2-mock relative h-full overflow-hidden rounded-xl p-5 ${center ? 'grid place-items-center' : ''}`}>
    {children}
  </div>
);

export function MockChat() {
  const [ref, p] = useProgress<HTMLDivElement>('enter', { endAt: 0.4 });
  const msgs = [
    { me: false, text: 'Hola! Tengo un gimnasio y anoto todo en planillas…' },
    { me: true, text: '¡Buenísimo! Contame cómo cobrás las cuotas hoy.' },
    { me: false, text: 'A mano, y siempre se me pasa alguno 😅' },
  ];
  const typing = seg(p, 0.75, 0.9) > 0 && seg(p, 0.75, 0.9) < 1;
  return (
    <Box innerRef={ref}>
      <div className="flex items-center gap-2 text-xs font-medium">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#25D366] text-white">
          <MessageCircle className="h-4 w-4" />
        </span>
        WhatsApp · Nexary
        <span className="ml-auto text-[10px] font-normal text-black/40">{typing ? 'escribiendo…' : 'en línea'}</span>
      </div>
      <div className="mt-4 space-y-2 text-[11px]">
        {msgs.map((m, i) => {
          const t = easeOut(seg(p, 0.1 + i * 0.22, 0.28 + i * 0.22));
          return (
            <div
              key={i}
              className={`w-[78%] rounded-lg px-3 py-2 shadow-sm ${m.me ? 'ml-auto rounded-tr-none bg-[#dcfce7]' : 'rounded-tl-none bg-white'}`}
              style={{ opacity: t, transform: `translateY(${(1 - t) * 12}px) scale(${0.96 + t * 0.04})`, transformOrigin: m.me ? '100% 0' : '0 0' }}
            >
              {m.text}
            </div>
          );
        })}
      </div>
    </Box>
  );
}

export function MockProposal() {
  const [ref, p] = useProgress<HTMLDivElement>('enter', { endAt: 0.4 });
  const doc = easeOut(seg(p, 0.05, 0.4));
  const lines = [1, 0.8, 0.6];
  const tags = ['Alcance', 'Prototipo', 'Validado'];
  return (
    <Box innerRef={ref}>
      <div className="mx-auto w-[78%] rounded-lg bg-white p-4 shadow-md" style={{ transform: `translateY(${(1 - doc) * 40}px) rotate(${-3 * doc}deg)`, opacity: doc }}>
        <div className="flex items-center justify-between text-[11px] font-medium">
          Tu proyecto
          <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-white" style={{ transform: `scale(${easeOut(seg(p, 0.8, 0.95))})` }}>
            <Check className="h-3 w-3" />
          </span>
        </div>
        <div className="mt-3 space-y-1.5">
          {lines.map((w, i) => (
            <div key={i} className="h-1.5 rounded bg-black/10" style={{ width: `${w * 100 * easeOut(seg(p, 0.25 + i * 0.08, 0.45 + i * 0.08))}%` }} />
          ))}
        </div>
        <div className="mt-4 flex gap-2 text-[10px] text-primary">
          {tags.map((t, i) => (
            <span key={t} className="rounded-full bg-[#dcfce7] px-2 py-0.5" style={{ opacity: seg(p, 0.5 + i * 0.1, 0.6 + i * 0.1), transform: `scale(${0.8 + 0.2 * easeOut(seg(p, 0.5 + i * 0.1, 0.65 + i * 0.1))})` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Box>
  );
}

export function MockBuild() {
  const [ref, p] = useProgress<HTMLDivElement>('enter', { endAt: 0.35 });
  const rows: [string, number][] = [
    ['Pantallas', 100],
    ['Código', 70],
    ['Pruebas', 40],
  ];
  const week = 1 + Math.floor(seg(p, 0.1, 0.9) * 2.99);
  return (
    <Box innerRef={ref}>
      <div className="flex items-center justify-between text-[11px] font-medium">
        Avance semanal <span className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-primary">Semana {week}</span>
      </div>
      {rows.map(([l, v], i) => {
        const now = Math.round(v * easeOut(seg(p, 0.1 + i * 0.12, 0.75 + i * 0.08)));
        return (
          <div key={l} className="mt-3">
            <div className="flex justify-between text-[10px] text-black/50">
              <span>{l}</span>
              <span className="tabular-nums">{now}%</span>
            </div>
            <div className="mt-1 h-1.5 rounded bg-black/10">
              <div className="h-1.5 rounded bg-primary" style={{ width: `${now}%` }} />
            </div>
          </div>
        );
      })}
    </Box>
  );
}

export function MockLaunch() {
  const [ref, p] = useProgress<HTMLDivElement>('enter', { endAt: 0.35 });
  const url = 'tu-negocio.com';
  const typed = Math.round(seg(p, 0.1, 0.55) * url.length);
  const live = seg(p, 0.6, 0.75);
  return (
    <Box innerRef={ref} center>
      <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs shadow-md ring-1 ring-primary/30" style={{ transform: `scale(${0.9 + 0.1 * easeOut(seg(p, 0, 0.3))})` }}>
        <span className={`h-2 w-2 rounded-full ${live > 0.5 ? 'animate-pulse bg-primary' : 'bg-black/20'}`} />
        <span className="min-w-[7.5em] font-mono">
          {url.slice(0, typed)}
          {typed < url.length && <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-black/60" />}
        </span>
        <span className="ml-1 rounded-full bg-[#dcfce7] px-2 py-0.5 text-[10px] text-primary" style={{ opacity: live, transform: `translateX(${(1 - live) * -6}px)` }}>
          Online
        </span>
      </div>
      <div className="absolute bottom-5 flex gap-3 text-[10px] text-black/45" style={{ opacity: seg(p, 0.75, 0.9) }}>
        <span>✓ En producción</span>
        <span>✓ Equipo capacitado</span>
        <span>✓ Te acompañamos</span>
      </div>
    </Box>
  );
}
