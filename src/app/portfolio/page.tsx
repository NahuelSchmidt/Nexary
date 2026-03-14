// src/app/portfolio/page.tsx
import ProjectCard, { type Project } from '@/components/project-card';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import placeholders from '@/app/lib/placeholder-images.json';

const projects: Project[] = [
  {
    id: 'mana',
    title: 'Insumos Mana',
    description: 'Web institucional para empresa industrial, diseñada para presentar el catálogo corporativo con una estética profesional y robusta.',
    imageUrl: placeholders.projects.mana.url,
    techStack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://www.insumosmana.net/',
    dataAiHint: placeholders.projects.mana.hint
  },
  {
    id: 'portfolio',
    title: 'Portfolio Programador',
    description: 'Diseño y optimización de sitio personal enfocado en la marca personal, con tiempos de carga mínimos y alta performance.',
    imageUrl: placeholders.projects.portfolio.url,
    techStack: ['Diseño UI/UX', 'Optimización'],
    liveUrl: 'https://portfolio-nahuelschmidt.vercel.app/',
    dataAiHint: placeholders.projects.portfolio.hint
  },
  {
    id: 'turnos-ya',
    title: 'Turnos Ya',
    description: 'Sistema integral de gestión de turnos que permite la reserva online y administración de agendas para comercios y profesionales.',
    imageUrl: placeholders.projects.turnos.url,
    techStack: ['Next.js', 'Tailwind CSS'],
    liveUrl: 'https://saas-turnos-ya.vercel.app/',
    dataAiHint: placeholders.projects.turnos.hint
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-gradient-to-b from-background via-muted to-background min-h-screen">
      <Section id="portfolio" title="Nuestros Proyectos" className="pt-28 md:pt-36">
        <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
          Explora los proyectos que hemos desarrollado, enfocados en la calidad, el rendimiento y la satisfacción de nuestros clientes.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollAnimationWrapper
              key={project.id}
              className="opacity-0"
              animationClass="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </ScrollAnimationWrapper>
          ))}
        </div>
      </Section>
    </div>
  );
}
