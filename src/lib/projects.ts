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
      'Página de reservas para negocios que trabajan con turnos: los clientes eligen el horario, pagan la seña y reciben la confirmación por WhatsApp.',
    highlights: ['Agenda online 24/7', 'Seña al reservar', 'Confirmación y recordatorios por WhatsApp'],
    techStack: ['Next.js', 'Tailwind CSS'],
    imageUrl: '/img/turnify.jpg',
    liveUrl: 'https://www.turnify.pro/',
    featured: true,
  },
  {
    id: 'stock-ventas',
    title: 'Stock y Ventas',
    category: 'SaaS · Comercios',
    year: '2026',
    description:
      'Sistema de stock y ventas para comercios: punto de venta, caja, fiado, proveedores y un catálogo online que recibe pedidos y reserva el stock solo.',
    highlights: ['Punto de venta y caja', 'Catálogo online con pedidos', 'Precios en dólares y cuotas'],
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    imageUrl: '/img/stock-ventas.jpg',
    liveUrl: 'https://stock-ventas.vercel.app/',
    featured: true,
  },
  {
    id: 'demo-gym',
    title: 'El Gimnasio',
    category: 'Landing · Fitness',
    year: '2026',
    description:
      'Landing de alto impacto para un gimnasio: servicios, planes con precios, galería, horarios y contacto, pensada para convertir visitas en socios.',
    highlights: ['Planes y precios', 'Diseño de alto impacto'],
    techStack: ['React', 'Vite'],
    imageUrl: '/img/demo-gym.jpg',
    liveUrl: 'https://demo-gym-sigma.vercel.app/',
  },
  {
    id: 'demo-cabanas',
    title: 'Patagonia Lodge',
    category: 'Landing · Turismo',
    year: '2026',
    description:
      'Landing para un complejo de cabañas en la Patagonia: experiencias, galería y reservas por WhatsApp, con una estética cálida y premium.',
    highlights: ['Reservas por WhatsApp', 'Estética premium'],
    techStack: ['React', 'Vite'],
    imageUrl: '/img/demo-cabanas.jpg',
    liveUrl: 'https://demo-cabanias.vercel.app/',
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
