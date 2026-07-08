'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { galleries } from '@/src/constants';
import { AlbumCard } from '@/src/components/Gallery/AlbumCard';
import { FiCamera, FiGrid } from 'react-icons/fi';

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>('all');

  const years = [...new Set(galleries.map((g) => g.date.split(' ').pop() || g.date))];
  const filtered = filter === 'all' ? galleries : galleries.filter((g) => g.date.includes(filter));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6">
            <FiCamera size={14} />
            <span>GALLERY</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            My Memories
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A collection of moments captured through my lens — travels, events, and everyday beauty.
          </p>
        </motion.div>

        {/* Year filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              filter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <FiGrid size={12} className="inline mr-1.5" />
            ALL
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setFilter(year)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                filter === year
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {filtered.map((album, i) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <AlbumCard album={album} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <FiCamera size={40} className="mx-auto mb-4 opacity-50" />
            <p>No albums found for this year.</p>
          </div>
        )}
      </div>
    </div>
  );
}