import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/projects';
import SpotlightCard from '@/components/effects/spotlight-card';
import Tilt from '@/components/effects/tilt';
import { cn } from '@/lib/utils';

/** Browser-style frame around a project screenshot. */
export function ProjectShot({ project, priority, className }: { project: Project; priority?: boolean; className?: string }) {
  const host = new URL(project.liveUrl).host.replace('www.', '');
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-[var(--shot-shadow)]', className)}>
      <div className="flex items-center gap-1.5 border-b border-ink/[0.07] px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="ml-3 truncate rounded-md bg-ink/[0.04] px-3 py-0.5 font-mono text-[10px] text-muted-foreground">{host}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={`Captura de ${project.title}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

/** Compact card used in grids. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group block h-full" data-cursor="hover">
      <SpotlightCard className="flex h-full flex-col p-4">
        <Tilt max={5}>
          <ProjectShot project={project} />
        </Tilt>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
          <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="mt-3 flex items-center justify-between text-xl font-semibold tracking-tight">
            {project.title}
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {project.techStack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </a>
  );
}
