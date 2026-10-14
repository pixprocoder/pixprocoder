import { getAllBlogPostsMeta } from '@/src/lib/blog-helpers';
import { formatDateToUTCShort } from '@/src/utils/FormatDate';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi';
import { Reveal } from './motion/Reveal';

export default async function RecentPosts() {
  const posts = await getAllBlogPostsMeta();
  const recentPosts = posts.slice(0, 3);

  if (recentPosts.length === 0) return null;

  return (
    <section className="border-t border-border py-16 sm:py-24">
      <div>
        <Reveal className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              Writing
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Latest from the blog
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Notes on web architecture, engineering patterns, and how I build.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            All posts
            <FiArrowRight className="size-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post, idx) => (
            <Reveal key={post.slug} delay={0.08 * idx}>
            <Link 
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Image Header */}
              <div className="relative aspect-video overflow-hidden border-b border-border">
                <Image
                  src={post.meta.thumbnail || '/web-dev.png'}
                  alt={post.meta.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-background/90 backdrop-blur-sm border border-border text-[10px] font-mono uppercase tracking-wider">
                    {post.meta.tags[0] || 'Engineering'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                   <div className="flex items-center gap-1.5">
                      <FiCalendar className="text-primary" />
                      <span>{formatDateToUTCShort(post.meta.date)}</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <FiClock className="text-primary" />
                      <span>5 min read</span>
                   </div>
                </div>

                <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {post.meta.title}
                </h3>
                
                <p className="text-muted-foreground text-sm line-clamp-3 flex-grow">
                  {post.meta.excerpt}
                </p>

                <div className="pt-4 border-t border-border mt-auto flex items-center justify-between text-xs font-mono">
                   <span className="text-muted-foreground italic">// read_more()</span>
                   <FiArrowRight className="text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </div>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
