export const postKeys = {
  all: ['posts'] as const,
  likes: (slug: string, userId?: string | null) =>
    [...postKeys.all, 'likes', slug, userId ?? null] as const,
  bookmark: (slug: string, userId?: string | null) =>
    [...postKeys.all, 'bookmark', slug, userId ?? null] as const,
  bookmarkList: (userId?: string | null) =>
    [...postKeys.all, 'bookmarks', userId ?? null] as const,
  views: (slug: string) => [...postKeys.all, 'views', slug] as const,
  comments: (
    slug: string,
    sortBy: string,
    page: number,
    limit: number,
    userId?: string | null,
  ) =>
    [
      ...postKeys.all,
      'comments',
      slug,
      sortBy,
      page,
      limit,
      userId ?? null,
    ] as const,
  commentsRoot: (slug: string) => [...postKeys.all, 'comments', slug] as const,
};
