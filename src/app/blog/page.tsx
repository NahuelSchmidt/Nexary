// src/app/blog/page.tsx
import BlogPostSummary, { type BlogPost } from '@/components/blog-post-summary';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'demystifying-web-frameworks',
    title: 'Demystifying Modern Web Frameworks: React vs. Vue vs. Angular',
    summary: 'A deep dive into the pros and cons of the most popular frontend frameworks to help you choose the right one for your next project.',
    date: '2024-07-15',
    author: 'Alex Chen',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'coding screen',
    category: 'Frameworks'
  },
  {
    id: '2',
    slug: 'importance-of-ui-ux',
    title: 'The Crucial Role of UI/UX in Web Development Success',
    summary: 'Explore why intuitive design and user experience are paramount for creating successful web applications that users love.',
    date: '2024-06-28',
    author: 'Maria Rodriguez',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'design sketch',
    category: 'Design'
  },
  {
    id: '3',
    slug: 'mastering-serverless-architecture',
    title: 'Mastering Serverless: A Guide to Building Scalable Applications',
    summary: 'Learn the fundamentals of serverless architecture and how it can help you build cost-effective and highly scalable web services.',
    date: '2024-05-10',
    author: 'David Lee',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cloud computing',
    category: 'Backend'
  },
  {
    id: '4',
    slug: 'ai-in-web-development',
    title: 'The Future is Now: How AI is Revolutionizing Web Development',
    summary: 'Discover the latest AI tools and techniques that are transforming the web development landscape, from code generation to personalized user experiences.',
    date: '2024-04-22',
    author: 'Sophia Miller',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'artificial intelligence brain',
    category: 'AI & ML'
  },
];

export default function BlogPage() {
  return (
    <div className="bg-gradient-to-b from-background via-muted to-background min-h-screen">
    <Section id="blog" title="Insights & Ideas from OpenCode" className="pt-28 md:pt-36">
      <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
        Stay updated with the latest trends, tips, and best practices in web development. Our experts share their knowledge to help you navigate the ever-evolving digital world.
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
      {/* TODO: Add pagination or load more button if many posts */}
    </Section>
    </div>
  );
}
