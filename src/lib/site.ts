export const WHATSAPP_NUMBER = '5492216229441';

const WHATSAPP_MESSAGE =
  'Hola! Vi la web de Nexary y me interesa desarrollar una web o sistema para mi empresa. ¿Podemos hablar sobre el proyecto?';

export const whatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Secondary path for people who only need a website (systems stay the main call to action)
const WHATSAPP_WEB_MESSAGE = 'Hola! Vi la web de Nexary y quiero una página web para mi negocio. ¿Podemos hablar?';
export const whatsAppWebLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_WEB_MESSAGE)}`;

export const navLinks = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#proceso', label: 'Proceso' },
  { href: '/contact', label: 'Contacto' },
];

export const GITHUB_URL = 'https://github.com/NahuelSchmidt';
