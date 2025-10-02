// src/components/layout/navbar.tsx
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

// Define los enlaces de navegación principales (sin "Contáctanos", que es un botón separado en escritorio)
const primaryNavLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/portfolio', label: 'Portafolio' },
  { href: '/blog', label: 'Blog' },
];

// Enlaces para el menú móvil: incluye los primarios y "Contáctanos" como un enlace en la lista
const mobileNavListLinks = [
  ...primaryNavLinks,
  { href: '/contact', label: 'Contáctanos' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <Code2 className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
            <span className="font-headline text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              OpenCode
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {primaryNavLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium text-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </Link>
            ))}
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                <Link href="/contact">Contáctanos</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menú">
                  <Menu className="h-6 w-6 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-background p-6 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" className="flex items-center space-x-2 group" onClick={() => setIsMobileMenuOpen(false)}>
                    <Code2 className="h-7 w-7 text-primary" />
                    <span className="font-headline text-xl font-bold text-foreground">OpenCode</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Cerrar menú">
                      <X className="h-6 w-6 text-foreground" />
                    </Button>
                  </SheetTrigger>
                </div>
                
                <nav className="flex flex-col space-y-4 flex-grow">
                  {mobileNavListLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                 <Button asChild className="w-full mt-auto" size="lg" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/contact">Contáctanos</Link>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
