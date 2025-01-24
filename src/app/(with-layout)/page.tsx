import About from "@/src/components/About";
import FAQPage from "@/src/components/FAQ";
import Hero from "@/src/components/Hero";
import { OverviewCard } from "@/src/components/OverviewCard";
import Portfolio from "@/src/components/Portfolio";
import Skills from "@/src/components/Skills";

export default function Home() {
  return (
    <section className="lg:container mx-auto px-4 text-white">
      <Hero />
      <OverviewCard />
      {/* <BlogPage /> */}
      <About />
      <Portfolio />
      <Skills />
      {/* <Services /> */}
      <FAQPage />
      {/* <Contact /> */}
    </section>
  );
}
