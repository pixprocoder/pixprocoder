import { getAllBlogPostsMeta } from '@/src/lib/blog-helpers';
import { getPostEngagement } from '@/src/lib/posts';
import { Metadata } from 'next';
import SavedList from './SavedList';

export const metadata: Metadata = {
  title: 'Saved - PixProcoder',
  description: 'Posts you have saved to read later.',
};

export default async function SavedPage() {
  const posts = await getAllBlogPostsMeta();
  const engagement = await getPostEngagement(posts.map((post) => post.slug));

  return (
    <section className="py-16 sm:py-24">
      <div className="mb-10 space-y-3 sm:mb-14">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          Library
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Saved.
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Articles you want to come back to.
        </p>
      </div>
      <SavedList posts={posts} engagement={engagement} />
    </section>
  );
}
