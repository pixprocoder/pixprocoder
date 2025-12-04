'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FiBook, FiCode, FiStar, FiUsers } from 'react-icons/fi';

export const OverviewCard = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const stats = [
    { id: 1, title: '10+', desc: 'Satisfied Clients', icon: <FiUsers /> },
    { id: 2, title: '20+', desc: 'Projects Deployed', icon: <FiCode /> },
    { id: 3, title: '4.8', desc: 'Avg. Rating', icon: <FiStar /> },
    { id: 4, title: '50+', desc: 'Tech Articles', icon: <FiBook /> },
  ];

  return (
    <section
      data-aos="fade-up"
      className="relative py-12 lg:py-16 bg-gradient-to-br from-background to-muted/10 rounded-xl border border-border/50 shadow-sm"
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Digital Excellence in Numbers
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Combining technical expertise with creative solutions to deliver
            outstanding results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              whileHover={{ y: -5 }}
              className="group bg-background/80 backdrop-blur-sm border border-border/30 rounded-xl p-6 hover:border-primary/30 transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-primary text-3xl p-4 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  {stat.title}
                </h3>
                <p className="mt-2 text-muted-foreground font-medium">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
