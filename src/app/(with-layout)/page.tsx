import About from '@/src/components/About';
import FAQPage from '@/src/components/FAQ';
import Hero from '@/src/components/Hero';
import Portfolio from '@/src/components/Portfolio';
import Skills from '@/src/components/Skills';
import { OverviewCard } from '@/src/components/OverviewCard';
import Testimonials from '@/src/components/Testimonials';

export default function Home() {
  return (
    <section className="lg:container mx-auto px-4 ">
      <Hero />
      <OverviewCard />
      {/* <BlogPage /> */}
      <About />
      <Portfolio />
      <Skills />
      {/* <Services /> */}
      <FAQPage />
      <Testimonials />
      {/* <Contact /> */}
    </section>
  );
}

/**
 * what is programmingF?
 * Yes that is pretty cool :)
 * I do love this
 * an everyt
 * */

/**
 *
 * Oh my goodness that is pretty cool.
 * I can write code on neovim.
 * I do love to write code in neovim.
 * I have to be more productive.
 * I can code more effeciently.
 * so that is really cool
 * */
