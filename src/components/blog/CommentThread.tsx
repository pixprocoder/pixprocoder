'use client';

import CommentBox from '@/src/app/(blog)/_components/CommentBox';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { useToggleCommentLike } from '@/src/hooks/api/use-posts';
import { loginHref } from '@/src/lib/auth-redirect';
import {
  MAX_REPLIES_PER_THREAD,
  splitMentions,
} from '@/src/lib/comment-limits';
import { cn } from '@/src/lib/utils';
import { AuthContext } from '@/src/providers/AuthProviders';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, type CSSProperties } from 'react';
import { toast } from 'sonner';

export type CommentAuthor = {
  username?: string | null;
  avatar?: string | null;
};

export type CommentNode = {
  id: string;
  content: string;
  createdAt: string;
  author?: CommentAuthor | null;
  replies?: CommentNode[];
  likeCount?: number;
  isLiked?: boolean;
};

function handleOf(author?: CommentAuthor | null) {
  return author?.username?.trim() || 'guest';
}

function CommentBody({ content }: { content: string }) {
  return (
    <p className="mt-2 text-sm leading-relaxed text-foreground">
      {splitMentions(content).map((part, index) =>
        part.mention ? (
          <span key={index} className="font-medium text-primary">
            {part.value}
          </span>
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}
    </p>
  );
}

function CommentItem({
  comment,
  compact,
  showAt,
}: {
  comment: CommentNode;
  compact?: boolean;
  showAt?: boolean;
}) {
  const name = handleOf(comment.author);
  return (
    <div className="flex gap-3">
      <Avatar
        className={`${compact ? 'size-8' : 'size-9'} shrink-0 border border-border`}
      >
        <AvatarImage src={comment.author?.avatar || '/user.png'} alt="" />
        <AvatarFallback className="text-xs">{name[0] || 'G'}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 grow">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p
            className={cn(
              'text-sm font-medium',
              showAt ? 'text-primary' : 'text-foreground',
            )}
          >
            {showAt ? `@${name}` : name}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <CommentBody content={comment.content} />
      </div>
    </div>
  );
}

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

function ParentLikeButton({
  liked,
  likeCount,
  pending,
  onLike,
}: {
  liked: boolean;
  likeCount: number;
  pending: boolean;
  onLike: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onLike}
      disabled={pending}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike comment' : 'Like comment'}
      className={cn(
        'inline-flex items-center gap-1.5 font-medium transition-colors disabled:opacity-50',
        liked
          ? 'text-primary'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <Heart className={cn('size-3.5', liked && 'fill-primary')} />
      <span className="tabular-nums">{likeCount}</span>
    </button>
  );
}

function Bone({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn('skeleton-shimmer', className)}
      style={{ '--skeleton-delay': `${delay}s` } as CSSProperties}
    />
  );
}

export function CommentCardSkeleton({
  delay = 0,
  lines = 2,
  showReplies = false,
}: {
  delay?: number;
  lines?: number;
  showReplies?: boolean;
}) {
  const widths = ['w-full', 'w-[88%]', 'w-2/3'];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-card p-4 sm:p-5"
      aria-hidden
    >
      <div className="flex gap-3">
        <Bone className="size-9 shrink-0 rounded-full" delay={delay} />
        <div className="min-w-0 grow">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Bone className="h-3.5 w-24 rounded-full" delay={delay} />
            <Bone className="h-3 w-16 rounded-full" delay={delay + 0.08} />
          </div>
          <div className="mt-3 space-y-2">
            {Array.from({ length: lines }, (_, i) => (
              <Bone
                key={i}
                className={cn('h-3.5 rounded-full', widths[i] ?? 'w-1/2')}
                delay={delay + 0.1 + i * 0.06}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 pl-12">
        <div className="flex items-center gap-1.5">
          <Bone className="size-3.5 rounded-full" delay={delay + 0.18} />
          <Bone className="h-3 w-4 rounded-full" delay={delay + 0.2} />
        </div>
        <Bone className="h-3 w-10 rounded-full" delay={delay + 0.22} />
        {showReplies && (
          <Bone
            className="h-6 w-[7.5rem] rounded-full"
            delay={delay + 0.26}
          />
        )}
      </div>
    </motion.div>
  );
}

export function CommentListSkeleton() {
  return (
    <div className="space-y-4" role="status" aria-label="Loading comments">
      <CommentCardSkeleton delay={0} lines={2} />
      <CommentCardSkeleton delay={0.08} lines={3} showReplies />
      <CommentCardSkeleton delay={0.16} lines={2} />
      <span className="sr-only">Loading comments…</span>
    </div>
  );
}

export function CommentThread({
  comment,
  slug,
}: {
  comment: CommentNode;
  slug: string;
}) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { mutateAsync: postLike, isPending: likePending } =
    useToggleCommentLike();
  const replies = comment.replies ?? [];
  const count = replies.length;
  const full = count >= MAX_REPLIES_PER_THREAD;
  const parentHandle = handleOf(comment.author);
  const [open, setOpen] = useState(false);
  const [inlineReply, setInlineReply] = useState(false);
  const [mention, setMention] = useState<string>(parentHandle);
  const [liked, setLiked] = useState(Boolean(comment.isLiked));
  const [likeCount, setLikeCount] = useState(comment.likeCount ?? 0);

  useEffect(() => {
    setLiked(Boolean(comment.isLiked));
    setLikeCount(comment.likeCount ?? 0);
  }, [comment.isLiked, comment.likeCount]);

  const handleLike = async () => {
    if (!user?.uid) {
      toast.info('Log in to like this comment', {
        action: {
          label: 'Sign in',
          onClick: () => router.push(loginHref(`/blog/${slug}`)),
        },
      });
      return;
    }

    const nextLiked = !liked;
    const previousLiked = liked;
    const previousCount = likeCount;
    setLiked(nextLiked);
    setLikeCount(Math.max(0, previousCount + (nextLiked ? 1 : -1)));

    try {
      const result = await postLike({
        commentId: comment.id,
        slug,
        data: { userId: user.uid, isLiked: nextLiked },
      });
      const { likeCount: serverCount, isLiked: serverIsLiked } =
        readLikePayload(result);
      setLikeCount(serverCount);
      if (serverIsLiked !== undefined) setLiked(serverIsLiked);
    } catch (error) {
      console.error('Comment like error:', error);
      setLiked(previousLiked);
      setLikeCount(previousCount);
      toast.error('Could not update like');
    }
  };

  const tryReply = (nextMention: string, where: 'inline' | 'modal') => {
    if (full) {
      toast.warning('Thread is full', {
        description: `Each comment can have ${MAX_REPLIES_PER_THREAD} replies.`,
      });
      return;
    }
    setMention(nextMention);
    if (where === 'inline') {
      setInlineReply(true);
    } else {
      setOpen(true);
      setInlineReply(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <CommentItem comment={comment} />
        <div className="mt-3 flex flex-wrap items-center gap-3 pl-12 text-xs">
          <ParentLikeButton
            liked={liked}
            likeCount={likeCount}
            pending={likePending}
            onLike={handleLike}
          />
          <button
            type="button"
            onClick={() => tryReply(parentHandle, 'inline')}
            className={`font-medium transition-colors ${
              full
                ? 'cursor-not-allowed text-muted-foreground/50'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Reply
          </button>
          {count > 0 && (
            <button
              type="button"
              onClick={() => {
                setMention(parentHandle);
                setOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <MessageCircle className="size-3.5" />
              {count}/{MAX_REPLIES_PER_THREAD}{' '}
              {count === 1 ? 'reply' : 'replies'} · View
            </button>
          )}
        </div>
        {inlineReply && !full && (
          <div className="mt-4 pl-12">
            <CommentBox
              slug={slug}
              parentId={comment.id}
              compact
              autoFocus
              mention={mention}
              placeholder={`Reply to @${mention}…`}
              onCancel={() => setInlineReply(false)}
              onPosted={() => setInlineReply(false)}
            />
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[90vh] w-[calc(100%-1.5rem)] max-w-lg flex-col gap-0 overflow-hidden rounded-2xl border-border p-0 sm:w-full">
          <DialogHeader className="border-b border-border px-5 py-4 text-left">
            <DialogTitle>Thread</DialogTitle>
            <DialogDescription>
              {count}/{MAX_REPLIES_PER_THREAD}{' '}
              {count === 1 ? 'reply' : 'replies'} · one level
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-0 grow space-y-5 overflow-y-auto px-5 py-4">
            <div>
              <CommentItem comment={comment} />
              <div className="mt-2 pl-12 text-xs">
                <ParentLikeButton
                  liked={liked}
                  likeCount={likeCount}
                  pending={likePending}
                  onLike={handleLike}
                />
              </div>
            </div>
            {replies.map((reply) => (
              <div key={reply.id} className="border-l-2 border-border pl-4">
                <CommentItem comment={reply} compact showAt />
                <button
                  type="button"
                  onClick={() => tryReply(handleOf(reply.author), 'modal')}
                  className={`mt-2 text-xs font-medium ${
                    full
                      ? 'cursor-not-allowed text-muted-foreground/50'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Reply
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-border px-5 py-4">
            <CommentBox
              key={mention}
              slug={slug}
              parentId={comment.id}
              compact
              autoFocus
              mention={mention}
              placeholder={`Reply to @${mention}…`}
              disabled={full}
              disabledReason={`This thread already has ${MAX_REPLIES_PER_THREAD} replies.`}
              onPosted={() => setMention(parentHandle)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
