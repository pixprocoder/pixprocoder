import { BlogFilters } from '@/src/components/blog/BlogFilters';
import { BlogPagination } from '@/src/components/blog/BlogPagination';
import { PostCard } from '@/src/components/blog/PostCard';
import { getAllBlogPostsMeta } from '@/src/lib/blog-helpers';
import {
  collectTagOptions,
  filterPostsByTag,
  formatTagLabel,
  paginatePosts,
} from '@/src/lib/blog-listing';
import { getPostEngagement } from '@/src/lib/posts';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Writing - PixProcoder',
  description:
    'Notes on web architecture, engineering patterns, and how I build.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const { tag, page } = await searchParams;
  const posts = await getAllBlogPostsMeta();
  const tags = collectTagOptions(posts);
  const activeTag = tags.some((item) => item.value === tag?.toLowerCase())
    ? tag!.toLowerCase()
    : undefined;

  const filtered = filterPostsByTag(posts, activeTag);
  const listing = paginatePosts(filtered, Number(page) || 1);
  const engagement = await getPostEngagement(
    listing.items.map((post) => post.slug),
  );

  return (
    <section className="py-16 sm:py-24">
      <div className="mb-10 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Writing
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Notes and essays.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Engineering, architecture, and the work of building — including
            guest stories.
          </p>
        </div>
        {tags.length > 0 && (
          <BlogFilters tags={tags} activeTag={activeTag} />
        )}
      </div>

      <div className="mb-8 text-sm text-muted-foreground">
        {activeTag ? (
          <p>
            {listing.total} {listing.total === 1 ? 'post' : 'posts'} tagged{' '}
            <span className="text-foreground">
              {formatTagLabel(activeTag)}
            </span>
            {' · '}
            <Link href="/blog" className="hover:text-foreground">
              Clear
            </Link>
          </p>
        ) : (
          <p>
            {listing.total} {listing.total === 1 ? 'post' : 'posts'}
          </p>
        )}
      </div>

      {listing.items.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {listing.items.map((post) => {
            const stats = engagement[post.slug] ?? { likes: 0, views: 0 };
            return (
              <PostCard
                key={post.slug}
                post={post.meta}
                likes={stats.likes}
                views={stats.views}
                variant="listing"
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-border px-6 py-16 text-center">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            No posts in this topic.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try another tag, or view everything.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex text-sm font-medium text-primary hover:underline"
          >
            All posts
          </Link>
        </div>
      )}

      <BlogPagination
        tag={activeTag}
        currentPage={listing.currentPage}
        totalPages={listing.totalPages}
      />
    </section>
  );
}
