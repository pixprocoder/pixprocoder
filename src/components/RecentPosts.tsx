import { getAllBlogPostsMeta } from '@/src/lib/blog-helpers';
import { getPostEngagement } from '@/src/lib/posts';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { PostCard } from './blog/PostCard';
import { Reveal } from './motion/Reveal';

export default async function RecentPosts() {
  const posts = await getAllBlogPostsMeta();
  const recentPosts = posts.slice(0, 3);

  if (recentPosts.length === 0) return null;

  const engagement = await getPostEngagement(recentPosts.map((post) => post.slug));

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
          {recentPosts.map((post, idx) => {
            const stats = engagement[post.slug] ?? { likes: 0, views: 0 };
            return (
              <Reveal key={post.slug} delay={0.08 * idx}>
                <PostCard
                  post={post.meta}
                  likes={stats.likes}
                  views={stats.views}
                  variant="home"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
