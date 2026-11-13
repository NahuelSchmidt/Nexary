import { Hero, Showcase } from '@/components/v2/dark';
import { CollageScene, ExperienceScene, OrbScene, PillScene, ProductsScene, WordScene } from '@/components/v2/scenes';
import { Challenge, Faq, FinalCta, Process, Services, Voices } from '@/components/v2/light';

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <OrbScene />
      <PillScene />
      <ExperienceScene />
      <WordScene
        paragraphs={[
          'Nexary es un estudio de software argentino. Diseñamos y desarrollamos sistemas de gestión, SaaS, aplicaciones web y sitios para empresas y emprendedores.',
          'Ya hay +10 proyectos nuestros funcionando: gimnasios, complejos deportivos, comercios, agendas de turnos y más. Cada uno arranca igual: entendiendo tu negocio antes de escribir una línea de código.',
        ]}
      />
      <ProductsScene />
      <CollageScene />
      <Challenge />
      <Services />
      <Process />
      <Voices />
      <Faq />
      <FinalCta />
    </>
  );
}
