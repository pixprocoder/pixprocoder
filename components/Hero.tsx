import Image from "next/image";
import banner from "../public/images/banner.png";
import Button from "./Button";

const Hero = () => {
  return (
    <section
      id="home"
      className="flex flex-col px-4 lg:p-0 lg:flex-row lg:pt-20 my-10 justify-center lg:items-center"
    >
      <div className="flex-1 ">
        <h1 className="text-4xl hidden lg:block font-semibold font-montserrat ">
          HI, <span className="text-[#0084FF]">I'm</span>
        </h1>
        <h1 className="text-5xl lg:text-7xl font-bold">
          <span className="text-[#0084FF]">SAMSUL</span> KOBIR
        </h1>
        <div className="my-8 text-xl space-y-3 lg:text-3xl border-l-2 px-2 border-cyan-600">
          <p className="">Programmer</p>
          <p className="">Graphic Designer</p>
          <p className="">Full-Stack Web Developer</p>
        </div>

        <div className="flex space-x-4 my-4">
          <Button bgColor="bg-gray-800" title="Explore More" />
          <Button title="Hire Me" />
        </div>
      </div>
      <div className="flex-1 hidden lg:block">
        <Image src={banner} alt="hero" />
      </div>
    </section>
  );
};

export default Hero;
