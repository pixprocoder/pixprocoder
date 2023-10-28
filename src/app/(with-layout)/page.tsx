import About from "@/src/components/About";
import Contact from "@/src/components/Contact";
import FAQPage from "@/src/components/FAQ";
import Hero from "@/src/components/Hero";
import Portfolio from "@/src/components/Portfolio";
import Services from "@/src/components/Services";
import Skills from "@/src/components/Skills";

export default function Home() {
  return (
    <section className=" text-white">
      <Hero />
      {/* <OverviewCard /> */}
      <About />
      <Portfolio />
      <Skills />
      <Services />
      <FAQPage />
      <Contact />
    </section>
  );
}
