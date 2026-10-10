import type { Metadata } from 'next';
import { Sora, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import WhatsAppFloatingButton from '@/components/whatsapp-floating-button';
import CustomCursor from '@/components/effects/custom-cursor';
import { themeInitScript } from '@/lib/theme';
import { cn } from '@/lib/utils';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Nexary — Software a medida para empresas',
  description:
    'Nexary desarrolla plataformas web, sistemas de gestión y automatizaciones a medida para empresas que quieren crecer con tecnología.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Nexary — Software a medida para empresas',
    description: 'Plataformas web, paneles de gestión y automatización de procesos.',
    locale: 'es_AR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn(sora.variable, geistMono.variable)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
        <CustomCursor />
      </body>
    </html>
  );
}
