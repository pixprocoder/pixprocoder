'use client';

import { cn } from '@/src/lib/utils';
import { BlogPostMeta } from '@/src/types';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FiClock, FiEye, FiHeart } from 'react-icons/fi';

function formatCount(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function RelatedPosts({
  posts,
  engagement,
}: {
  posts: BlogPostMeta[];
  engagement?: Record<string, { likes: number; views: number }>;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  if (posts.length === 0) return null;

  const updateIndex = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const node = child as HTMLElement;
      const center = node.offsetLeft + node.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setIndex(best);
  };

  const go = (next: number) => {
    const el = scrollerRef.current;
    const child = el?.children[next] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
    setIndex(next);
  };

  const many = posts.length > 1;

  return (
    <section className="mt-12 border-t border-border pt-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            More
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
            Keep reading
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {many && (
            <>
              <button
                type="button"
                aria-label="Previous related post"
                onClick={() => go(Math.max(0, index - 1))}
                disabled={index === 0}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next related post"
                onClick={() => go(Math.min(posts.length - 1, index + 1))}
                disabled={index === posts.length - 1}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
              >
                <ChevronRight className="size-4" />
              </button>
            </>
          )}
          <Link
            href="/blog"
            className="ml-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            All posts
          </Link>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={updateIndex}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post) => {
          const stats = engagement?.[post.slug] ?? { likes: 0, views: 0 };
          const category = post.tags?.[0];
          return (
            <article
              key={post.slug}
              className="w-[min(100%,20rem)] shrink-0 snap-start sm:w-[min(100%,22rem)]"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full gap-3 overflow-hidden rounded-2xl border border-border bg-card p-3 transition-colors hover:border-primary/40"
              >
                <div className="relative size-24 shrink-0 overflow-hidden rounded-xl sm:size-28">
                  <Image
                    src={post.thumbnail || '/web-dev.png'}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="112px"
                  />
                </div>
                <div className="min-w-0 grow py-0.5">
                  {category && (
                    <p className="text-[11px] font-medium tracking-[0.14em] text-primary uppercase">
                      {category}
                    </p>
                  )}
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'MMM d, yyyy')}
                    </time>
                    {post.readingMinutes ? (
                      <span className="inline-flex items-center gap-1">
                        <FiClock className="size-3" />
                        {post.readingMinutes} min
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <FiEye className="size-3" />
                      {formatCount(stats.views)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FiHeart className="size-3" />
                      {formatCount(stats.likes)}
                    </span>
                  </p>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {many && (
        <div className="mt-3 flex justify-center gap-1.5">
          {posts.map((post, i) => (
            <button
              key={post.slug}
              type="button"
              aria-label={`Go to related post ${i + 1}`}
              onClick={() => go(i)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === index
                  ? 'w-5 bg-primary'
                  : 'w-1.5 bg-border hover:bg-muted-foreground/40',
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
