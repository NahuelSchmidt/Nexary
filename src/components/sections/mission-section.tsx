
// src/components/sections/mission-section.tsx
import { Rocket, ShieldCheck, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const values = [
  {
    icon: <Zap className="h-10 w-10 text-primary mb-4" />,
    title: 'Eficiencia',
    description: 'Nuestra prioridad es eliminar fricciones operativas. Creamos software que ahorra tiempo real y recursos a tu equipo.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary mb-4" />,
    title: 'Confiabilidad',
    description: 'Entregamos sistemas robustos y seguros, construidos con tecnología moderna que garantiza estabilidad a largo plazo.',
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary mb-4" />,
    title: 'Escalabilidad',
    description: 'Desarrollamos soluciones preparadas para el futuro. Tu software crecerá junto con tu volumen de negocio sin límites técnicos.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary mb-4" />,
    title: 'Enfoque de Negocio',
    description: 'No solo escribimos código; entendemos tus metas empresariales para construir la herramienta exacta que necesitás.',
  },
];

export default function MissionSection() {
  return (
    <Section id="mission" title="Eficiencia y Crecimiento a través de la Tecnología" className="bg-muted">
      <ScrollAnimationWrapper className="text-center max-w-3xl mx-auto mb-12 md:mb-16 opacity-0" animationClass="animate-fade-in-up">
        <p className="text-lg md:text-xl text-foreground">
          En Nexary, nuestra misión es empoderar a las empresas mediante software estratégico que impulse la productividad, mejore la experiencia del cliente y cree valor duradero. Creemos en la tecnología como el motor de la eficiencia empresarial.
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
