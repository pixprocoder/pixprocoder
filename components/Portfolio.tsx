"use client";
import { portfolioMenu, projects } from "@/constants";
import React, { useState } from "react";
import PortfolioCard from "./PortfolioCard";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState(portfolioMenu[0].id);
  const handleMenuClick = (itemId: any) => {
    setActiveTab(itemId);
  };

  const selectedTabItem = portfolioMenu.find((item) => item.id === activeTab);
  const selectedCategory = selectedTabItem?.value || "All";
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const isCategoryEmpty = filteredProjects.length === 0;

  return (
    <section id="portfolio" className="pt-8 my-40">
      <h1 className=" text-center text-5xl font-montserrat font-bold ">
        Portfolio
      </h1>
      <div className="flex flex-wrap justify-center items-center   gap-4 mt-10">
        <div className="tabs flex gap-y-2 justify-center items-center ">
          {portfolioMenu.map((item) => (
            <>
              <span
                key={item.id}
                className={`tab transition tab-lifted  ${
                  activeTab === item.id
                    ? " duration-200 tab-active text-blue-600 "
                    : ""
                }`}
                onClick={() => handleMenuClick(item.id)}
              >
                {item.value}
              </span>
            </>
          ))}
        </div>
      </div>
      {isCategoryEmpty ? (
        <>
          <p className="text-3xl text-center h-[40vh] flex mx-2 justify-center items-center">
            Project is coming soon 😊
          </p>
        </>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10 mt-10">
          {filteredProjects.map((p) => (
            <PortfolioCard
              key={p.id}
              title={p.title}
              id={p.id}
              description={p.description}
              image={p.image}
              gitHubLink={p.gitHubLink}
              liveLink={p.liveLink}
              tags={p.tags}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Portfolio;
