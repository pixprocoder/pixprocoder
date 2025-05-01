'use client';
import React, { useEffect } from 'react';
import profile from '../assets/images/about-me.png';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button } from './ui/button';
import { FiDownload, FiCode, FiPenTool } from 'react-icons/fi';

import { motion } from 'framer-motion';

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      id="about"
      className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/5"
    >
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Crafting Digital Excellence
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Full-stack developer & creative problem-solver passionate about
            building impactful web experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            data-aos="zoom-in"
            className="relative group flex justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-2xl border-2 border-border/50">
              <Image
                src={profile}
                alt="Samsul Kobir"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <FiCode className="w-8 h-8" />
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 text-blue-500">
                <FiPenTool className="w-7 h-7" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground">
              Samsul Kobir
              <span className="block text-lg text-muted-foreground mt-2">
                Full-Stack Developer & UI/UX Enthusiast
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                With {new Date().getFullYear() - 2020}+ years in the digital
                realm, I bridge the gap between technical excellence and
                creative vision. My journey spans:
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {[
                  'Web Application Development',
                  'E-commerce Solutions',
                  'Cloud Architecture',
                  'UI/UX Design',
                  'Technical Writing',
                  'Mentorship',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-primary">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="gap-2 bg-gradient-to-r from-primary to-blue-500">
                <FiDownload />
                Download CV
              </Button>
              <Button variant="outline" className="gap-2">
                View My Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
