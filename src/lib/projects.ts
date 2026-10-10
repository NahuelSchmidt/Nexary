export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  highlights: string[];
  techStack: string[];
  imageUrl: string;
  liveUrl: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'nexagym',
    title: 'NexaGym',
    category: 'SaaS · Fitness',
    year: '2026',
    description:
      'Plataforma de gestión para gimnasios que automatiza cobros, altas, control de accesos y recordatorios desde un solo panel.',
    highlights: ['Cobros y membresías automáticas', 'Panel de métricas en vivo', 'Recordatorios por WhatsApp'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    imageUrl: '/img/nexagym.jpg',
    liveUrl: 'https://saas-gym-orpin.vercel.app/',
    featured: true,
  },
  {
    id: 'sportnex',
    title: 'SportNex',
    category: 'SaaS · Deportes',
    year: '2026',
    description:
      'Sistema para complejos deportivos: reservas online de canchas, torneos, clases y cobros, con la facturación de cada hora a la vista.',
    highlights: ['Reservas en 4 segundos', 'Torneos y clases', 'Reportes de facturación'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    imageUrl: '/img/sportnex.jpg',
    liveUrl: 'https://sportnex-kappa.vercel.app/',
    featured: true,
  },
  {
    id: 'turnos-ya',
    title: 'Turnify',
    category: 'SaaS · Agenda',
    year: '2025',
    description:
      'Gestión integral de turnos que automatiza la agenda y las reservas online, reduciendo el trabajo administrativo manual.',
    highlights: ['Reservas online 24/7', 'Agenda centralizada', 'Recordatorios automáticos'],
    techStack: ['Next.js', 'Tailwind CSS'],
    imageUrl: '/img/turnify.jpg',
    liveUrl: 'https://turnos-ya-demo.vercel.app/',
    featured: true,
  },
  {
    id: 'mana',
    title: 'Insumos Mana',
    category: 'Web institucional · B2B',
    year: '2025',
    description:
      'Sitio institucional con catálogo optimizado para una empresa de insumos industriales, pensado para captar clientes B2B.',
    highlights: ['Catálogo optimizado', 'SEO técnico'],
    techStack: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: '/img/mana.png',
    liveUrl: 'https://www.insumosmana.net/',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Dev',
    category: 'Marca personal',
    year: '2025',
    description:
      'Portfolio de alta performance para un desarrollador, optimizado para carga instantánea y visibilidad en buscadores.',
    highlights: ['Carga instantánea', 'Diseño UI/UX'],
    techStack: ['Diseño UI/UX', 'Optimización'],
    imageUrl: '/img/portfolio.png',
    liveUrl: 'https://portfolio-nahuelschmidt.vercel.app/',
  },
];
