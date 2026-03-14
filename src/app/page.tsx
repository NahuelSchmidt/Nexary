// src/app/page.tsx
import HeroSection from '@/components/sections/hero-section';
import MissionSection from '@/components/sections/mission-section';
import SuccessStoriesSection from '@/components/sections/success-stories-section';
import Section from '@/components/layout/section-layout';
import ProjectCard, { type Project } from '@/components/project-card';
import ServiceCard, { type Service } from '@/components/service-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Laptop, Palette, TrendingUp, Lightbulb } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const previewProjects: Project[] = [
  {
    id: '1',
    title: 'Plataforma E-commerce X',
    description: 'Una plataforma de e-commerce completa con gestión avanzada de productos y pagos seguros.',
    imageUrl: 'https://picsum.photos/seed/1/600/400',
    techStack: ['Next.js', 'TypeScript', 'Stripe'],
    liveUrl: '/portfolio',
    dataAiHint: 'online store'
  },
  {
    id: '2',
    title: 'Dashboard SaaS Pro',
    description: 'Un panel intuitivo para un producto SaaS, que proporciona análisis y gestión de usuarios.',
    imageUrl: 'https://picsum.photos/seed/2/600/400',
    techStack: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '/portfolio',
    dataAiHint: 'dashboard interface'
  },
  {
    id: '3',
    title: 'Foro ComunitarioHub',
    description: 'Un foro comunitario dinámico con debates en tiempo real y herramientas de moderación.',
    imageUrl: 'https://picsum.photos/seed/3/600/400',
    techStack: ['Vue.js', 'Firebase', 'Nuxt.js'],
    liveUrl: '/portfolio',
    dataAiHint: 'forum discussion'
  },
];

const ourServices: Service[] = [
  {
    id: '1',
    icon: <Laptop className="h-10 w-10 text-primary mb-4" />,
    title: 'Desarrollo Web Moderno',
    description: 'Creamos aplicaciones web rápidas, seguras y escalables utilizando las últimas tecnologías del stack frontend y backend.',
  },
  {
    id: '2',
    icon: <Palette className="h-10 w-10 text-primary mb-4" />,
    title: 'Diseño UI/UX Centrado en el Usuario',
    description: 'Diseñamos interfaces intuitivas y atractivas que garantizan una experiencia de usuario excepcional y memorable.',
  },
  {
    id: '3',
    icon: <TrendingUp className="h-10 w-10 text-primary mb-4" />,
    title: 'Optimización y Rendimiento',
    description: 'Mejoramos la velocidad de carga, la accesibilidad y el SEO de tu sitio web para alcanzar tus objetivos de negocio.',
  },
  {
    id: '4',
    icon: <Lightbulb className="h-10 w-10 text-primary mb-4" />,
    title: 'Consultoría Tecnológica Estratégica',
    description: 'Te asesoramos en la selección de tecnologías, arquitectura de sistemas y estrategias digitales para asegurar el éxito de tu proyecto.',
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
      <Section id="services" title="Nuestros Servicios" className="bg-muted">
        <p className="text-center text-lg md:text-xl text-foreground mb-12 md:mb-16 max-w-3xl mx-auto">
          Ofrecemos una gama completa de servicios de desarrollo web y diseño para llevar tu proyecto al siguiente nivel.
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
          <Button asChild size="lg" className="group">
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
              Solicita una Cotización <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </ScrollAnimationWrapper>
      </Section>

      {/* 3. Proyectos Destacados */}
      <Section id="portfolio-preview" title="Proyectos Destacados" className="bg-background">
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
              Ver Todos los Proyectos <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollAnimationWrapper>
      </Section>

      {/* 4. Casos de Éxito */}
      <SuccessStoriesSection />

      {/* 5. Misión y Valores */}
      <MissionSection />
      
      {/* CTA Final */}
      <Section id="whatsapp-cta" title="¿Listo para Empezar?" className="bg-background">
        <ScrollAnimationWrapper className="text-center max-w-2xl mx-auto opacity-0" animationClass="animate-fade-in-up">
          <WhatsAppIcon className="h-16 w-16 text-primary mx-auto mb-6 animate-subtle-pulse" />
          <h3 className="font-headline text-3xl font-bold mb-4 text-foreground">Hablemos por WhatsApp</h3>
          <p className="text-lg text-muted-foreground mb-8">
            ¿Tienes una idea en mente? Contáctanos directamente para una consulta rápida.
          </p>
          <Button asChild size="lg" className="group bg-[#25D366] hover:bg-[#1DA851] text-white">
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
              Chatea con Nosotros <WhatsAppIcon className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </ScrollAnimationWrapper>
      </Section>
    </>
  );
}
