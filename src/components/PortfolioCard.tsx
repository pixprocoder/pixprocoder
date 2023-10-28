"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Link from "next/link";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
  gitHubLink: string;
  liveLink: string;
  tags?: string[] | undefined | null | any;
};

const PortfolioCard = ({
  id,
  title,
  description,
  image,
  gitHubLink,
  liveLink,
  tags,
}: Props) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      className="card flex flex-col justify-center items-center   shadow-xl hover:shadow-2xl "
    >
      <Link href={`/portfolio/${id}`}>
        <div className=" mx-10 rounded-lg flex justify-center overflow-hidden">
          <img
            src={image}
            alt="Image"
            className="transform transition-transform duration-500 hover:scale-125"
          />
          {/* <p className="absolute bottom-0 text-blue-300  ">
            Click Image to view case study
          </p> */}
        </div>
      </Link>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="flex gap-2">
          {tags?.map((t: any, i: number) => (
            <div key={i}>
              <span className="text-green-600">#{t?.name}</span>
            </div>
          ))}
        </div>
        <div className="card-actions justify-start">
          <Link
            className="p-2 underline border border-blue-500 rounded-md text-blue-500"
            href={gitHubLink}
          >
            GitHub
          </Link>
          <Link
            className="p-2 border border-blue-500 underline text-blue-500 rounded-md"
            href={liveLink}
          >
            Live Link
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
