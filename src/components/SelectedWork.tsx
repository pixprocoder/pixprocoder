'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { projects } from '../constants';
import { Button } from './ui/button';

export default function SelectedWork() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector('article');
    const gap = 24;
    const amount = card
      ? card.getBoundingClientRect().width + gap
      : scroller.clientWidth * 0.85;
    scroller.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <section
      id="portfolio"
      className="border-t border-border py-16 sm:py-24"
    >
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Selected work
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Things I&apos;ve shipped.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Projects I designed and built. Swipe or use the arrows to see them
            all.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-xl border-border"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous project"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-xl border-border"
            onClick={() => scrollByCard(1)}
            aria-label="Next project"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <article
            key={project.id}
            className="w-[min(100%,20rem)] shrink-0 snap-start sm:w-[min(100%,24rem)] md:w-[calc(50%-12px)]"
          >
            <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 90vw, 50vw"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
                <div className="flex gap-2 p-4">
                  {project.gitHubLink && (
                    <Link
                      href={project.gitHubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md"
                    >
                      <FiGithub className="size-3.5" />
                      Code
                    </Link>
                  )}
                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                    >
                      Live
                      <FiArrowUpRight className="size-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </motion.div>
    </section>
  );
}
