// src/components/sections/mission-section.tsx
import { Rocket, Lightbulb, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const values = [
  {
    icon: <Rocket className="h-10 w-10 text-primary mb-4" />,
    title: 'Innovation',
    description: 'We continuously explore new technologies and approaches to deliver cutting-edge solutions that drive success.',
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary mb-4" />,
    title: 'Quality',
    description: 'Our commitment to excellence ensures robust, reliable, and high-performing web applications every time.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary mb-4" />,
    title: 'Collaboration',
    description: 'We work closely with our clients, fostering open communication to achieve shared goals and visions.',
  },
  {
    icon: <Zap className="h-10 w-10 text-primary mb-4" />,
    title: 'Agility',
    description: 'Adapting to change swiftly and efficiently, we ensure your project stays on track and meets evolving market demands.',
  },
];

export default function MissionSection() {
  return (
    <Section id="mission" title="Our Mission & Values" className="bg-muted">
      <ScrollAnimationWrapper className="text-center max-w-3xl mx-auto mb-12 md:mb-16 opacity-0" animationClass="animate-fade-in-up">
        <p className="text-lg md:text-xl text-foreground">
          To empower businesses with transformative web solutions that drive growth, enhance user experiences, and create lasting value. We believe in the power of technology to shape a better future.
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
