import Reveal from '@/components/effects/reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  aside?: React.ReactNode;
}

export default function SectionHeading({ index, label, title, description, className, aside }: SectionHeadingProps) {
  return (
    <div className={cn('mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        <Reveal as="p" className="eyebrow mb-5">
          [{index}] {label}
        </Reveal>
        <Reveal as="h2" delay={0.1} className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-[3.5rem]">
          {title}
        </Reveal>
        {description && (
          <Reveal as="p" delay={0.2} className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </Reveal>
        )}
      </div>
      {aside && <Reveal delay={0.3}>{aside}</Reveal>}
    </div>
  );
}
