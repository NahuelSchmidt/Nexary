// src/components/layout/section-layout.tsx
import { cn } from '@/lib/utils';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

interface SectionProps {
  id: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Section({ id, title, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0 mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center text-primary">
              {title}
            </h2>
          </ScrollAnimationWrapper>
        )}
        {children}
      </div>
    </section>
  );
}
