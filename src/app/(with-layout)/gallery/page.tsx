'use client';

import { AlbumCard } from '@/src/components/Gallery/AlbumCard';
import { staggerContainer, staggerItem } from '@/src/components/motion/Reveal';
import { galleries } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

function albumYear(date: string) {
  const match = date.match(/\d{4}/);
  return match?.[0] ?? date;
}

function photoCount(album: (typeof galleries)[number]) {
  return album.media?.length || album.mediaCount || 0;
}

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');

  const years = useMemo(
    () =>
      [...new Set(galleries.map((album) => albumYear(album.date)))].sort(
        (a, b) => Number(b) - Number(a),
      ),
    [],
  );

  const filtered = galleries.filter(
    (album) => filter === 'all' || albumYear(album.date) === filter,
  );
  const [featured, ...rest] = filtered;

  return (
    <section className="py-16 sm:py-24">
      <div className="mb-10 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Memories
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Moments I keep.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            A personal collection — places, people, and ordinary days I
            don&apos;t want to lose.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {['all', ...years].map((year) => {
            const active = filter === year;
            return (
              <button
                key={year}
                type="button"
                onClick={() => setFilter(year)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm transition-colors',
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
                )}
              >
                {year === 'all' ? 'All years' : year}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-border px-6 py-16 text-center"
          >
            <p className="text-sm text-muted-foreground">
              No albums for this year yet.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={filter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {featured && (
              <motion.div variants={staggerItem} className="min-w-0 w-full">
                <AlbumCard
                  album={{ ...featured, mediaCount: photoCount(featured) }}
                  featured
                />
              </motion.div>
            )}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {rest.map((album) => (
                  <motion.div key={album.id} variants={staggerItem}>
                    <AlbumCard
                      album={{ ...album, mediaCount: photoCount(album) }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
