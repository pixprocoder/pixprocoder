import About from "@/components/About";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  return (
    <section className=" text-white">
      <Hero />
      <About />
      <Portfolio />
      <h1>Services</h1>
      <h1>Contact</h1>
    </section>
  );
}
