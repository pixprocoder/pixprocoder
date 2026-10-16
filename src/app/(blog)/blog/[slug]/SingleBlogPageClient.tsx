'use client';

import CommentBox from '@/src/app/(blog)/_components/CommentBox';
import { ArticleReactions } from '@/src/components/blog/ArticleReactions';
import { BlogContentRenderer } from '@/src/components/BlogContentRenderer';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { loginHref } from '@/src/lib/auth-redirect';
import {
  useComments,
  useIncrementPostView,
  usePostBookmark,
  usePostLikes,
  usePostViews,
  useTogglePostBookmark,
  useTogglePostLike,
} from '@/src/hooks/api/use-posts';
import {
  blogListHref,
  formatTagLabel,
  getPrimaryTag,
} from '@/src/lib/blog-listing';
import { AuthContext } from '@/src/providers/AuthProviders';
import { useLikeStore } from '@/src/store/like-store';
import { BlogPost } from '@/src/types';
import { format, formatDistanceToNow } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

function readLikePayload(response: any): {
  likeCount: number;
  isLiked?: boolean;
} {
  const inner =
    response?.data?.result ??
    response?.data ??
    response?.result ??
    response ??
    {};
  const raw = inner.likeCount ?? inner.count;
  const likeCount = typeof raw === 'number' && !Number.isNaN(raw) ? raw : 0;
  const isLiked =
    typeof inner.isLiked === 'boolean' ? inner.isLiked : undefined;
  return { likeCount, isLiked };
}

export default function SingleBlogPageClient({
  blogPost,
}: {
  blogPost: BlogPost;
}) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [sortBy, setSortBy] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  console.log(user)

  const setLike = useLikeStore((state) => state.setLike);
  const isLiked = useLikeStore((state) =>
    user?.uid ? Boolean(state.likedPosts[user.uid]?.[blogPost.slug]) : false,
  );
  const { data: totalLikeCount } = usePostLikes(
    blogPost.slug,
    user?.uid || null,
  );

  const { mutate: incrementView } = useIncrementPostView();
  const { data: viewData } = usePostViews(blogPost.slug);
  const viewCount = viewData?.data?.views ?? 0;

  const { mutateAsync: postLike, isPending: isLikeLoading } =
    useTogglePostLike();
  const [localLikeCount, setLocalLikeCount] = useState(0);

  const { data: bookmarkData } = usePostBookmark(
    blogPost.slug,
    user?.uid || null,
  );
  const { mutateAsync: postBookmark, isPending: isBookmarkLoading } =
    useTogglePostBookmark();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof bookmarkData?.data?.isSaved === 'boolean') {
      setSaved(bookmarkData.data.isSaved);
    }
  }, [bookmarkData]);

  const primaryTag = getPrimaryTag(blogPost.meta.tags);
  const readingMinutes = blogPost.meta.readingMinutes;
  const dateLabel = format(new Date(blogPost.meta.date), 'MMM d, yyyy');

  useEffect(() => {
    const viewKey = `viewed_ok_${blogPost.slug}`;
    const lastViewed = localStorage.getItem(viewKey);
    const cooldown = 24 * 60 * 60 * 1000;

    if (lastViewed && Date.now() - parseInt(lastViewed, 10) <= cooldown) {
      return;
    }

    incrementView(blogPost.slug, {
      onSuccess: () => {
        localStorage.setItem(viewKey, String(Date.now()));
      },
    });
  }, [blogPost.slug, incrementView]);

  useEffect(() => {
    if (!totalLikeCount) return;
    const { likeCount, isLiked: serverIsLiked } =
      readLikePayload(totalLikeCount);
    setLocalLikeCount(likeCount);
    if (user?.uid && serverIsLiked !== undefined) {
      setLike({
        userId: user.uid,
        slug: blogPost.slug,
        isLiked: serverIsLiked,
      });
    }
  }, [totalLikeCount, user?.uid, blogPost.slug, setLike]);

  const { data: comments, isLoading: commentLoading } = useComments({
    sortBy,
    slug: blogPost.slug,
    page: currentPage,
    limit: 8,
  });

  const commentCount = comments?.meta?.total || 0;
  const commentList = comments?.data ?? [];

  const handleLike = async () => {
    if (!user?.uid) {
      toast.info('Log in to like this post', {
        action: {
          label: 'Sign in',
          onClick: () => router.push(loginHref(`/blog/${blogPost.slug}`)),
        },
      });
      return;
    }

    const nextLiked = !isLiked;
    const currentCount = Number(localLikeCount) || 0;
    const previousLiked = isLiked;
    setLocalLikeCount(Math.max(0, currentCount + (nextLiked ? 1 : -1)));
    setLike({
      userId: user.uid,
      slug: blogPost.slug,
      isLiked: nextLiked,
    });

    try {
      const result = await postLike({
        postId: blogPost.slug,
        data: {
          userId: user.uid,
          isLiked: nextLiked,
        },
      });

      const { likeCount, isLiked: serverIsLiked } = readLikePayload(result);
      setLocalLikeCount(likeCount);
      if (serverIsLiked !== undefined) {
        setLike({
          userId: user.uid,
          slug: blogPost.slug,
          isLiked: serverIsLiked,
        });
      }
    } catch (error) {
      console.error('Like error:', error);
      setLocalLikeCount(currentCount);
      setLike({
        userId: user.uid,
        slug: blogPost.slug,
        isLiked: previousLiked,
      });
      toast.error('Could not update like');
    }
  };

  const handleBookmark = async () => {
    if (!user?.uid) {
      toast.info('Log in to save this post', {
        action: {
          label: 'Sign in',
          onClick: () => router.push(loginHref(`/blog/${blogPost.slug}`)),
        },
      });
      return;
    }

    const nextSaved = !saved;
    const previous = saved;
    setSaved(nextSaved);

    try {
      const result = await postBookmark({
        slug: blogPost.slug,
        data: { userId: user.uid, saved: nextSaved },
      });
      if (typeof result?.data?.isSaved === 'boolean') {
        setSaved(result.data.isSaved);
      }
    } catch (error) {
      console.error('Bookmark error:', error);
      setSaved(previous);
      toast.error('Could not update saved post');
    }
  };

  const reactions = {
    liked: isLiked,
    likeCount: Number(localLikeCount) || 0,
    likePending: isLikeLoading,
    viewCount,
    commentCount,
    slug: blogPost.meta.slug,
    shareTitle: blogPost.meta.title,
    shareDescription: blogPost.meta.excerpt,
    onLike: handleLike,
    onBookmark: handleBookmark,
    saved,
    bookmarkPending: isBookmarkLoading,
  };

  return (
    <article className="pb-28 pt-10 sm:pt-16 lg:pb-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Writing
        </Link>

        <header className="mt-8 space-y-6">
          {primaryTag && (
            <Link
              href={blogListHref({ tag: primaryTag })}
              className="text-xs font-medium tracking-[0.18em] text-primary uppercase"
            >
              {formatTagLabel(primaryTag)}
            </Link>
          )}

          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {blogPost.meta.title}
          </h1>

          {blogPost.meta.excerpt && (
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {blogPost.meta.excerpt}
            </p>
          )}

          <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="size-10 border border-border">
                <AvatarImage
                  src={blogPost.meta.authorProfile}
                  alt=""
                />
                <AvatarFallback>
                  {blogPost.meta.author?.[0] || 'S'}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                {blogPost.meta.authorId ? (
                  <Link
                    href={`/blog/about-author/${blogPost.meta.authorId}`}
                    className="truncate text-sm font-medium text-foreground hover:text-primary"
                  >
                    {blogPost.meta.author}
                  </Link>
                ) : (
                  <p className="truncate text-sm font-medium text-foreground">
                    {blogPost.meta.author}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  <time dateTime={blogPost.meta.date}>{dateLabel}</time>
                  {readingMinutes ? ` · ${readingMinutes} min read` : ''}
                </p>
              </div>
            </div>

            <ArticleReactions
              {...reactions}
              showComments={false}
              className="hidden sm:flex"
            />
          </div>
        </header>

        {blogPost.meta.thumbnail && (
          <figure className="relative my-8 aspect-video overflow-hidden rounded-2xl border border-border sm:my-10">
            <Image
              src={blogPost.meta.thumbnail}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </figure>
        )}

        <div className="article-body">
          <BlogContentRenderer code={blogPost.content} />
        </div>

        {blogPost.meta.tags?.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
            {blogPost.meta.tags.map((tag, index) => {
              const label = formatTagLabel(tag);
              const className =
                'inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground';
              return (
                <li key={tag}>
                  {index === 0 ? (
                    <Link
                      href={blogListHref({ tag: primaryTag })}
                      className={`${className} transition-colors hover:border-primary/40 hover:text-foreground`}
                    >
                      {label}
                    </Link>
                  ) : (
                    <span className={className}>{label}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-8 hidden rounded-2xl border border-border px-4 py-3 sm:block">
          <ArticleReactions {...reactions} />
        </div>

        <section id="comments" className="mt-16 scroll-mt-24">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Comments
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {commentCount} {commentCount === 1 ? 'response' : 'responses'}
              </p>
            </div>
            {commentCount > 1 && (
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 rounded-xl border border-border bg-background px-3 text-sm text-muted-foreground"
              >
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
              </select>
            )}
          </div>

          <CommentBox id={blogPost.slug} />

          <div className="mt-8 space-y-4">
            {commentLoading && (
              <p className="text-sm text-muted-foreground">Loading comments…</p>
            )}
            {!commentLoading && commentList.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No comments yet. Start the conversation.
              </p>
            )}
            {commentList.map((comment: any) => (
              <div
                key={comment.id}
                className="rounded-2xl border border-border bg-card p-4 sm:p-5"
              >
                <div className="flex gap-3">
                  <Avatar className="size-9 shrink-0 border border-border">
                    <AvatarImage src={comment?.author?.avatar || '/user.png'} alt="" />
                    <AvatarFallback className="text-xs">
                      {comment?.author?.username?.[0] || 'G'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 grow">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {comment?.author?.username || 'Guest'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {comments?.meta?.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3 text-sm">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="rounded-xl border border-border px-3 py-2 text-muted-foreground disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-muted-foreground">
                {currentPage} / {comments.meta.totalPages}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(comments.meta.totalPages, page + 1),
                  )
                }
                disabled={currentPage >= comments.meta.totalPages}
                className="rounded-xl border border-border px-3 py-2 text-muted-foreground disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-2 pt-2 backdrop-blur-md sm:hidden"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <ArticleReactions {...reactions} shareSide="top" />
      </div>
    </article>
  );
}
