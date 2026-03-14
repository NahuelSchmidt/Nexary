// src/components/sections/success-stories-section.tsx
import SuccessStoryCard, { type SuccessStory } from '@/components/success-story-card';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const successStories: SuccessStory[] = [
  {
    id: '1',
    client: 'EcoTienda Online',
    project: 'Rediseño E-commerce',
    result: 'Aumento del 45% en la tasa de conversión móvil.',
    description: 'Optimizamos la experiencia de compra y la velocidad de carga, transformando un sitio lento en una plataforma de alto rendimiento.',
    category: 'E-commerce',
  },
  {
    id: '2',
    client: 'Logística Global S.A.',
    project: 'Dashboard de Gestión',
    result: 'Reducción del 30% en tiempos de respuesta operativa.',
    description: 'Desarrollamos un panel de control en tiempo real para la gestión de flotas, mejorando la toma de decisiones basada en datos.',
    category: 'SaaS / Interno',
  },
  {
    id: '3',
    client: 'EduTech Academy',
    project: 'Plataforma E-learning',
    result: 'Soporte para más de 10,000 estudiantes simultáneos.',
    description: 'Migramos su antigua infraestructura a una arquitectura escalable capaz de manejar picos de tráfico masivos sin interrupciones.',
    category: 'Educación',
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
