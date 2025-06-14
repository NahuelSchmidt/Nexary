// src/components/sections/testimonials-section.tsx
import TestimonialCard, { type Testimonial } from '@/components/testimonial-card';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sara L.',
    company: 'CEO, Tech Innovators Inc.',
    text: "OpenCode transformó nuestro sistema obsoleto en una plataforma moderna y eficiente. La experiencia y dedicación de su equipo fueron sobresalientes. ¡Hemos visto un aumento significativo en la productividad!",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    rating: 5,
  },
  {
    id: '2',
    name: 'Juan B.',
    company: 'Fundador, Creative Solutions Co.',
    text: "Trabajar con OpenCode fue una experiencia fantástica. Realmente entendieron nuestra visión y entregaron un producto que superó nuestras expectativas. Altamente recomendados para cualquier necesidad de desarrollo web.",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'man portrait',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emilia K.',
    company: 'Directora de Marketing, Global Brands',
    text: "El profesionalismo y la habilidad que OpenCode aportó a nuestro proyecto fueron excepcionales. Entregaron a tiempo y dentro del presupuesto, con un gran ojo para el detalle y la experiencia del usuario. Estamos encantados con los resultados.",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'person smiling',
    rating: 4,
  },
];

export default function TestimonialsSection() {
  return (
    <Section id="testimonials" title="Palabras de Nuestros Clientes" className="bg-background">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <ScrollAnimationWrapper
            key={testimonial.id}
            className="opacity-0"
            animationClass="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <TestimonialCard testimonial={testimonial} />
          </ScrollAnimationWrapper>
        ))}
      </div>
    </Section>
  );
}
