import { prisma } from '@/src/lib/db/prisma';

export async function togglePostLike(payload: {
  slug: string;
  userId: string;
  isLiked: boolean;
}) {
  const { slug, userId, isLiked } = payload;

  if (!slug?.trim()) throw new Error('Slug is required');
  if (!userId?.trim()) throw new Error('UserId is required');
  if (typeof isLiked !== 'boolean') throw new Error('isLiked must be a boolean value');

  return prisma.$transaction(async (tx) => {
    const existingLike = await tx.like.findUnique({
      where: { userId_slug: { userId, slug } },
    });

    if (isLiked) {
      if (!existingLike) {
        await tx.like.create({ data: { userId, slug } });
      }
      const count = await tx.like.count({ where: { slug } });
      return {
        message: existingLike ? 'Post already liked' : 'Post liked successfully',
        isLiked: true,
        count,
      };
    }

    if (existingLike) {
      await tx.like.delete({
        where: { userId_slug: { userId, slug } },
      });
    }
    const count = await tx.like.count({ where: { slug } });
    return {
      message: existingLike ? 'Post unliked successfully' : 'Post already unliked',
      isLiked: false,
      count,
    };
  });
}

export async function getPostLikeCount(slug: string, userId?: string | null) {
  const likeCount = await prisma.like.count({ where: { slug } });

  let isLiked = false;
  if (userId) {
    const userLike = await prisma.like.findUnique({
      where: { userId_slug: { userId, slug } },
    });
    isLiked = !!userLike;
  }

  return { result: { likeCount, isLiked } };
}

export async function incrementView(slug: string) {
  if (!slug?.trim()) throw new Error('Slug is required');

  return prisma.post.upsert({
    where: { slug },
    create: { slug, views: 1 },
    update: { views: { increment: 1 } },
    select: { views: true },
  });
}

export async function getViews(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { views: true },
  });
  return { views: post?.views ?? 0 };
}

export async function createComment(payload: {
  content: string;
  authorId: string;
  slug: string;
}) {
  const { content, authorId, slug } = payload;
  return prisma.comment.create({
    data: { content, slug, authorId },
  });
}

export async function getComments(payload: {
  slug: string;
  sortBy?: string;
  page: number;
  limit: number;
  skip: number;
}) {
  const { slug, page, limit, skip } = payload;
  const sortBy = payload.sortBy === 'asc' ? 'asc' : 'desc';

  const result = await prisma.comment.findMany({
    where: { slug },
    include: {
      author: {
        select: { email: true, username: true },
      },
    },
    orderBy: { createdAt: sortBy },
    take: limit,
    skip,
  });

  const total = await prisma.comment.count({ where: { slug } });

  return {
    result,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPostEngagement(slugs: string[]) {
  const unique = [...new Set(slugs.filter(Boolean))];
  const empty: Record<string, { likes: number; views: number }> = {};
  if (unique.length === 0) return empty;

  try {
    const [posts, likes] = await Promise.all([
      prisma.post.findMany({
        where: { slug: { in: unique } },
        select: { slug: true, views: true },
      }),
      prisma.like.findMany({
        where: { slug: { in: unique } },
        select: { slug: true },
      }),
    ]);

    const likesBySlug: Record<string, number> = {};
    for (const like of likes) {
      likesBySlug[like.slug] = (likesBySlug[like.slug] ?? 0) + 1;
    }

    const result: Record<string, { likes: number; views: number }> = {};
    for (const slug of unique) {
      result[slug] = { likes: likesBySlug[slug] ?? 0, views: 0 };
    }
    for (const post of posts) {
      result[post.slug] = {
        likes: likesBySlug[post.slug] ?? 0,
        views: post.views,
      };
    }
    return result;
  } catch (error) {
    console.error('getPostEngagement failed', error);
    return Object.fromEntries(
      unique.map((slug) => [slug, { likes: 0, views: 0 }]),
    );
  }
}

export async function syncPosts(posts: { slug: string }[]) {
  const existingPosts = await prisma.post.findMany({ select: { slug: true } });
  const existingSet = new Set(existingPosts.map((p) => p.slug));
  const incomingSlugs = posts.map((p) => p.slug);
  const newPosts = posts.filter((p) => !existingSet.has(p.slug));

  let created = 0;
  let updated = 0;

  await prisma.$transaction(async (tx) => {
    for (const post of newPosts) {
      await tx.post.create({ data: { slug: post.slug } });
      created++;
    }

    const existingToUpdate = posts.filter((p) => existingSet.has(p.slug));
    if (existingToUpdate.length > 0) {
      const result = await tx.post.updateMany({
        where: { slug: { in: existingToUpdate.map((p) => p.slug) } },
        data: { updatedAt: new Date() },
      });
      updated = result.count;
    }

    await tx.post.deleteMany({
      where: { slug: { notIn: incomingSlugs } },
    });
  });

  const finalCount = await prisma.post.count();
  const deleted = existingPosts.length + created - finalCount;

  return {
    success: true,
    synced: posts.length,
    created,
    updated,
    deleted,
    message: 'Posts synced successfully',
  };
}
