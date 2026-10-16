'use client';

import { PostCard } from '@/src/components/blog/PostCard';
import { Button } from '@/src/components/ui/button';
import { useBookmarkList } from '@/src/hooks/api/use-posts';
import { loginHref } from '@/src/lib/auth-redirect';
import { AuthContext } from '@/src/providers/AuthProviders';
import { BlogPostMeta } from '@/src/types';
import Link from 'next/link';
import { useContext, useMemo } from 'react';

type SavedListProps = {
  posts: { slug: string; meta: BlogPostMeta }[];
  engagement: Record<string, { likes: number; views: number }>;
};

export default function SavedList({ posts, engagement }: SavedListProps) {
  const { user, loading } = useContext(AuthContext);
  const { data, isLoading } = useBookmarkList(user?.uid || null);

  const savedPosts = useMemo(() => {
    const bookmarks = data?.data?.bookmarks as
      | { slug: string; createdAt: string }[]
      | undefined;
    if (!bookmarks?.length) return [];
    const bySlug = new Map(posts.map((post) => [post.slug, post]));
    return bookmarks
      .map((item) => bySlug.get(item.slug))
      .filter((post): post is (typeof posts)[number] => Boolean(post));
  }, [data, posts]);

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading your account…</p>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-border px-6 py-16 text-center">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Sign in to see saved posts
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Saves sync across devices when you are logged in.
        </p>
        <Button asChild className="mt-6 h-11 rounded-xl px-6">
          <Link href={loginHref('/saved')}>Sign in</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading saved posts…</p>;
  }

  if (savedPosts.length === 0) {
    return (
      <div className="rounded-2xl border border-border px-6 py-16 text-center">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          No saved posts yet.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tap Save on an article to keep it here.
        </p>
        <Button asChild variant="outline" className="mt-6 h-11 rounded-xl px-6">
          <Link href="/blog">Browse writing</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {savedPosts.map((post) => {
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
  );
}
