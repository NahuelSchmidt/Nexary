import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/effects/reveal';
import Magnetic from '@/components/effects/magnetic';
import SpotlightCard from '@/components/effects/spotlight-card';
import { WhatsAppIcon } from '@/components/whatsapp-floating-button';
import { whatsAppLink } from '@/lib/site';

export default function CtaSection() {
  return (
    <section id="contacto" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SpotlightCard className="relative overflow-hidden rounded-[2rem] px-6 py-20 text-center md:px-16 md:py-28">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute left-1/2 top-full h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]" />
            <div className="relative">
              <p className="eyebrow">[06] Contacto</p>
              <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl md:text-6xl">
                ¿Tu empresa está lista para el <span className="text-primary">siguiente nivel?</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
                ¿Tenés un proceso manual que te quita tiempo o necesitás una herramienta a medida? Agendá una consulta sin compromiso.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Magnetic>
                  <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-7 py-4 text-base">
                    <WhatsAppIcon className="h-5 w-5" /> Escribinos por WhatsApp <ArrowRight className="arrow h-4 w-4" />
                  </a>
                </Magnetic>
              </div>
              <p className="mt-6 font-mono text-xs text-muted-foreground">Respondemos en menos de 24 h</p>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
