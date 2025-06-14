// src/app/portfolio/page.tsx
import ProjectCard, { type Project } from '@/components/project-card';
import Section from '@/components/layout/section-layout';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform X',
    description: 'A full-featured e-commerce platform with advanced product management, user accounts, and secure payments.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: '#',
    caseStudyUrl: '#',
    dataAiHint: 'online shopping'
  },
  {
    id: '2',
    title: 'SaaS Dashboard Pro',
    description: 'An intuitive dashboard for a SaaS product, providing analytics, user management, and settings configuration.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    liveUrl: '#',
    dataAiHint: 'data analytics'
  },
  {
    id: '3',
    title: 'Community ForumHub',
    description: 'A dynamic community forum with real-time discussions, user profiles, and moderation tools.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Vue.js', 'Firebase', 'Nuxt.js', 'Vuetify'],
    caseStudyUrl: '#',
    dataAiHint: 'social network'
  },
  {
    id: '4',
    title: 'AI-Powered Content Generator',
    description: 'A web application that uses AI to generate creative content based on user prompts, featuring a sleek and modern UI.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Python', 'Flask', 'React', 'OpenAI API', 'Material UI'],
    liveUrl: '#',
    dataAiHint: 'artificial intelligence'
  },
   {
    id: '5',
    title: 'Interactive Learning Platform',
    description: 'An engaging online learning platform with video courses, quizzes, and progress tracking for students.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Angular', 'NestJS', 'GraphQL', 'TypeORM', 'SCSS'],
    liveUrl: '#',
    caseStudyUrl: '#',
    dataAiHint: 'online education'
  },
  {
    id: '6',
    title: 'Mobile App Companion Site',
    description: 'A responsive landing page and support site for a popular mobile application, driving downloads and user engagement.',
    imageUrl: 'https://placehold.co/600x400.png',
    techStack: ['Gatsby', 'Contentful', 'Styled Components', 'Netlify'],
    dataAiHint: 'mobile app'
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-gradient-to-b from-background via-muted to-background min-h-screen">
      <Section id="portfolio" title="Our Creative Footprint" className="pt-28 md:pt-36">
        <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto">
          Explore a selection of projects that showcase our passion for innovation, quality, and impactful web solutions. Each project reflects our commitment to excellence and client success.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
      </Section>
    </div>
  );
}
