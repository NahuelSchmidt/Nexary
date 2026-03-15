// src/components/whatsapp-floating-button.tsx
"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.12.552 4.19 1.598 6.02L0 24l6.125-1.606a11.82 11.82 0 005.922 1.597h.005c6.635 0 12.05-5.414 12.05-12.05 0-3.212-1.25-6.232-3.522-8.503z" />
  </svg>
);

export default function WhatsAppFloatingButton() {
  const phoneNumber = "2974299808";
  const message = "Hola! Vi la web de Nexary y me interesa desarrollar una web o sistema para mi empresa. ¿Podemos hablar sobre el proyecto?";
  const whatsAppLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[100] group flex items-center">
      {/* Texto Desplegable */}
      <div className="mr-3 px-4 py-2 bg-white border border-black/10 shadow-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
        <p className="text-black font-bold text-sm">Hablemos de tu proyecto</p>
      </div>

      {/* Botón */}
      <Link
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-subtle",
          "flex items-center justify-center"
        )}
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </Link>
    </div>
  );
}
