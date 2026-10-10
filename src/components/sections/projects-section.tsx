import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { projects } from '@/lib/projects';
import ProjectCard, { ProjectShot } from '@/components/project-card';
import SectionHeading from '@/components/layout/section-heading';
import Reveal from '@/components/effects/reveal';
import Tilt from '@/components/effects/tilt';
import Magnetic from '@/components/effects/magnetic';
import { cn } from '@/lib/utils';

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="proyectos" className="relative scroll-mt-24 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Proyectos"
          title={
            <>
              Sistemas y plataformas <span className="text-muted-foreground">en acción.</span>
            </>
          }
          description="Software real, en producción, resolviendo problemas de negocio todos los días."
          aside={
            <Magnetic>
              <Link href="/portfolio" className="btn btn-ghost">
                Ver todos <ArrowRight className="arrow h-4 w-4" />
              </Link>
            </Magnetic>
          }
        />

        <div className="flex flex-col gap-24 md:gap-36">
          {featured.map((project, i) => (
            <article key={project.id} className="group grid items-center gap-10 md:grid-cols-12 md:gap-14">
              <Reveal className={cn('md:col-span-7', i % 2 === 1 && 'md:order-2')}>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="relative block">
                  <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                  <Tilt className="relative">
                    <ProjectShot project={project} priority={i === 0} />
                  </Tilt>
                </a>
              </Reveal>

              <Reveal delay={0.15} className={cn('md:col-span-5', i % 2 === 1 && 'md:order-1')}>
                <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
                  <span className="text-primary">0{i + 1}</span>
                  <span className="h-px w-10 bg-ink/15" />
                  <span>{project.category}</span>
                  <span className="ml-auto">{project.year}</span>
                </div>
                <h3 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{project.title}</h3>
                <p className="mt-5 leading-relaxed text-muted-foreground">{project.description}</p>
                <ul className="mt-7 space-y-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 text-sm">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Magnetic>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Ver demo <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Magnetic>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>

        <div className="mt-24 grid gap-4 md:mt-36 md:grid-cols-2">
          {others.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
