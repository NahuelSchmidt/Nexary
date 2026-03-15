// src/app/contact/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Section from "@/components/layout/section-layout";
import { MessageCircle } from "lucide-react";

const whatsAppLink = "https://wa.me/2974299808?text=Hola!%20Vi%20la%20web%20de%20Nexary%20y%20me%20interesa%20desarrollar%20una%20web%20o%20sistema%20para%20mi%20empresa.%20%C2%BFPodemos%20hablar%20sobre%20el%20proyecto%3F";

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-background via-muted to-background min-h-screen flex items-center justify-center">
      <Section id="contact" className="pt-28 md:pt-36 w-full">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Ponte en <span className="text-primary">Contacto</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12">
            Hemos simplificado nuestra comunicación. Ahora atendemos todas las consultas directamente a través de WhatsApp para brindarte una respuesta más rápida y personalizada.
          </p>
          
          <Card className="shadow-2xl border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-primary">¡Hablemos!</CardTitle>
              <CardDescription>Haz clic en el botón de abajo para iniciar un chat con nosotros.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-10">
              <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#1DA851] text-white text-xl py-8 px-10 rounded-full group transition-all duration-300 transform hover:scale-105">
                <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <MessageCircle className="mr-3 h-8 w-8 animate-pulse" />
                  Escribinos por WhatsApp
                </a>
              </Button>
              <p className="mt-8 text-sm text-muted-foreground italic">
                Generalmente respondemos en menos de una hora durante el horario laboral.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}
