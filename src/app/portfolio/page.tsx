import type { Metadata } from 'next';
import ProjectCard from '@/components/project-card';
import SectionHeading from '@/components/layout/section-heading';
import Reveal from '@/components/effects/reveal';
import CtaSection from '@/components/sections/cta-section';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Proyectos — Nexary',
  description: 'Sistemas, plataformas SaaS y sitios web desarrollados por Nexary.',
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative pb-12 pt-40 md:pt-48">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-x relative">
          <SectionHeading
            index="—"
            label="Portfolio"
            title={
              <>
                Todos nuestros <span className="text-primary">proyectos.</span>
              </>
            }
            description="Plataformas SaaS, sistemas de gestión y sitios web enfocados en la calidad, el rendimiento y los resultados de negocio."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 2) * 0.1}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
