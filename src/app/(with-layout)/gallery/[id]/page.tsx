'use client';

import { MediaLightbox } from '@/src/components/Gallery/MediaLightbox';
import { staggerContainer, staggerItem } from '@/src/components/motion/Reveal';
import { galleries } from '@/src/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use, useState } from 'react';

export default function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const album = galleries.find((item) => item?.id === id);

  if (!album) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Album not found
        </h1>
        <Link
          href="/gallery"
          className="mt-4 inline-flex text-sm text-primary hover:underline"
        >
          Back to gallery
        </Link>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24">
      <Link
        href="/gallery"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Gallery
      </Link>

      <header className="mt-8 max-w-2xl space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          {album.date}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {album.title}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {album.description}
        </p>
        <p className="text-sm text-muted-foreground">
          {album.location}
          {album.media.length
            ? ` · ${album.media.length} ${album.media.length === 1 ? 'photo' : 'photos'}`
            : ''}
        </p>
      </header>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3"
      >
        {album.media.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            variants={staggerItem}
            onClick={() => setLightboxIndex(index)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border text-left"
          >
            {item.type === 'image' ? (
              <Image
                src={item.url}
                alt={item.title}
                width={800}
                height={600}
                className="h-auto w-full max-w-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="relative aspect-video bg-muted">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-black/50">
                    <svg
                      className="ml-0.5 size-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </div>
            )}
            <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span>
                <span className="block text-sm font-medium text-white">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="mt-0.5 block text-xs text-white/70">
                    {item.subtitle}
                  </span>
                )}
              </span>
            </span>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <MediaLightbox
            media={album.media}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() =>
              setLightboxIndex(
                (prev) =>
                  ((prev ?? 0) - 1 + album.media.length) % album.media.length,
              )
            }
            onNext={() =>
              setLightboxIndex(
                (prev) => ((prev ?? 0) + 1) % album.media.length,
              )
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}
