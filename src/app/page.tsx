import { Hero, Showcase } from '@/components/v2/dark';
import { CollageScene, ExperienceScene, PillScene, ProductsScene, SaasScene, WordScene } from '@/components/v2/scenes';
import { Challenge, Faq, FinalCta, Process, Services, Voices } from '@/components/v2/light';

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <PillScene />
      <ExperienceScene />
      <WordScene
        paragraphs={[
          'Nexary es una agencia de software argentina. Diseñamos y desarrollamos sistemas de gestión, SaaS, aplicaciones web y sitios para empresas y emprendedores.',
          'Ya son +100 usuarios los que trabajan con nuestros sistemas en gimnasios, complejos deportivos, comercios, negocios con turnos y más. Cada uno arranca igual: entendiendo tu negocio antes de escribir una línea de código.',
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
