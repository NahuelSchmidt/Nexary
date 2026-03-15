
// src/app/page.tsx
import HeroSection from '@/components/sections/hero-section';
import MissionSection from '@/components/sections/mission-section';
import SuccessStoriesSection from '@/components/sections/success-stories-section';
import Section from '@/components/layout/section-layout';
import ProjectCard, { type Project } from '@/components/project-card';
import ServiceCard, { type Service } from '@/components/service-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Laptop, LayoutDashboard, Zap, ShieldCheck } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';
import placeholders from '@/app/lib/placeholder-images.json';

const previewProjects: Project[] = [
  {
    id: 'mana',
    title: 'Insumos Mana',
    description: 'Plataforma web institucional con catálogo optimizado, diseñada para centralizar la presencia digital y captar clientes B2B de forma eficiente.',
    imageUrl: placeholders.projects.mana.url,
    techStack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://www.insumosmana.net/',
    dataAiHint: placeholders.projects.mana.hint
  },
  {
    id: 'portfolio',
    title: 'Portfolio Programador',
    description: 'Sitio personal de alta performance enfocado en marca personal, optimizado para una carga instantánea y máxima visibilidad en buscadores.',
    imageUrl: placeholders.projects.portfolio.url,
    techStack: ['Diseño UI/UX', 'Optimización'],
    liveUrl: 'https://portfolio-nahuelschmidt.vercel.app/',
    dataAiHint: placeholders.projects.portfolio.hint
  },
  {
    id: 'turnos-ya',
    title: 'Turnos Ya',
    description: 'SaaS integral de gestión de turnos que automatiza la agenda y reservas online, reduciendo el trabajo manual administrativo en un 80%.',
    imageUrl: placeholders.projects.turnos.url,
    techStack: ['Next.js', 'Tailwind CSS'],
    liveUrl: 'https://saas-turnos-ya.vercel.app/',
    dataAiHint: placeholders.projects.turnos.hint
  },
];

const ourServices: Service[] = [
  {
    id: '1',
    icon: <Laptop className="h-10 w-10 text-primary mb-4" />,
    title: 'Desarrollo de Plataformas Web',
    description: 'Creamos sitios rápidos y seguros que proyectan profesionalismo y están diseñados para convertir visitantes en oportunidades reales de negocio.',
  },
  {
    id: '2',
    icon: <LayoutDashboard className="h-10 w-10 text-primary mb-4" />,
    title: 'Sistemas de Gestión a Medida',
    description: 'Diseñamos paneles administrativos y herramientas internas que centralizan tu información y te permiten controlar toda tu operación en un solo lugar.',
  },
  {
    id: '3',
    icon: <Zap className="h-10 w-10 text-primary mb-4" />,
    title: 'Automatización de Procesos',
    description: 'Eliminamos tareas manuales repetitivas mediante flujos de trabajo inteligentes, permitiendo que tu equipo se enfoque en lo que realmente genera valor.',
  },
  {
    id: '4',
    icon: <ShieldCheck className="h-10 w-10 text-primary mb-4" />,
    title: 'Software Escalable y Moderno',
    description: 'Utilizamos tecnologías de vanguardia para construir soluciones robustas que crecen al mismo ritmo que las demandas de tu empresa.',
  }
];

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.12.552 4.19 1.598 6.02L0 24l6.125-1.606a11.82 11.82 0 005.922 1.597h.005c6.635 0 12.05-5.414 12.05-12.05 0-3.212-1.25-6.232-3.522-8.503z" />
  </svg>
);

const whatsAppLink = "https://wa.me/2974299808";

export default function Home() {
  return (
    <>
      {/* 1. Banner */}
      <HeroSection />

      {/* 2. Nuestros Servicios */}
      <Section id="services" title="Soluciones Tecnológicas Estratégicas" className="bg-muted">
        <p className="text-center text-lg md:text-xl text-foreground mb-12 md:mb-16 max-w-3xl mx-auto">
          Nos enfocamos en resolver cuellos de botella operativos mediante software robusto, escalable y fácil de usar.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {ourServices.map((service, index) => (
            <ScrollAnimationWrapper
              key={service.id}
              className="opacity-0"
              animationClass="animate-fade-in-up"
              style={{ animationDelay: `${(index % 4) * 0.1 + 0.1}s` }}
            >
              <ServiceCard service={service} />
            </ScrollAnimationWrapper>
          ))}
        </div>
        <ScrollAnimationWrapper className="text-center opacity-0" animationClass="animate-fade-in-up" style={{animationDelay: "0.4s"}}>
          <Button asChild size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
              Solicitar Cotización a Medida <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </ScrollAnimationWrapper>
      </Section>

      {/* 3. Proyectos Destacados */}
      <Section id="portfolio-preview" title="Sistemas y Plataformas en Acción" className="bg-background">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {previewProjects.map((project, index) => (
             <ScrollAnimationWrapper
              key={project.id}
              className="opacity-0"
              animationClass="animate-fade-in-up"
              style={{ animationDelay: `${(index % 3) * 0.1 + 0.1}s` }}
            >
              <ProjectCard project={project} />
            </ScrollAnimationWrapper>
          ))}
        </div>
        <ScrollAnimationWrapper className="text-center opacity-0" animationClass="animate-fade-in-up" style={{animationDelay: "0.3s"}}>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group">
            <Link href="/portfolio">
              Explorar Más Soluciones <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollAnimationWrapper>
      </Section>

      {/* 4. Casos de Éxito */}
      <SuccessStoriesSection />

      {/* 5. Misión y Valores */}
      <MissionSection />
      
      {/* CTA Final */}
      <Section id="whatsapp-cta" title="¿Tu Empresa está Lista para el Siguiente Nivel?" className="bg-background">
        <ScrollAnimationWrapper className="text-center max-w-2xl mx-auto opacity-0" animationClass="animate-fade-in-up">
          <WhatsAppIcon className="h-16 w-16 text-primary mx-auto mb-6 animate-subtle-pulse" />
          <h3 className="font-headline text-3xl font-bold mb-4 text-foreground">Hablemos sobre tu Próximo Sistema</h3>
          <p className="text-lg text-muted-foreground mb-8">
            ¿Tenés un proceso manual que te quita tiempo o necesitás una herramienta a medida? Agendá una consulta rápida hoy mismo.
          </p>
          <Button asChild size="lg" className="group bg-[#25D366] hover:bg-[#1DA851] text-white">
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
              Consultar por WhatsApp <WhatsAppIcon className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </ScrollAnimationWrapper>
      </Section>
    </>
  );
}
