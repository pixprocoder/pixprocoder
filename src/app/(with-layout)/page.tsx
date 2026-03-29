import FAQPage from '@/src/components/FAQ';
import Hero from '@/src/components/Hero';
import Portfolio from '@/src/components/Portfolio';
import Skills from '@/src/components/Skills';
import BentoGrid from '@/src/components/BentoGrid';
import RecentPosts from '@/src/components/RecentPosts';
import Testimonials from '@/src/components/Testimonials';

export default function Home() {
  return (
    <section className="lg:container mx-auto">
      <Hero />
      <BentoGrid />
      <RecentPosts />
      {/* <About /> */}
      <Portfolio />
      <Skills />
      {/* <Services /> */}
      <Testimonials />
      <FAQPage />
      {/* <Contact /> */}
    </section>
  );
}
