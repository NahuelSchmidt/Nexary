import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground border-t border-border">
      <ScrollAnimationWrapper animationClass="animate-fade-in-up" className="opacity-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="flex items-center space-x-2 group mb-4">
                <img src="/Nexary.png" alt="Nexary" className="h-8 w-auto" />
              </Link>
              <p className="text-sm text-center md:text-left">
                Creando excelencia digital, una línea de código a la vez.
              </p>
            </div>

            <div className="text-center md:col-span-1">
              <p className="text-sm">
                &copy; {currentYear} Nexary. Todos los derechos reservados.
              </p>
            </div>

            <div className="flex justify-center md:justify-end space-x-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </footer>
  );
}