"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const primaryNavLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#services', label: 'Servicios' },
  { href: '/#portfolio-preview', label: 'Proyectos' },
];

const whatsAppLink = "https://wa.me/2974299808?text=Hola!%20Vi%20la%20web%20de%20Nexary%20y%20me%20interesa%20desarrollar%20una%20web%20o%20sistema%20para%20mi%20empresa.%20%C2%BFPodemos%20hablar%20sobre%20el%20proyecto%3F";

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
          <Link href="/" className="flex items-center group">
            <img src="/Nexary.png" alt="Nexary" className="header-logo h-10 w-auto" />
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
                <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">Contáctanos</a>
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
                  <Link href="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src="/Nexary.png" alt="Nexary" className="header-logo h-8 w-auto" />
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Cerrar menú">
                      <X className="h-6 w-6 text-foreground" />
                    </Button>
                  </SheetTrigger>
                </div>
                
                <nav className="flex flex-col space-y-4 flex-grow">
                  {primaryNavLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contáctanos
                  </a>
                </nav>
                 <Button asChild className="w-full mt-auto" size="lg" onClick={() => setIsMobileMenuOpen(false)}>
                    <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">Chatear ahora</a>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}