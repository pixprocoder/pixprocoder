'use client';
import { use, useState } from 'react';
import { motion } from 'framer-motion';
import { galleries } from '@/src/constants';
import { MediaLightbox } from '@/src/components/Gallery/MediaLightbox';
import { FiArrowLeft, FiCalendar, FiMapPin, FiImage } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

export default function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const album = galleries.find((g) => g?.id === id);

  if (!album) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Album not found</h2>
          <Link href="/gallery" className="text-primary hover:underline">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Back + Header */}
          <div className="mb-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-6"
            >
              <FiArrowLeft size={16} />
              Back to Gallery
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              {album.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-4 max-w-3xl">{album.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <FiCalendar size={14} className="text-primary" />
                <span>{album.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiMapPin size={14} className="text-primary" />
                <span>{album.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiImage size={14} className="text-primary" />
                <span>{album.media.length} memories</span>
              </div>
            </div>
          </div>

          {/* Media masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {album.media.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="mb-4 break-inside-avoid cursor-pointer group relative"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative overflow-hidden rounded-xl border border-border">
                  {item.type === 'image' ? (
                    <Image
                      src={item.url}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="relative aspect-video bg-muted flex items-center justify-center">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="self-end">
                      <p className="text-white text-sm font-medium">{item.title}</p>
                      {item.subtitle && (
                        <p className="text-white/60 text-xs">{item.subtitle}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <MediaLightbox
          media={album.media}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev! - 1 + album.media.length) % album.media.length)}
          onNext={() => setLightboxIndex((prev) => (prev! + 1) % album.media.length)}
        />
      )}
    </div>
  );
}