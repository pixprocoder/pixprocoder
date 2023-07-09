import Image from "next/image";
import banner from "../public/banner.png";
import Button from "./Button";

import { BiSolidRightArrow } from "react-icons/bi";
const Hero = () => {
  return (
    <section className="flex flex-col px-4 lg:p-0 lg:flex-row my-10 justify-center lg:items-center">
      <div className="flex-1 ">
        <h1 className="text-4xl font-semibold font-montserrat ">
          HI, <span className="text-[#0084FF]">I'm</span>
        </h1>
        <h1 className="text-4xl lg:text-7xl font-bold">
          <span className="text-[#0084FF]">SAMSUL</span> KOBIR
        </h1>
        <div className="my-8 text-xl lg:text-3xl">
          <p className=" flex mt-2 items-center gap-2">
            <BiSolidRightArrow className="text-[#0084FF]" /> Programmer
          </p>
          <p className=" flex my-2 items-center gap-2">
            <BiSolidRightArrow className="text-[#0084FF]" /> Graphic Designer
          </p>
          <p className=" flex mt-2 items-center gap-2">
            <BiSolidRightArrow className="text-[#0084FF]" /> Full-Stack Web
            Developer
          </p>
        </div>

        <div className="flex space-x-4 my-4">
          <Button title="Explore More" />
          <Button title="Hire Me" bgColor="bg-gray-800" />
        </div>
      </div>
      <div className="flex-1 hidden lg:block">
        <Image src={banner} alt="hero" />
      </div>
    </section>
  );
};

export default Hero;
