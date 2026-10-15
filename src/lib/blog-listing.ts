import { BlogPostMeta } from '@/src/types';

/** 3×3 grid. Controls show after this many posts in the current list (all or filtered). */
export const BLOG_PAGE_SIZE = 9;

export type BlogListPost = {
  slug: string;
  meta: BlogPostMeta;
  filePath: string;
};

export function formatTagLabel(tag: string) {
  return tag
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

export function getPrimaryTag(tags?: string[]) {
  const tag = tags?.[0];
  return tag ? normalizeTag(tag) : '';
}

export function collectTagOptions(posts: BlogListPost[]) {
  const counts = new Map<string, number>();

  for (const post of posts) {
    const value = getPrimaryTag(post.meta.tags);
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([value, count]) => ({
      value,
      count,
      label: formatTagLabel(value),
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function filterPostsByTag(posts: BlogListPost[], tag?: string | null) {
  const selected = tag ? normalizeTag(tag) : '';
  if (!selected) return posts;

  return posts.filter((post) => getPrimaryTag(post.meta.tags) === selected);
}

export function paginatePosts(posts: BlogListPost[], page: number) {
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * BLOG_PAGE_SIZE;

  return {
    items: posts.slice(start, start + BLOG_PAGE_SIZE),
    total,
    totalPages,
    currentPage,
    pageSize: BLOG_PAGE_SIZE,
  };
}

export function blogListHref({
  tag,
  page,
}: {
  tag?: string | null;
  page?: number;
}) {
  const params = new URLSearchParams();
  if (tag) params.set('tag', tag);
  if (page && page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : '/blog';
}
