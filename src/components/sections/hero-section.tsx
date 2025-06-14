// src/components/sections/hero-section.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import { useEffect, useState } from 'react';

interface ParticleStyle {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  transform: string;
}

export default function HeroSection() {
  const [particles, setParticles] = useState<Array<{id: number; style: ParticleStyle}>>([]);

  useEffect(() => {
    const numParticles = 70;
    const newParticles = [];
    for (let i = 0; i < numParticles; i++) {
      const initialZ = Math.random() * -400 - 100;
      const initialScale = 0.3 + Math.random() * 0.4;
      newParticles.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 7}s`,
          animationDuration: `${4 + Math.random() * 4}s`,
          transform: `translateZ(${initialZ}px) scale(${initialScale})`,
        },
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-background via-muted to-background min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Particle Container */}
      <div className="particle-container">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle animate-coming-forward"
            style={p.style}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0">
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Creando <span className="text-primary">Excelencia Digital</span>,
            <br />
            Una Línea de Código a la Vez.
          </h1>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0" style={{ animationDelay: '0.2s' }}>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            En OpenCode, transformamos tus ideas en aplicaciones web potentes, escalables y atractivas. Construyamos el futuro, juntos.
          </p>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0" style={{ animationDelay: '0.4s' }}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1">
              <Link href="/contact">
                Comienza Tu Proyecto <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/portfolio">
                Ver Nuestro Trabajo
              </Link>
            </Button>
          </div>
        </ScrollAnimationWrapper>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
