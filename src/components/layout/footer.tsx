import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { GITHUB_URL, navLinks, whatsAppLink } from '@/lib/site';
import Logo from '@/components/layout/logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink/[0.07]">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Software a medida para empresas que quieren crecer con tecnología.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4 text-muted-foreground">Navegación</p>
          <ul className="space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/portfolio" className="text-muted-foreground transition-colors hover:text-foreground">
                Todos los proyectos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-muted-foreground">Contacto</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary">
                WhatsApp <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </li>
            <li className="text-muted-foreground">La Plata, Buenos Aires, AR</li>
          </ul>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="container-x select-none" aria-hidden="true">
        <p className="bg-gradient-to-b from-ink/[0.09] to-transparent bg-clip-text text-center text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent md:text-[17vw] lg:text-[220px]">
          nexary
        </p>
      </div>

      <div className="container-x flex flex-col items-center justify-between gap-2 border-t border-ink/[0.07] py-6 font-mono text-xs text-muted-foreground sm:flex-row">
        <span>© {year} Nexary. Todos los derechos reservados.</span>
        <span>34.92° S — 57.95° W</span>
      </div>
    </footer>
  );
}
