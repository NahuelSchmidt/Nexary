// src/components/sections/testimonials-section.tsx
import TestimonialCard, { type Testimonial } from '@/components/testimonial-card';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah L.',
    company: 'CEO, Tech Innovators Inc.',
    text: "OpenCode transformed our outdated system into a modern, efficient platform. Their team's expertise and dedication were outstanding. We've seen a significant boost in productivity!",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    rating: 5,
  },
  {
    id: '2',
    name: 'John B.',
    company: 'Founder, Creative Solutions Co.',
    text: "Working with OpenCode was a fantastic experience. They truly understood our vision and delivered a product that exceeded our expectations. Highly recommended for any web development needs.",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'man portrait',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily K.',
    company: 'Marketing Director, Global Brands',
    text: "The professionalism and skill OpenCode brought to our project were exceptional. They delivered on time and within budget, with a keen eye for detail and user experience. We're thrilled with the results.",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'person smiling',
    rating: 4,
  },
];

export default function TestimonialsSection() {
  return (
    <Section id="testimonials" title="Words From Our Clients" className="bg-background">
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
