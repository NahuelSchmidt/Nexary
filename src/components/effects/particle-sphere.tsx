"use client";

import { useEffect, useRef } from 'react';

type Particle = {
  kind: 'bg' | 'sphere';
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  // bg particles drift around an origin
  ox: number;
  oy: number;
  a: number;
  t: number;
  // sphere particles live on the unit sphere (u = height, th = longitude)
  u: number;
  th: number;
};

const ATTRACT_RADIUS = 170;
const ATTRACT_FORCE = 2.4;

/**
 * Full-bleed canvas with drifting background particles plus a rotating sphere
 * of particles. Every particle is pulled towards the pointer when it gets close.
 */
export default function ParticleSphere({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999, active: false };
    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let rot = 0;
    let raf = 0;
    let visible = true;

    // Colors come from CSS variables so the canvas follows the light/dark theme
    const colors = { base: '34, 197, 94', hot: '134, 239, 172', glow: 'rgba(34,197,94,0.10)', light: false };
    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      colors.base = css.getPropertyValue('--particle').trim() || colors.base;
      colors.hot = css.getPropertyValue('--particle-hot').trim() || colors.hot;
      colors.glow = css.getPropertyValue('--particle-glow').trim() || colors.glow;
      colors.light = document.documentElement.classList.contains('light');
    };
    readColors();
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reducedMotion) for (let i = 0; i < 2; i++) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const layout = () => {
      const mobile = W < 860;
      return mobile
        ? { cx: W * 0.5, cy: H - Math.min(W * 0.34, 140) - 70, rad: Math.min(W * 0.34, 140), sphereCount: 700, bgDensity: 9000 }
        : { cx: W * 0.74, cy: H * 0.5, rad: Math.min(W * 0.17, H * 0.32), sphereCount: 1500, bgDensity: 7800 };
    };

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { cx, cy, sphereCount, bgDensity } = layout();
      particles = [];
      const bgCount = Math.round((W * H) / bgDensity);
      for (let i = 0; i < bgCount; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        particles.push({
          kind: 'bg', x, y, ox: x, oy: y, vx: 0, vy: 0,
          r: Math.random() * 1.3 + 0.35, a: Math.random() * 0.45 + 0.15, t: Math.random() * Math.PI * 2, u: 0, th: 0,
        });
      }
      for (let i = 0; i < sphereCount; i++) {
        particles.push({
          kind: 'sphere', x: cx, y: cy, ox: 0, oy: 0, vx: 0, vy: 0,
          r: Math.random() + 0.55, a: 1, t: 0, u: Math.random() * 2 - 1, th: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (pointer.active) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 280);
        g.addColorStop(0, colors.glow);
        g.addColorStop(1, 'rgba(34,197,94,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      rot += 0.0035;
      const { cx, cy, rad } = layout();
      const tilt = 0.35;

      for (const p of particles) {
        let tx: number;
        let ty: number;
        let alpha: number;
        let depth = 1;

        if (p.kind === 'bg') {
          p.t += 0.008;
          tx = p.ox + Math.sin(p.t) * 6;
          ty = p.oy + Math.cos(p.t * 0.8) * 6;
          alpha = p.a;
        } else {
          const rr = Math.sqrt(1 - p.u * p.u);
          const ang = p.th + rot;
          const x3 = -rr * Math.cos(ang);
          const z3 = rr * Math.sin(ang);
          const y3 = p.u * Math.cos(tilt) - z3 * Math.sin(tilt);
          const z4 = p.u * Math.sin(tilt) + z3 * Math.cos(tilt);
          tx = cx + x3 * rad;
          ty = cy + y3 * rad;
          depth = (z4 + 1) / 2;
          alpha = colors.light ? 0.22 + depth * 0.78 : 0.18 + depth * 0.82;
        }

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < ATTRACT_RADIUS) {
          const f = (1 - d / ATTRACT_RADIUS) * -ATTRACT_FORCE;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx += (tx - p.x) * 0.035;
        p.vy += (ty - p.y) * 0.035;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;

        const glow = d < ATTRACT_RADIUS ? 1 - d / ATTRACT_RADIUS : 0;
        const size = (p.r + glow * 1.4) * (0.55 + depth * 0.55) * (colors.light && p.kind === 'sphere' ? 1.25 : 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${glow > 0.35 ? colors.hot : colors.base},${Math.min(1, alpha + glow * 0.6)})`;
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      raf = visible && !reducedMotion ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = pointer.y = -9999;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) loop();
    });

    setup();
    // With reduced motion, let the sphere settle and then freeze it.
    if (reducedMotion) {
      for (let i = 0; i < 120; i++) draw();
    } else {
      observer.observe(canvas);
      loop();
    }

    window.addEventListener('resize', setup);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('touchend', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('resize', setup);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('touchend', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
