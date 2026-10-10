const stack = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Firebase', 'Vercel', 'APIs REST', 'Automatización'];

export default function TechMarquee() {
  const items = [...stack, ...stack];
  return (
    <section aria-label="Tecnologías" className="relative border-y border-ink/[0.07] py-6">
      <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <ul className="flex shrink-0 animate-marquee items-center gap-12 pr-12 motion-reduce:animate-none">
          {items.map((tech, i) => (
            <li key={i} className="flex items-center gap-12 whitespace-nowrap font-mono text-sm text-muted-foreground">
              {tech}
              <span className="h-1 w-1 rounded-full bg-primary/60" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
