// src/app/blog/page.tsx
import BlogPostSummary, { type BlogPost } from '@/components/blog-post-summary';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'demystifying-web-frameworks',
    title: 'Desmitificando los Frameworks Web Modernos: React vs. Vue vs. Angular',
    summary: 'Un análisis profundo de los pros y contras de los frameworks de frontend más populares para ayudarte a elegir el adecuado para tu próximo proyecto.',
    date: '2024-07-15',
    author: 'Alex Chen',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'coding screen',
    category: 'Frameworks'
  },
  {
    id: '2',
    slug: 'importance-of-ui-ux',
    title: 'El Papel Crucial de UI/UX en el Éxito del Desarrollo Web',
    summary: 'Explora por qué el diseño intuitivo y la experiencia del usuario son primordiales para crear aplicaciones web exitosas que los usuarios amen.',
    date: '2024-06-28',
    author: 'Maria Rodriguez',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'design sketch',
    category: 'Diseño'
  },
  {
    id: '3',
    slug: 'mastering-serverless-architecture',
    title: 'Dominando Serverless: Guía para Construir Aplicaciones Escalables',
    summary: 'Aprende los fundamentos de la arquitectura serverless y cómo puede ayudarte a construir servicios web rentables y altamente escalables.',
    date: '2024-05-10',
    author: 'David Lee',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cloud computing',
    category: 'Backend'
  },
  {
    id: '4',
    slug: 'ai-in-web-development',
    title: 'El Futuro es Ahora: Cómo la IA está Revolucionando el Desarrollo Web',
    summary: 'Descubre las últimas herramientas y técnicas de IA que están transformando el panorama del desarrollo web, desde la generación de código hasta experiencias de usuario personalizadas.',
    date: '2024-04-22',
    author: 'Sophia Miller',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'artificial intelligence brain',
    category: 'IA & ML'
  },
];

export default function BlogPage() {
  return (
    <div className="bg-gradient-to-b from-background via-muted to-background min-h-screen">
    <Section id="blog" title="Ideas y Perspectivas de Nexary" className="pt-28 md:pt-36">
      <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
        Mantente actualizado con las últimas tendencias, consejos y mejores prácticas en desarrollo web. Nuestros expertos comparten sus conocimientos para ayudarte a navegar el mundo digital en constante evolución.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <ScrollAnimationWrapper
            key={post.id}
            className="opacity-0"
            animationClass="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <BlogPostSummary post={post} />
          </ScrollAnimationWrapper>
        ))}
      </div>
    </Section>
    </div>
  );
}
