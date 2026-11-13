import '@/components/v2/v2.css';
import { Collage, Experience, Hero, Products, Showcase, Statement } from '@/components/v2/dark';
import { Challenge, Faq, FinalCta, Process, Services, Voices } from '@/components/v2/light';

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <Experience />
      <Statement />
      <Products />
      <Collage />
      <Challenge />
      <Services />
      <Process />
      <Voices />
      <Faq />
      <FinalCta />
    </>
  );
}
