// src/components/success-story-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, CheckCircle2 } from 'lucide-react';

export type SuccessStory = {
  id: string;
  client: string;
  project: string;
  result: string;
  description: string;
  category: string;
};

interface SuccessStoryCardProps {
  story: SuccessStory;
}

export default function SuccessStoryCard({ story }: SuccessStoryCardProps) {
  return (
    <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 bg-card border-primary/10 group flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
            {story.category}
          </Badge>
          <TrendingUp className="h-5 w-5 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
        <CardTitle className="font-headline text-xl text-foreground group-hover:text-primary transition-colors">
          {story.client}
        </CardTitle>
        <p className="text-sm font-semibold text-muted-foreground">{story.project}</p>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col pt-0">
        <div className="bg-muted/50 p-3 rounded-md mb-4 border-l-4 border-primary">
          <p className="text-sm font-bold text-primary flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-2" /> Resultado Clave:
          </p>
          <p className="text-foreground font-medium">{story.result}</p>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {story.description}
        </p>
      </CardContent>
    </Card>
  );
}
