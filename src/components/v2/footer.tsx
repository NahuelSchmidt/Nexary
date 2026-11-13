import Link from 'next/link';
import { LogoMark } from '@/components/layout/logo';
import { whatsAppLink, GITHUB_URL } from '@/lib/site';
import { FooterWave } from '@/components/v2/scenes';

export default function Footer() {
  return (
    <footer className="v2-light border-t border-black/5">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="text-lg">
            La agencia <span className="text-primary">Nexary</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/55">
            Agencia de software argentina. Diseñamos y desarrollamos sistemas de gestión, SaaS, aplicaciones web y sitios a medida para
            empresas que quieren crecer con tecnología.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm md:col-span-7 md:grid-cols-3">
          <div className="space-y-3">
            <p className="font-medium">Agencia</p>
            <Link href="/#servicios" className="block text-black/55 hover:text-black">Servicios</Link>
            <Link href="/#proyectos" className="block text-black/55 hover:text-black">Proyectos</Link>
            <Link href="/#proceso" className="block text-black/55 hover:text-black">Cómo trabajamos</Link>
            <Link href="/#faq" className="block text-black/55 hover:text-black">Preguntas</Link>
          </div>
          <div className="space-y-3">
            <p className="font-medium">Contacto</p>
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="block text-black/55 hover:text-black">WhatsApp</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="block text-black/55 hover:text-black">GitHub</a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-3 border-t border-black/5 px-6 py-8 text-xs text-black/45 md:flex-row md:px-10">
        <span className="flex items-center gap-2">
          <LogoMark className="h-4 w-4" /> © {new Date().getFullYear()} Nexary. Todos los derechos reservados.
        </span>
        <span>Software a medida</span>
      </div>
      <FooterWave />
    </footer>
  );
}
