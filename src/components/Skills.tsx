'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { technologies } from '../constants';

const groups = [
  {
    title: 'Frontend',
    techs: [
      'React JS',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'HTML 5',
      'CSS 3',
    ],
  },
  {
    title: 'Backend',
    techs: ['Node JS', 'Express JS', 'Next.js'],
  },
  {
    title: 'Data',
    techs: ['MongoDB', 'PostgreSQL', 'Firebase'],
  },
  {
    title: 'Tools',
    techs: ['git', 'docker', 'figma', 'AWS'],
  },
];

const getTechIcon = (name: string) => {
  const tech = technologies.find(
    (t) => t.name.toLowerCase() === name.toLowerCase(),
  );
  return tech ? tech.icon : null;
};

const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="border-t border-border py-16 sm:py-24">
      <div className="mb-10 space-y-3 sm:mb-14">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          Stack
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Tools I reach for.
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          The languages and platforms I use to design, ship, and run products.
        </p>
      </div>

      <motion.div
        variants={list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2"
      >
        {groups.map((group) => (
          <motion.div key={group.title} variants={item} className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.techs.map((name) => {
                const icon = getTechIcon(name);
                return (
                  <motion.span
                    key={name}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground"
                  >
                    {icon && (
                      <span className="relative size-4 shrink-0">
                        <Image
                          src={icon}
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </span>
                    )}
                    {name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
