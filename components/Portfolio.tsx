import { portfolioMenu, projects } from "@/constants";
import React from "react";
import PortfolioCard from "./PortfolioCard";

const Portfolio = () => {
  return (
    <section className="my-40">
      <h1 className=" text-center text-5xl font-montserrat font-bold">
        Portfolio
      </h1>
      <div className="lg:flex hidden justify-center items-center   gap-4 mt-10">
        {portfolioMenu.map((item) => (
          <button key={item.id} className="btn btn-sm   btn-outline-primary">
            {item.value}
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <PortfolioCard
            key={p.id}
            title={p.title}
            description={p.description}
            image={p.image}
            gitHubLink={p.gitHubLink}
            liveLink={p.liveLink}
          />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
