import About from "@/components/About";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <section className=" text-white">
      <Hero />
      <About />
      <h1>Portfolio</h1>
      <h1>Services</h1>
      <h1>Contact</h1>
    </section>
  );
}
