"use client";
import Image from "next/image";
import banner from "../assets/images/banner.png";
import { useEffect, useState } from "react";
import HireMeModalPage from "./shared/Modal";
import { Link as ScrollLink } from "react-scroll";
import TypedText from "./shared/TypedText";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <section
      id="home"
      className="flex flex-col px-4 lg:p-0 lg:flex-row pt-20 my-10 justify-center lg:items-center"
    >
      <div className="flex-1  ">
        <h1 className="text-4xl hidden lg:block font-semibold font-montserrat ">
          HI, <span className="text-[#0084FF]">I'm</span>
        </h1>
        <h1 className="text-5xl lg:text-7xl font-bold">
          <span className="text-[#0084FF]">SAMSUL</span> KOBIR
        </h1>

        <div className="my-8 flex gap-2 text-blue-600 text-xl items-center space-y-3 lg:text-3xl border-l-2 px-2 border-cyan-600">
          💻 <TypedText />
        </div>

        <div className="flex space-x-4 my-4">
          <Link href="/portfolio">
            <Button>Portfolio</Button>
          </Link>
          <div>
            <div className="w-20 box h-20 "></div>
            <div className=" box-2 h-20 "></div>
            <div className=" box-3 h-20 "></div>
            <span onClick={openModal}>
              <Link href="/blog">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500  hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500">
                  Explore Blog
                </Button>
              </Link>
            </span>
            <HireMeModalPage showModal={showModal} closeModal={closeModal} />
          </div>
        </div>
      </div>
      <div className="flex-1 hidden lg:block">
        <Image src={banner} alt="hero" />
      </div>
    </section>
  );
};

export default Hero;
