import About from "@/components/About";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";

export default function Home() {
  return (
    <section className=" text-white">
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <h1>Contact</h1>
    </section>
  );
}
