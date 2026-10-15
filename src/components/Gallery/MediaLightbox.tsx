'use client';

import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type MediaItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
  embedUrl?: string;
  title: string;
  subtitle?: string;
  description?: string;
};

export function MediaLightbox({
  media,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  media: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = media[currentIndex];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 p-4">
        <p className="truncate text-sm text-white/80">
          <span className="tabular-nums text-white/55">
            {currentIndex + 1} / {media.length}
          </span>
          <span className="mx-2 text-white/30">·</span>
          {item.title}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="size-5" />
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-12"
        onClick={(event) => event.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {item.type === 'image' ? (
            <motion.img
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              src={item.url}
              alt={item.title}
              className="max-h-[82vh] max-w-full rounded-xl object-contain"
            />
          ) : (
            <div key={item.id} className="aspect-video w-full max-w-4xl">
              <iframe
                src={item.embedUrl || item.url}
                className="size-full rounded-xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={item.title}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {(item.subtitle || item.description) && (
        <p className="absolute inset-x-0 bottom-0 px-6 pb-6 text-center text-sm text-white/70">
          {item.subtitle || item.description}
        </p>
      )}

      {media.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photo"
            className="absolute top-1/2 left-3 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            aria-label="Next photo"
            className="absolute top-1/2 right-3 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}
    </motion.div>
  );
}
