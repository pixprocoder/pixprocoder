'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface SectionBannerProps {
  children: React.ReactNode;
}

export const SectionBanner = ({ children }: SectionBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-16 flex h-64 items-center overflow-hidden rounded-xl border border-border bg-background/80 backdrop-blur-sm md:h-80"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url("/sectionBanner.webp")',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <h1 className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-4xl font-black text-transparent md:text-6xl">
          {children}
        </h1>
      </div>
    </motion.div>
  );
};
