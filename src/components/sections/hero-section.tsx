// src/components/sections/hero-section.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background via-muted to-background pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* Decorative background elements if desired, e.g. subtle geometric patterns or blurred shapes */}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0">
              <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                Crafting <span className="text-primary">Digital Excellence</span>,
                <br />
                One Line of Code at a Time.
              </h1>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0" style={{ animationDelay: '0.2s' }}>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
                At OpenCode, we transform your ideas into powerful, scalable, and beautiful web applications. Let's build the future, together.
              </p>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
          <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0 hidden md:block" style={{ animationDelay: '0.3s' }}>
            <div className="relative aspect-square max-w-md mx-auto group">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
               <Image
                src="https://placehold.co/600x600.png"
                alt="Abstract representation of code or technology"
                width={600}
                height={600}
                className="rounded-lg object-cover relative z-10 shadow-2xl group-hover:scale-105 transition-transform duration-500"
                data-ai-hint="abstract technology"
                priority
              />
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
