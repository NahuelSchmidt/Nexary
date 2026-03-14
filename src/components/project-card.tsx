
// src/components/project-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Layers } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  dataAiHint: string;
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 flex flex-col h-full group">
      <CardHeader className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={project.dataAiHint}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl mb-2 text-primary group-hover:text-accent transition-colors duration-300">{project.title}</CardTitle>
        <CardDescription className="text-muted-foreground mb-4 line-clamp-3">{project.description}</CardDescription>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 border-t mt-auto">
        <div className="flex justify-between w-full items-center">
          {project.liveUrl && (
            <Button asChild variant="ghost" size="sm" className="text-accent hover:text-accent-foreground hover:bg-accent/20 group/action">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Ver Demo <ExternalLink className="ml-2 h-4 w-4 group-hover/action:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
          {project.caseStudyUrl && (
             <Button asChild variant="link" size="sm" className="text-primary hover:text-accent">
               <Link href={project.caseStudyUrl}>
                 Caso de Estudio <Layers className="ml-2 h-4 w-4" />
               </Link>
             </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
