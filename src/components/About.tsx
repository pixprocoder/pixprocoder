"use client";
import React, { useEffect } from "react";
import profile from "../assets/images/about-me.png";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section id="about" className="pt-8 my-40">
      <div>
        <h1 className=" text-center text-5xl font-montserrat font-bold">
          About Me
        </h1>
        <p className="text-center hidden lg:block   mx-auto my-4">
          My Name is <span>Samsul Kobir</span>. I am a Full Stack web Developer.
        </p>
      </div>
      <div className="flex flex-col mx-4 lg:flex-row gap-6 justify-evenly items-center mt-10">
        <div
          data-aos="zoom-in"
          className=" justify-center items-center flex flex-1 "
        >
          <Image width={500} height={500} src={profile} alt="" />
        </div>
        <div className="flex-1">
          <div>
            <h1 className="font-bold text-blue-600 text-4xl">🧑🏼‍💻</h1>
            <h1 className="my-4">
              Hello there, I'm Samsul kobir, a versatile professional with a
              passion for crafting digital experiences that seamlessly blend
              innovation and aesthetics. With a background in full-stack web
              development and a flair for graphic design, I bring a unique blend
              of technical prowess and creative finesse to every project I
              undertake.
            </h1>
          </div>
          {/* <div className=" border rounded-md p-4 gap-10">
            <p className="font-bold text-xl ">
              Full Name:{" "}
              <span className="text-blue-500 font-semibold ml-4">
                Samsul Kobir
              </span>
            </p>
            <p className="font-bold text-xl ">
              Email:{" "}
              <span className="text-blue-500 font-semibold ml-4">
                pixprocoder@gmail.com
              </span>{" "}
            </p>
            <p className="font-bold text-xl ">
              Phone:{" "}
              <span className="text-blue-500 font-semibold ml-4">
                +40 0773 371 317
              </span>{" "}
            </p>
            <p className="font-bold text-xl ">
              Address:{" "}
              <span className="text-blue-500 font-semibold ml-4">
                Bucharest, Romania{" "}
              </span>{" "}
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
