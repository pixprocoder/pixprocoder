import About from "@/components/About";
import Contact from "@/components/Contact";
import FAQPage from "@/components/FAQ";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <section className=" text-white">
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Services />
      <FAQPage />
      <Contact />
    </section>
  );
}
