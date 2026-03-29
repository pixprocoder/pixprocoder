import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCalendar, FiClock, FiTag } from 'react-icons/fi';
import { getAllBlogPostsMeta } from '@/src/lib/blog-helpers';
import { formatDateToUTCShort } from '@/src/utils/FormatDate';

export default async function RecentPosts() {
  const posts = await getAllBlogPostsMeta();
  const recentPosts = posts.slice(0, 3);

  if (recentPosts.length === 0) return null;

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Latest from <span className="text-primary font-mono">the_blog</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Deep dives into modern web architecture, engineering patterns, and the future of development.
            </p>
          </div>
          <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-mono font-medium hover:text-primary transition-colors">
            <span>./view-all-posts.sh</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, idx) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col h-full bg-background border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5"
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
          ))}
        </div>
      </div>
    </section>
  );
}
