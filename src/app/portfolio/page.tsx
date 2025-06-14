// src/app/portfolio/page.tsx
import ProjectCard, { type Project } from '@/components/project-card';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const projects: Project[] = [
  {
    id: '1',
    title: 'Plataforma E-commerce X',
    description: 'Una plataforma de e-commerce completa con gestión avanzada de productos, cuentas de usuario y pagos seguros.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: '#',
    caseStudyUrl: '#',
    dataAiHint: 'online shopping'
  },
  {
    id: '2',
    title: 'Dashboard SaaS Pro',
    description: 'Un panel intuitivo para un producto SaaS, que proporciona análisis, gestión de usuarios y configuración de ajustes.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    liveUrl: '#',
    dataAiHint: 'data analytics'
  },
  {
    id: '3',
    title: 'Foro ComunitarioHub',
    description: 'Un foro comunitario dinámico con debates en tiempo real, perfiles de usuario y herramientas de moderación.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Vue.js', 'Firebase', 'Nuxt.js', 'Vuetify'],
    caseStudyUrl: '#',
    dataAiHint: 'social network'
  },
  {
    id: '4',
    title: 'Generador de Contenido IA',
    description: 'Una aplicación web que utiliza IA para generar contenido creativo basado en las indicaciones del usuario, con una interfaz de usuario elegante y moderna.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Python', 'Flask', 'React', 'OpenAI API', 'Material UI'],
    liveUrl: '#',
    dataAiHint: 'artificial intelligence'
  },
   {
    id: '5',
    title: 'Plataforma de Aprendizaje Interactivo',
    description: 'Una atractiva plataforma de aprendizaje en línea con cursos en video, cuestionarios y seguimiento del progreso para estudiantes.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Angular', 'NestJS', 'GraphQL', 'TypeORM', 'SCSS'],
    liveUrl: '#',
    caseStudyUrl: '#',
    dataAiHint: 'online education'
  },
  {
    id: '6',
    title: 'Sitio Web Complementario de App Móvil',
    description: 'Una página de destino adaptable y sitio de soporte para una popular aplicación móvil, impulsando descargas y participación de usuarios.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Gatsby', 'Contentful', 'Styled Components', 'Netlify'],
    dataAiHint: 'mobile app'
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-gradient-to-b from-background via-muted to-background min-h-screen">
      <Section id="portfolio" title="Nuestra Huella Creativa" className="pt-28 md:pt-36">
        <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
          Explora una selección de proyectos que muestran nuestra pasión por la innovación, la calidad y las soluciones web impactantes. Cada proyecto refleja nuestro compromiso con la excelencia y el éxito del cliente.
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
