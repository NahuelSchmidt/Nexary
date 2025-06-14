// src/components/blog-post-summary.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  author: string;
  imageUrl?: string;
  dataAiHint: string;
  category?: string;
};

interface BlogPostSummaryProps {
  post: BlogPost;
}

export default function BlogPostSummary({ post }: BlogPostSummaryProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 flex flex-col h-full group">
      {post.imageUrl && (
        <CardHeader className="p-0">
          <Link href={`/blog/${post.slug}`} className="block aspect-video relative overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={post.dataAiHint}
            />
          </Link>
        </CardHeader>
      )}
      <CardContent className="p-6 flex-grow">
        {post.category && <Badge variant="outline" className="mb-2 text-primary border-primary">{post.category}</Badge>}
        <Link href={`/blog/${post.slug}`}>
          <CardTitle className="font-headline text-2xl mb-2 text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">{post.title}</CardTitle>
        </Link>
        <CardDescription className="text-muted-foreground mb-4 line-clamp-3">{post.summary}</CardDescription>
        <div className="text-xs text-muted-foreground flex items-center space-x-4">
          <span className="flex items-center"><UserCircle className="h-4 w-4 mr-1" /> {post.author}</span>
          <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1" /> {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 border-t mt-auto">
        <Link href={`/blog/${post.slug}`} className="text-primary hover:text-accent font-semibold group/link flex items-center transition-colors duration-300">
          Leer Más <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
}
