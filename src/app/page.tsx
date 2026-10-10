import HeroSection from '@/components/sections/hero-section';
import TechMarquee from '@/components/sections/tech-marquee';
import ServicesSection from '@/components/sections/services-section';
import ProjectsSection from '@/components/sections/projects-section';
import ProcessSection from '@/components/sections/process-section';
import ValuesSection from '@/components/sections/values-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import CtaSection from '@/components/sections/cta-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <ValuesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
