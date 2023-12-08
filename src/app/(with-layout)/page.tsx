import About from "@/src/components/About";
import Contact from "@/src/components/Contact";
import FAQPage from "@/src/components/FAQ";
import Hero from "@/src/components/Hero";
import Portfolio from "@/src/components/Portfolio";
import Services from "@/src/components/Services";
import Skills from "@/src/components/Skills";
import BlogPage from "../(blog)/blog/page";
import { OverviewCard } from "@/src/components/OverviewCard";

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
