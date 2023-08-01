import React from "react";
import profile from "../public/images/profile.jpg";
import Image from "next/image";

const About = () => {
  return (
    <section className="my-40">
      <h1 className=" text-center text-5xl font-montserrat font-bold">
        About Me
      </h1>
      <div className="flex flex-col mx-4 lg:flex-row gap-6 justify-evenly items-center mt-10">
        <div className=" justify-center items-center flex flex-1 ">
          <Image width={250} height={250} src={profile} alt="" />
        </div>
        <div className="flex-1">
          <div>
            <h1 className="font-bold text-blue-600 text-4xl">Samsul kobir</h1>
            <h1 className="my-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam,
              ratione ad. Aut sit explicabo aliquam placeat quasi adipisci
              voluptates, a dolorum alias perspiciatis nisi natus, aliquid odit,
              doloribus voluptatem in?
            </h1>
          </div>
          <div>
            <p className="font-bold text-xl ">
              Full Name:{" "}
              <span className="text-blue-500 font-normal">samsul kobir</span>
            </p>
            <p className="font-bold text-xl ">
              Email:{" "}
              <span className="text-blue-500 font-normal">
                pixprocoder@gmail.com
              </span>{" "}
            </p>
            <p className="font-bold text-xl ">
              Phone:{" "}
              <span className="text-blue-500 font-normal">
                +40 0773 371 317
              </span>{" "}
            </p>
            <p className="font-bold text-xl ">
              Address:{" "}
              <span className="text-blue-500 font-normal">
                Bucharest, Romania{" "}
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
