import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { cn } from '@/src/lib/utils';
import { BlogPostMeta } from '@/src/types';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiClock, FiEye, FiHeart } from 'react-icons/fi';

export type PostCardVariant = 'home' | 'listing';

function formatCount(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof FiEye;
  value: number;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5" title={label}>
      <Icon className="size-3.5" aria-hidden />
      <span className="tabular-nums">{formatCount(value)}</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function PostCard({
  post,
  likes = 0,
  views = 0,
  variant = 'listing',
  className,
}: {
  post: BlogPostMeta;
  likes?: number;
  views?: number;
  variant?: PostCardVariant;
  className?: string;
}) {
  const isHome = variant === 'home';
  const readingMinutes = post.readingMinutes;
  const category = post.tags?.[0];
  const dateLabel = format(new Date(post.date), 'MMM d, yyyy');
  const authorInitial = post.author?.[0] || 'S';

  return (
    <article className={cn('h-full', className)}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
      >
        <div className="relative aspect-video overflow-hidden border-b border-border">
          <Image
            src={post.thumbnail || '/web-dev.png'}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="flex grow flex-col gap-3 p-5 sm:p-6">
          {!isHome && category && (
            <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">
              {category}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <time dateTime={post.date}>{dateLabel}</time>
            {readingMinutes ? (
              <span className="inline-flex items-center gap-1.5">
                <FiClock className="size-3.5 text-primary" aria-hidden />
                {readingMinutes} min read
              </span>
            ) : null}
          </div>

          <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="line-clamp-3 grow text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
            {isHome ? (
              <>
                <div className="flex items-center gap-4">
                  <Stat icon={FiEye} value={views} label={`${views} views`} />
                  <Stat icon={FiHeart} value={likes} label={`${likes} likes`} />
                </div>
                <FiArrowRight className="size-3.5 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </>
            ) : (
              <>
                <div className="flex min-w-0 items-center gap-2">
                  <Avatar className="size-6 border border-border">
                    <AvatarImage src={post.authorProfile} alt="" />
                    <AvatarFallback className="text-[10px]">
                      {authorInitial}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{post.author}</span>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Stat icon={FiEye} value={views} label={`${views} views`} />
                  <Stat icon={FiHeart} value={likes} label={`${likes} likes`} />
                  <FiArrowRight className="size-3.5 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
