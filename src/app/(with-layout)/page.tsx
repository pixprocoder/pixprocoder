import FAQPage from '@/src/components/FAQ';
import Hero from '@/src/components/Hero';
import RecentPosts from '@/src/components/RecentPosts';
import SelectedWork from '@/src/components/SelectedWork';
import Skills from '@/src/components/Skills';
import Testimonials from '@/src/components/Testimonials';

export default function Home() {
  return (
    <section>
      <Hero />
      <RecentPosts />
      <SelectedWork />
      <Skills />
      <Testimonials />
      <FAQPage />
    </section>
  );
}
