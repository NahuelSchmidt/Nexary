// src/components/sections/mission-section.tsx
import { Rocket, Lightbulb, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const values = [
  {
    icon: <Rocket className="h-10 w-10 text-primary mb-4" />,
    title: 'Innovación',
    description: 'Exploramos continuamente nuevas tecnologías y enfoques para ofrecer soluciones de vanguardia que impulsan el éxito.',
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary mb-4" />,
    title: 'Calidad',
    description: 'Nuestro compromiso con la excelencia garantiza aplicaciones web robustas, confiables y de alto rendimiento en todo momento.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary mb-4" />,
    title: 'Colaboración',
    description: 'Trabajamos en estrecha colaboración con nuestros clientes, fomentando la comunicación abierta para alcanzar metas y visiones compartidas.',
  },
  {
    icon: <Zap className="h-10 w-10 text-primary mb-4" />,
    title: 'Agilidad',
    description: 'Adaptándonos al cambio de manera rápida y eficiente, aseguramos que tu proyecto se mantenga en curso y satisfaga las demandas cambiantes del mercado.',
  },
];

export default function MissionSection() {
  return (
    <Section id="mission" title="Nuestra Misión y Valores" className="bg-muted">
      <ScrollAnimationWrapper className="text-center max-w-3xl mx-auto mb-12 md:mb-16 opacity-0" animationClass="animate-fade-in-up">
        <p className="text-lg md:text-xl text-foreground">
          Empoderar a las empresas con soluciones web transformadoras que impulsen el crecimiento, mejoren las experiencias de usuario y creen valor duradero. Creemos en el poder de la tecnología para dar forma a un futuro mejor.
        </p>
      </ScrollAnimationWrapper>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <ScrollAnimationWrapper 
            key={value.title} 
            className="opacity-0" 
            animationClass="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <Card className="h-full text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col">
              <CardHeader className="items-center">
                {value.icon}
                <CardTitle className="font-headline text-2xl text-primary">{value.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>
        ))}
      </div>
    </Section>
  );
}
