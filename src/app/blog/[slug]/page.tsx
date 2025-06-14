// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CalendarDays, UserCircle, ArrowLeft } from 'lucide-react';
import Section from '@/components/layout/section-layout';
import { type BlogPost } from '@/components/blog-post-summary'; // Reuse the type
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

// Placeholder data - in a real app, this would come from a CMS or database
const blogPosts: BlogPost[] = [
   {
    id: '1',
    slug: 'demystifying-web-frameworks',
    title: 'Demystifying Modern Web Frameworks: React vs. Vue vs. Angular',
    summary: 'A deep dive into the pros and cons of the most popular frontend frameworks to help you choose the right one for your next project.',
    date: '2024-07-15',
    author: 'Alex Chen',
    imageUrl: 'https://placehold.co/1200x600.png',
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
    imageUrl: 'https://placehold.co/1200x600.png',
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
    imageUrl: 'https://placehold.co/1200x600.png',
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
    imageUrl: 'https://placehold.co/1200x600.png',
    dataAiHint: 'artificial intelligence brain',
    category: 'AI & ML'
  },
];

// This function would fetch post data in a real app
async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return blogPosts.find(post => post.slug === slug);
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Placeholder content for the blog post body
  const placeholderContent = `
<p class="text-lg leading-relaxed mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<h3 class="text-2xl font-headline font-semibold mt-8 mb-4 text-primary">Subheading Example</h3>
<p class="text-lg leading-relaxed mb-6">Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum.</p>

<ul class="list-disc list-inside space-y-2 mb-6 text-lg">
  <li>Feature one discussed in detail.</li>
  <li>Another important point or feature.</li>
  <li>Benefits and advantages of this approach.</li>
</ul>

<p class="text-lg leading-relaxed">Pellentesque malesuada nulla nec leo. Donec tortor. Nam deftly a magna non nyaman. Curabitur arcu Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at valputate velit leo quis pede.</p>
  `;


  return (
    <div className="bg-background min-h-screen">
    <Section id="blog-post" className="pt-28 md:pt-36 pb-16 md:pb-24">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8 md:mb-12 text-center">
          {post.category && <Badge variant="default" className="mb-4 bg-primary text-primary-foreground">{post.category}</Badge>}
          <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">{post.title}</h1>
          <div className="text-sm text-muted-foreground flex items-center justify-center space-x-4">
            <span className="flex items-center"><UserCircle className="h-5 w-5 mr-1" /> {post.author}</span>
            <span className="flex items-center"><CalendarDays className="h-5 w-5 mr-1" /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {post.imageUrl && (
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8 md:mb-12 shadow-xl">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={post.dataAiHint}
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg lg:prose-xl max-w-none dark:prose-invert prose-headings:font-headline prose-headings:text-primary prose-a:text-accent hover:prose-a:text-primary transition-colors"
          dangerouslySetInnerHTML={{ __html: placeholderContent }}
        />

        <div className="mt-12 pt-8 border-t">
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </article>
    </Section>
    </div>
  );
}

// Add basic prose styling to globals.css if not already present or customize here
// For example, you might want to ensure prose class uses the body and headline fonts.
// This is usually handled by Tailwind typography plugin, but if not using it, add manual styles for .prose
// For now, relying on default browser styles for HTML rendered by dangerouslySetInnerHTML and Tailwind's preflight.
// Added prose classes from Tailwind Typography for better default styling.
// To make this work, `npm install -D @tailwindcss/typography` would be needed and added to tailwind.config.js plugins.
// For this exercise, I will assume the classes provide some basic styling.
