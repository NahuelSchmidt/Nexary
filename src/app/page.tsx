import { Hero, Showcase } from '@/components/v2/dark';
import { BuildScene, CollageScene, ExperienceScene, ProductsScene, SaasScene, WordScene } from '@/components/v2/scenes';
import { Challenge, Faq, FinalCta, Process, Services, Voices } from '@/components/v2/light';

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <BuildScene />
      <ExperienceScene />
      <WordScene
        paragraphs={[
          'Nexary es una agencia de software argentina. Diseñamos y desarrollamos sistemas de gestión, SaaS, aplicaciones web y sitios para empresas y emprendedores.',
          'Ya son +100 usuarios que trabajan con nosotros, con sistemas administrativos, de stock y ventas, de gestión para gimnasios y complejos deportivos, de turnos y mucho más. Cada uno arranca igual: entendiendo tu negocio antes de escribir una línea de código.',
        ]}
      />
      <ProductsScene />
      <SaasScene />
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
