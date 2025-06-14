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
  transform: string; // For initial random Z position and scale
}

export default function HeroSection() {
  const [particles, setParticles] = useState<Array<{id: number; style: ParticleStyle}>>([]);

  useEffect(() => {
    const numParticles = 70; // Number of particles
    const newParticles = [];
    for (let i = 0; i < numParticles; i++) {
      const initialZ = Math.random() * -400 - 100; // Random initial Z between -100px and -500px
      const initialScale = 0.3 + Math.random() * 0.4; // Random initial scale
      newParticles.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 7}s`, // Randomize start time up to 7s
          animationDuration: `${4 + Math.random() * 4}s`, // Randomize duration (4s to 8s)
          transform: `translateZ(${initialZ}px) scale(${initialScale})`,
        },
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-background via-muted to-background pt-48 pb-32 md:pt-72 md:pb-40 overflow-hidden">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Adjusted grid to be single column and centered if no image is present */}
        <div className="grid md:grid-cols-1 gap-8 items-center">
          <div className="text-center"> {/* Centered text content */}
            <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0">
              <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                Crafting <span className="text-primary">Digital Excellence</span>,
                <br />
                One Line of Code at a Time.
              </h1>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0" style={{ animationDelay: '0.2s' }}>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"> {/* Increased max-width for centered text */}
                At OpenCode, we transform your ideas into powerful, scalable, and beautiful web applications. Let's build the future, together.
              </p>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"> {/* Centered buttons */}
                <Button asChild size="lg" className="group transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1">
                  <Link href="/contact">
                    Start Your Project <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link href="/portfolio">
                    View Our Work
                  </Link>
                </Button>
              </div>
            </ScrollAnimationWrapper>
          </div>
          {/* The Image component and its container have been removed */}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
}
