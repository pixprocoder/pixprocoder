import React from "react";
import banner from "../public/images/banner.png";
import Image from "next/image";

const Services = () => {
  return (
    <section className="my-40">
      <h1 className=" text-center text-5xl font-montserrat font-bold ">
        Services
      </h1>

      <div className="mt-10">
        {/* Web Development service */}
        <div className="hero ">
          <div className="hero-content flex flex-col-reverse gap-20 lg:flex-row">
            <div className="flex-1 bg-black p-6 rounded">
              {" "}
              <Image
                src={banner}
                alt="banner "
                className="w-full lg:max-w-lg "
              />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold">Web Development</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Hire me</button>
            </div>
          </div>
        </div>
        {/*  UI/UX Design service */}
        <div className="hero my-6">
          <div className="hero-content flex flex-col gap-20 lg:flex-row">
            <div className="flex-1 ">
              <h1 className="text-5xl font-bold">UI/UX Design</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Hire me</button>
            </div>
            <div className="flex-1 bg-black">
              <Image
                src={banner}
                alt="banner "
                className="w-full lg:max-w-lg "
              />
            </div>
          </div>
        </div>
        {/*  Graphic  Design service */}
        <div className="hero ">
          <div className="hero-content flex flex-col-reverse gap-20 lg:flex-row my-10">
            <div className="flex-1 bg-black">
              <Image
                src={banner}
                alt="banner "
                className="w-full lg:max-w-lg "
              />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold">Graphic Design</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Hire me</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
