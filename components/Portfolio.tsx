"use client";
import { portfolioMenu, projects } from "@/constants";
import React, { useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { Button } from "./ui/button";

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

      <div className="grid lg:grid-cols-3 gap-10 mt-10">
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
      <Button variant="destructive">Show All</Button>
    </section>
  );
};

export default Portfolio;
