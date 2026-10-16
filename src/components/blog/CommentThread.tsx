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
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

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
};

function displayName(author?: CommentAuthor | null) {
  return author?.username?.trim() || 'Guest';
}

function CommentItem({
  comment,
  compact,
}: {
  comment: CommentNode;
  compact?: boolean;
}) {
  const name = displayName(comment.author);
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
          <p className="text-sm font-medium text-foreground">{name}</p>
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
  );
}

export function CommentThread({
  comment,
  slug,
}: {
  comment: CommentNode;
  slug: string;
}) {
  const replies = comment.replies ?? [];
  const count = replies.length;
  const [open, setOpen] = useState(false);
  const [inlineReply, setInlineReply] = useState(false);
  const [mention, setMention] = useState<string | null>(null);

  const openThread = (replyTo?: string) => {
    setMention(replyTo ?? null);
    setOpen(true);
    setInlineReply(false);
  };

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <CommentItem comment={comment} />
        <div className="mt-3 flex flex-wrap items-center gap-3 pl-12 text-xs">
          <button
            type="button"
            onClick={() => {
              setMention(null);
              setInlineReply((value) => !value);
            }}
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Reply
          </button>
          {count > 0 && (
            <button
              type="button"
              onClick={() => openThread()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <MessageCircle className="size-3.5" />
              {count} {count === 1 ? 'reply' : 'replies'} · View
            </button>
          )}
        </div>
        {inlineReply && (
          <div className="mt-4 pl-12">
            <CommentBox
              slug={slug}
              parentId={comment.id}
              compact
              autoFocus
              placeholder="Write a reply…"
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
              {count} {count === 1 ? 'reply' : 'replies'} · one level
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-0 grow space-y-5 overflow-y-auto px-5 py-4">
            <CommentItem comment={comment} />
            {replies.map((reply) => (
              <div
                key={reply.id}
                className="border-l-2 border-border pl-4"
              >
                <CommentItem comment={reply} compact />
                <button
                  type="button"
                  onClick={() => setMention(displayName(reply.author))}
                  className="mt-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Reply
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-border px-5 py-4">
            <CommentBox
              key={mention ?? 'root'}
              slug={slug}
              parentId={comment.id}
              compact
              autoFocus
              mention={mention}
              placeholder={mention ? `Reply to ${mention}…` : 'Write a reply…'}
              onPosted={() => setMention(null)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
