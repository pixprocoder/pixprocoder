"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export const OverviewCard = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const data = [
    {
      id: 1,
      title: "33+",
      desc: "Users",
    },
    {
      id: 2,
      title: "10+",
      desc: "Downloads",
    },
    {
      id: 3,
      title: "4.2",
      desc: "Review",
    },
    {
      id: 4,
      title: "14k",
      desc: "Clients",
    },
  ];
  return (
    <div
      data-aos="fade-up"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
      className="bg-[#0b0e1d] rounded-lg mx-4 lg:m-0"
    >
      <div className="flex flex-col lg:flex-row  justify-around ">
        {data.map((el) => (
          <div
            className="flex flex-col p-10 justify-center items-center"
            key={el.id}
          >
            <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 flex justify-center items-center">
              <p className="text-2xl font-bold">{el.title}</p>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{el.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
