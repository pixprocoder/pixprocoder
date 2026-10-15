'use client';

import { motion } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import type { IconType } from 'react-icons';
import {
  SiAmazonaws,
  SiAnsible,
  SiBun,
  SiCloudflare,
  SiGithubactions,
  SiGo,
  SiGrafana,
  SiKubernetes,
  SiPrometheus,
  SiReact,
  SiSvelte,
  SiTerraform,
} from 'react-icons/si';
import docker from '../assets/tech/docker.png';
import git from '../assets/tech/git.png';
import mongodb from '../assets/tech/mongodb.png';
import nextjsPng from '../assets/tech/nextjs.png';
import nodejsPng from '../assets/tech/nodejs.png';
import postgresPng from '../assets/tech/postgreSQL.png';
import prismaPng from '../assets/tech/prisma.png';
import reactjs from '../assets/tech/reactjs.png';
import tailwind from '../assets/tech/tailwind.png';
import typescriptPng from '../assets/tech/typescript.png';

type TechIcon = StaticImageData | IconType;

type Tech = {
  name: string;
  icon: TechIcon;
};

const groups: { title: string; techs: Tech[] }[] = [
  {
    title: 'Frontend',
    techs: [
      { name: 'React', icon: reactjs },
      { name: 'Next.js', icon: nextjsPng },
      { name: 'Svelte', icon: SiSvelte },
      { name: 'TypeScript', icon: typescriptPng },
      { name: 'Tailwind CSS', icon: tailwind },
      { name: 'React Native', icon: SiReact },
    ],
  },
  {
    title: 'Backend',
    techs: [
      { name: 'Node.js', icon: nodejsPng },
      { name: 'Go', icon: SiGo },
      { name: 'Bun', icon: SiBun },
      { name: 'PostgreSQL', icon: postgresPng },
      { name: 'Prisma', icon: prismaPng },
      { name: 'MongoDB', icon: mongodb },
    ],
  },
  {
    title: 'DevOps',
    techs: [
      { name: 'Docker', icon: docker },
      { name: 'Terraform', icon: SiTerraform },
      { name: 'Kubernetes', icon: SiKubernetes },
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'Ansible', icon: SiAnsible },
    ],
  },
  {
    title: 'Cloud',
    techs: [
      { name: 'AWS', icon: SiAmazonaws },
      { name: 'Cloudflare', icon: SiCloudflare },
      { name: 'Grafana', icon: SiGrafana },
      { name: 'Prometheus', icon: SiPrometheus },
      { name: 'Git', icon: git },
    ],
  },
];

function isImageIcon(icon: TechIcon): icon is StaticImageData {
  return typeof icon === 'object' && icon !== null && 'src' in icon;
}

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

function TechIconView({ icon, name }: { icon: TechIcon; name: string }) {
  if (isImageIcon(icon)) {
    return (
      <span className="relative size-4 shrink-0">
        <Image src={icon} alt="" fill className="object-contain" />
      </span>
    );
  }

  const Icon = icon;
  return <Icon className="size-4 shrink-0" title={name} />;
}

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
              {group.techs.map((tech) => (
                <motion.span
                  key={tech.name}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground"
                >
                  <TechIconView icon={tech.icon} name={tech.name} />
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
