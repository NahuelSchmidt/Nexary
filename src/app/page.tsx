// src/app/page.tsx
import HeroSection from '@/components/sections/hero-section';
import MissionSection from '@/components/sections/mission-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import Section from '@/components/layout/section-layout';
import ProjectCard, { type Project } from '@/components/project-card';
import ServiceCard, { type Service } from '@/components/service-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Laptop, Palette, TrendingUp, Lightbulb } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

// Sample data for previews
const previewProjects: Project[] = [
  {
    id: '1',
    title: 'Plataforma E-commerce X',
    description: 'Una plataforma de e-commerce completa con gestión avanzada de productos y pagos seguros.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Next.js', 'TypeScript', 'Stripe'],
    liveUrl: '/portfolio',
    dataAiHint: 'online store'
  },
  {
    id: '2',
    title: 'Dashboard SaaS Pro',
    description: 'Un panel intuitivo para un producto SaaS, que proporciona análisis y gestión de usuarios.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '/portfolio',
    dataAiHint: 'dashboard interface'
  },
  {
    id: '3',
    title: 'Foro ComunitarioHub',
    description: 'Un foro comunitario dinámico con debates en tiempo real y herramientas de moderación.',
    imageUrl: 'https://placehold.co/600x400.png',
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


const projectAnimationClasses = [
  'animate-fade-in-left',
  'animate-fade-in-up',
  'animate-fade-in-right',
];

const serviceAnimationClasses = [
  'animate-fade-in-left',
  'animate-fade-in-up',
  'animate-fade-in-right',
  'animate-fade-in-up', // Can repeat or add more specific ones
];

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        <path d="M14.05 16.95A8.91 8.91 0 0 1 12.03 16c-2.43-.5-4.32-2.39-4.82-4.82a8.91 8.91 0 0 1 .95-2.02"></path>
    </svg>
)

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />

      <Section id="portfolio-preview" title="Proyectos Destacados" className="bg-background">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {previewProjects.map((project, index) => (
             <ScrollAnimationWrapper
              key={project.id}
              className="opacity-0"
              animationClass={projectAnimationClasses[index % projectAnimationClasses.length]}
              style={{ animationDelay: `${(index % projectAnimationClasses.length) * 0.1 + 0.1}s` }}
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

      <TestimonialsSection />

      <Section id="services" title="Nuestros Servicios" className="bg-muted">
        <p className="text-center text-lg md:text-xl text-foreground mb-12 md:mb-16 max-w-3xl mx-auto">
          Ofrecemos una gama completa de servicios de desarrollo web y diseño para llevar tu proyecto al siguiente nivel, creando soluciones digitales impactantes y a medida.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {ourServices.map((service, index) => (
            <ScrollAnimationWrapper
              key={service.id}
              className="opacity-0"
              animationClass={serviceAnimationClasses[index % serviceAnimationClasses.length]}
              style={{ animationDelay: `${(index % serviceAnimationClasses.length) * 0.1 + 0.1}s` }}
            >
              <ServiceCard service={service} />
            </ScrollAnimationWrapper>
          ))}
        </div>
        <ScrollAnimationWrapper className="text-center opacity-0" animationClass="animate-fade-in-up" style={{animationDelay: "0.4s"}}>
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              Solicita una Cotización <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollAnimationWrapper>
      </Section>
      
      <Section id="whatsapp-cta" title="¿Listo para Empezar?" className="bg-background">
        <ScrollAnimationWrapper className="text-center max-w-2xl mx-auto opacity-0" animationClass="animate-fade-in-up">
          <WhatsAppIcon className="h-16 w-16 text-primary mx-auto mb-6 animate-subtle-pulse" />
          <h3 className="font-headline text-3xl font-bold mb-4 text-foreground">Hablemos por WhatsApp</h3>
          <p className="text-lg text-muted-foreground mb-8">
            ¿Tienes una idea o un proyecto en mente? Contáctanos directamente por WhatsApp para una consulta rápida y sin compromiso. ¡Estamos aquí para ayudarte a empezar!
          </p>
          <Button asChild size="lg" className="group bg-[#25D366] hover:bg-[#1DA851] text-white">
            <Link href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">
              Chatea con Nosotros <WhatsAppIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </ScrollAnimationWrapper>
      </Section>
    </>
  );
}
