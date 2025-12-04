'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { portfolioMenu, projects } from '../constants';
import PortfolioCard from './PortfolioCard';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState(portfolioMenu[0].id);

  const selectedTabItem = portfolioMenu.find((item) => item.id === activeTab);
  const selectedCategory = selectedTabItem?.value || 'All';
  const filteredProjects = projects.filter((p) =>
    selectedCategory === 'All' ? true : p.category === selectedCategory,
  );

  const isCategoryEmpty = filteredProjects.length === 0;

  return (
    <section
      id="portfolio"
      className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/5"
    >
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Featured Work
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Explore my technical solutions across different domains and
            platforms
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-16">
          {portfolioMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-primary to-blue-500 text-background'
                  : 'bg-muted hover:bg-muted/50 text-foreground'
              }`}
            >
              {item.value}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {isCategoryEmpty ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 space-y-4"
            >
              <FiXCircle className="w-16 h-16 mx-auto text-muted-foreground" />
              <p className="text-2xl text-muted-foreground">
                Projects in this category are currently under development
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
            >
              {filteredProjects.map((p, i) => (
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
