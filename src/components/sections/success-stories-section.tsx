// src/components/sections/success-stories-section.tsx
import SuccessStoryCard, { type SuccessStory } from '@/components/success-story-card';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const successStories: SuccessStory[] = [
  {
    id: '1',
    client: 'Insumos Mana',
    project: 'Desarrollo Web Institucional',
    result: 'Incremento del 55% en consultas comerciales online.',
    description: 'Rediseñamos el sitio institucional de una empresa de insumos industriales, optimizando la estructura del catálogo y la experiencia de navegación. Mejoramos la velocidad del sitio y el SEO técnico para facilitar el contacto con nuevos clientes del sector industrial.',
    category: 'Industria / B2B',
  },
  {
    id: '2',
    client: 'Portfolio Dev Profesional',
    project: 'Diseño y Optimización Web',
    result: 'Aumento del 65% en oportunidades laborales y proyectos freelance.',
    description: 'Diseñamos un portfolio moderno para un desarrollador, enfocado en destacar proyectos, tecnologías y experiencia profesional. También optimizamos el rendimiento y la estructura SEO para mejorar su visibilidad online.',
    category: 'Personal Brand',
  },
  {
    id: '3',
    client: 'Sistema de Gestión de Turnos',
    project: 'Plataforma de Reservas Online',
    result: 'Automatización de turnos para más de 50 negocios.',
    description: 'Desarrollamos una plataforma que permite a distintos negocios gestionar reservas, disponibilidad y clientes desde un panel centralizado. El sistema automatiza recordatorios y mejora la organización diaria de los turnos.',
    category: 'SaaS',
  },
];

export default function SuccessStoriesSection() {
  return (
    <Section id="success-stories" title="Nuestros Casos de Éxito" className="bg-background">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {successStories.map((story, index) => (
          <ScrollAnimationWrapper
            key={story.id}
            className="opacity-0"
            animationClass="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <SuccessStoryCard story={story} />
          </ScrollAnimationWrapper>
        ))}
      </div>
    </Section>
  );
}
