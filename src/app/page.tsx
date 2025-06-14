// src/app/page.tsx
import HeroSection from '@/components/sections/hero-section';
import MissionSection from '@/components/sections/mission-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import Section from '@/components/layout/section-layout';
import ProjectCard, { type Project } from '@/components/project-card';
import BlogPostSummary, { type BlogPost } from '@/components/blog-post-summary';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Cpu, Newspaper } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

// Sample data for previews
const previewProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform X',
    description: 'A full-featured e-commerce platform with advanced product management and secure payments.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Next.js', 'TypeScript', 'Stripe'],
    liveUrl: '/portfolio', // Link to full portfolio page
    dataAiHint: 'online store'
  },
  {
    id: '2',
    title: 'SaaS Dashboard Pro',
    description: 'An intuitive dashboard for a SaaS product, providing analytics and user management.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '/portfolio',
    dataAiHint: 'dashboard interface'
  },
  {
    id: '3',
    title: 'Community ForumHub',
    description: 'A dynamic community forum with real-time discussions and moderation tools.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Vue.js', 'Firebase', 'Nuxt.js'],
    liveUrl: '/portfolio',
    dataAiHint: 'forum discussion'
  },
];

const previewBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'demystifying-web-frameworks',
    title: 'Demystifying Modern Web Frameworks',
    summary: 'A deep dive into React, Vue, and Angular to help you choose.',
    date: '2024-07-15',
    author: 'Alex Chen',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'code syntax'
  },
  {
    id: '2',
    slug: 'importance-of-ui-ux',
    title: 'The Crucial Role of UI/UX',
    summary: 'Explore why intuitive design is paramount for success.',
    date: '2024-06-28',
    author: 'Maria Rodriguez',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'user interface'
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />

      <Section id="portfolio-preview" title="Featured Projects" className="bg-background">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {previewProjects.map((project, index) => (
             <ScrollAnimationWrapper
              key={project.id}
              className="opacity-0"
              animationClass="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </ScrollAnimationWrapper>
          ))}
        </div>
        <ScrollAnimationWrapper className="text-center opacity-0" animationClass="animate-fade-in-up" style={{animationDelay: "0.3s"}}>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group">
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollAnimationWrapper>
      </Section>

      <TestimonialsSection />
      
      <Section id="tech-suggester-cta" title="Need Tech Advice?" className="bg-muted">
        <ScrollAnimationWrapper className="text-center max-w-2xl mx-auto opacity-0" animationClass="animate-fade-in-up">
          <Cpu className="h-16 w-16 text-primary mx-auto mb-6 animate-subtle-pulse" />
          <h3 className="font-headline text-3xl font-bold mb-4 text-foreground">Let Our AI Guide You</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Not sure which technologies fit your project? Our AI-powered tool analyzes your needs and suggests the best tech stack.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/tech-suggester">
              Try Tech Suggester <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollAnimationWrapper>
      </Section>

      <Section id="blog-preview" title="Latest Insights" className="bg-background">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {previewBlogPosts.map((post, index) => (
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
        <ScrollAnimationWrapper className="text-center opacity-0" animationClass="animate-fade-in-up" style={{animationDelay: "0.2s"}}>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group">
            <Link href="/blog">
              Visit Our Blog <Newspaper className="ml-2 h-5 w-5 group-hover:rotate-[15deg] transition-transform" />
            </Link>
          </Button>
        </ScrollAnimationWrapper>
      </Section>
    </>
  );
}
