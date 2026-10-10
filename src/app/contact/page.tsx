import type { Metadata } from 'next';
import CtaSection from '@/components/sections/cta-section';

export const metadata: Metadata = {
  title: 'Contacto — Nexary',
  description: 'Escribinos por WhatsApp y contanos sobre tu proyecto.',
};

export default function ContactPage() {
  return (
    <div className="flex min-h-[100svh] items-center pt-24">
      <div className="w-full">
        <CtaSection />
      </div>
    </div>
  );
}
