'use client';

import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type GalleryAlbum = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  location: string;
  mediaCount: number;
};

export function AlbumCard({
  album,
  featured = false,
}: {
  album: GalleryAlbum;
  featured?: boolean;
}) {
  return (
    <Link href={`/gallery/${album.id}`} className="block min-w-0">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'group relative w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-card',
          featured
            ? 'h-56 sm:h-80 md:h-96'
            : 'aspect-[4/5] sm:aspect-[3/4]',
        )}
      >
        <div className="absolute inset-0 overflow-hidden">
          {featured ? (
            <motion.div
              className="size-full will-change-transform"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={album.coverImage}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </motion.div>
          ) : (
            <Image
              src={album.coverImage}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 sm:p-6">
          <p className="text-xs tracking-wide text-white/70">
            {album.date}
            {album.location ? ` · ${album.location}` : ''}
          </p>
          <h3
            className={cn(
              'font-semibold tracking-tight text-white',
              featured ? 'text-xl sm:text-3xl' : 'text-xl',
            )}
          >
            {album.title}
          </h3>
          <p className="line-clamp-2 text-sm text-white/75">
            {album.description}
          </p>
          <p className="pt-1 text-xs text-white/55">
            {album.mediaCount} {album.mediaCount === 1 ? 'photo' : 'photos'}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
