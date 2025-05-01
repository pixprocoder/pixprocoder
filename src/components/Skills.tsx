'use client';
import { useState } from 'react';
import { technologies } from '../constants';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Link from 'next/link';

const categoryDescriptions = {
  frontend: {
    title: 'Frontend Architecture',
    content:
      'Crafting pixel-perfect interfaces with modern web technologies. Specializing in responsive design, state management, and performance optimization.',
    highlights: [
      'React & Next.js Ecosystem',
      'TypeScript Integration',
      'Cross-Browser Compatibility',
      'Web Performance Optimization',
    ],
  },
  backend: {
    title: 'Backend Engineering',
    content:
      'Building scalable server-side solutions with robust APIs and efficient data processing. Focus on security, scalability, and maintainability.',
    highlights: [
      'REST & GraphQL APIs',
      'Microservices Architecture',
      'Authentication Systems',
      'Server-Side Rendering',
    ],
  },
  database: {
    title: 'Data Management',
    content:
      'Designing efficient data storage solutions and optimized query systems. Expertise in both SQL and NoSQL database management.',
    highlights: [
      'Database Design',
      'Query Optimization',
      'Data Modeling',
      'Migration Strategies',
    ],
  },
  tools: {
    title: 'Development Ecosystem',
    content:
      'Mastering the tools that power modern development workflows. Continuous integration and deployment automation.',
    highlights: [
      'CI/CD Pipelines',
      'Testing Frameworks',
      'Cloud Infrastructure',
      'Monitoring & Analytics',
    ],
  },
};

const Skills = () => {
  const categories = {
    frontend: technologies.filter((t) => t.category === 'frontend'),
    backend: technologies.filter((t) => t.category === 'backend'),
    database: technologies.filter((t) => t.category === 'database'),
    tools: technologies.filter((t) => t.category === 'tools'),
  };

  return (
    <section
      id="skills"
      className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/5"
    >
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Balanced proficiency across the development stack with focus on
            modern practices
          </p>
        </motion.div>

        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-2 bg-background/50 backdrop-blur">
            {Object.keys(categories).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg p-4 text-sm md:text-base"
              >
                {categoryDescriptions[category].title}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(categories).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid lg:grid-cols-2 gap-8 items-start"
              >
                {/* Category Description */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground">
                    {categoryDescriptions[category].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {categoryDescriptions[category].content}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {categoryDescriptions[category].highlights.map(
                      (highlight, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-primary"
                        >
                          <span className="text-primary">▹</span>
                          <span className="text-foreground text-sm">
                            {highlight}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {items.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ y: -5 }}
                      className="group relative p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all bg-background/80 backdrop-blur-sm"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative w-12 h-12">
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-center">
                          {tech.name}
                        </span>
                      </div>
                      {tech.level && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-b-xl overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500`}
                            style={{ width: `${tech.level}%` }}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground">
            Continuously learning and adapting to new technologies •{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Ask me about my learning roadmap
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
