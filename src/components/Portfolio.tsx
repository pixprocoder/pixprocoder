"use client";
import { portfolioMenu, projects } from "../constants";
import React, { useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { Button } from "./ui/button";
import { increment } from "../redux/features/CounterSlice";

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
      <h1 className="  font-montserrat font-bold ">Recent Projects</h1>
      <div className="flex flex-wrap gap-4 mt-10">
        <div className=" flex flex-wrap gap-4 justify-center items-center ">
          {portfolioMenu.map((item) => (
            <div key={item.id}>
              <span
                className={`tab transition tab-lifted  cursor-pointer border p-2 text-sm rounded-md  ${
                  activeTab === item.id
                    ? " duration-200 tab-active border-blue-600  text-blue-600 "
                    : ""
                }`}
                onClick={() => handleMenuClick(item.id)}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      {isCategoryEmpty ? (
        <>
          <p className="text-3xl text-center h-[40vh] flex mx-2 justify-center items-center">
            Projects are coming soon 😊
          </p>
        </>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-10">
            {filteredProjects.map((p, i) => (
              <PortfolioCard
                key={i}
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
        </>
      )}
    </section>
  );
};

export default Portfolio;
