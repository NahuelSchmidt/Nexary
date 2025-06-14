// src/components/testimonial-card.tsx
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  text: string;
  avatarUrl?: string;
  dataAiHint: string;
  rating?: number;
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card flex flex-col group">
      <CardContent className="p-6 flex-grow flex flex-col">
        {testimonial.rating && (
          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        )}
        <p className="text-muted-foreground italic mb-6 text-base leading-relaxed flex-grow relative">
          <span className="absolute -left-3 -top-1 text-4xl text-primary opacity-50 font-serif">&ldquo;</span>
          {testimonial.text}
          <span className="absolute -right-1 -bottom-3 text-4xl text-primary opacity-50 font-serif">&rdquo;</span>
        </p>
        <div className="flex items-center mt-auto pt-4 border-t border-border">
          <Avatar className="h-12 w-12 mr-4 border-2 border-primary group-hover:border-accent transition-colors duration-300">
            <AvatarImage src={testimonial.avatarUrl || `https://placehold.co/100x100.png?text=${testimonial.name.charAt(0)}`} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
            <AvatarFallback>{testimonial.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground font-headline group-hover:text-primary transition-colors duration-300">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
