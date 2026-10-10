export type Testimonial = {
  name: string;
  /** Business type or role, e.g. "Barbería" */
  role: string;
  /** Id from src/lib/projects.ts, used to label and link the product */
  projectId?: string;
  quote: string;
};

// Real testimonials. Source: Turnify landing (turnos-ya-demo.vercel.app).
export const testimonials: Testimonial[] = [
  {
    name: 'Martín',
    role: 'Barbería',
    projectId: 'turnos-ya',
    quote:
      'Antes tenía todos los turnos anotados en WhatsApp y era un caos. Ahora mis clientes reservan solos y yo simplemente entro a Turnify y veo mi agenda.',
  },
  {
    name: 'Camila',
    role: 'Peluquería',
    projectId: 'turnos-ya',
    quote:
      'Mis clientes pueden reservar incluso cuando estoy trabajando y no puedo responder mensajes. Cuando termino, ya tengo la agenda organizada.',
  },
  {
    name: 'Sofía',
    role: 'Manicuría',
    projectId: 'turnos-ya',
    quote:
      'Lo que más me gusta es que puedo compartir el link en Instagram y las clientas eligen directamente el servicio y horario. Me ahorró muchísimo tiempo.',
  },
  {
    name: 'Valentina',
    role: 'Estudio de Pilates',
    projectId: 'turnos-ya',
    quote:
      'Necesitaba algo simple para organizar las clases y los cupos. Turnify me solucionó la parte de reservas sin tener que estar pendiente del teléfono todo el día.',
  },
  {
    name: 'Julieta',
    role: 'Centro de estética',
    projectId: 'turnos-ya',
    quote:
      'Ahora tengo mis servicios, horarios y reservas organizados en un mismo lugar. Además, puedo compartir mi link de reservas directamente desde Instagram.',
  },
  {
    name: 'Facundo',
    role: 'Peluquería canina',
    projectId: 'turnos-ya',
    quote:
      'Antes coordinaba cada turno manualmente por WhatsApp. Con Turnify mis clientes pueden elegir el horario disponible y yo tengo todo ordenado en mi agenda.',
  },
  {
    name: 'Florencia',
    role: 'Profesional de estética',
    projectId: 'turnos-ya',
    quote:
      'La posibilidad de tener un link propio de reservas me resultó súper práctica. Lo puse en mi Instagram y mis clientas pueden sacar turno sin tener que escribirme.',
  },
];
